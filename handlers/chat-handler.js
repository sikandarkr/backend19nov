const Chatkit = require('@pusher/chatkit-server');
const Chat = require("../models/chat");
const chatkit = new Chatkit.default({
  instanceLocator: 'v1:us1:7eaec858-7b94-4970-9e84-e1e9f7c53d62',
  key: 'd69326e1-f693-40d4-b3bc-4e7f7f64e470:+tt0M2bW3ZtIvD5XpRrdsWgHgA3BeLbzUqU3h6MpAYQ=',
})
class Chathandler{
    async startChat(req, res){
        var date = new Date().getTime();
        var roomId = date+req.body.authuserId;
        var query = {$and:[{userId:{$regex:req.body.authuserId, $options: 'i'}},{recieverId:{$regex: req.body.userId, $options: 'i'}}]}
        var query2 = {$and:[{userId:{$regex:req.body.userId, $options: 'i'}},{recieverId:{$regex: req.body.authuserId, $options: 'i'}}]}
            Chat.findOne(query,function(err,doc){
                if(doc===null){  
                  Chat.findOne(query2, function(err,doc){
                      if(doc===null){
                        const chat = new Chat({
                            userId:req.body.authuserId,
                            recieverId:req.body.userId,
                            roomId:roomId
                        });
                        if(chat.save()){
                          chatkit.createRoom({
                            id: ''+roomId,
                            creatorId: ''+req.body.authuserId,
                            name: ''+"name",
                            customData: { foo: 42 },
                          })
                            .then(() => {
                              return res.json({"message":"room created successfully",authuserId:req.body.authuserId,roomId:roomId,userId:req.body.userId})
                            }).catch((err) => {
                              console.log(err);
                            });
                        }
                      }
                  })
                }

          });

   
   
   
      }
}
module.exports = new Chathandler();