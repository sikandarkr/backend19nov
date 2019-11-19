const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/users");
var KeyVal = require('../utils/getKey')
const Chatkit = require('@pusher/chatkit-server');
const chatkit = new Chatkit.default({
  instanceLocator: 'v1:us1:7eaec858-7b94-4970-9e84-e1e9f7c53d62',
  key: 'd69326e1-f693-40d4-b3bc-4e7f7f64e470:+tt0M2bW3ZtIvD5XpRrdsWgHgA3BeLbzUqU3h6MpAYQ=',
})
class RouteHandler{
    async Create(req, res){
        const {name, email, password } = req.body;
        const profileUrl= "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXrEBd7AR5WT1fsRwcBlU0xpOZWlgvqQBGkiZ7z4bSNv1-C7_ENg";
        const userExist = await userModel.findOne({$or: [
            {email: req.body.email}
        ]});
        if (userExist) {
            return res.status(409).json({
              status: 409,
              message: "This email or username has been taken already",
              data: userExist
            });
          }
          const user = new userModel({
            name,
            email,
            password,
            profileUrl,
          });
          await user.save(function(err,data) {
            if(err){
              return res.json({"message":"registration unsuccessfull"});
            }
            else{
                chatkit.createUser({
                  id: data.id,
                  name: req.body.name,
                })
                  .then(() => {
                      return res.status(201).json({
                          status: 201,
                          message: "success",
                          data: "registration successfull"
                      });
                  }).catch((err) => {
                    console.log(err);
                  });
            }
          });
          
          // if (!(await user.save())) {
          //   return res.json({"message":"registration unsuccessfull"});
          // }
          // return res.status(201).json({
          //   status: 201,
          //   message: "success",
          //   data: "registration successfull"
          // });
    }
    async authenticate(req, res){
      // console.log("user details", req.body);
        userModel.findOne({$or: [
            // {username: req.body.email}
            {email: req.body.email}
        ]}).exec(function(err,  userInfo){
            if(!userInfo){
                // next(err);
                console.log("youruser info ", userInfo);
                return res.json({"status":401,"error":"you are not registered with this username or email"})
            }
            else{
                if (bcrypt.compareSync(req.body.password, userInfo.password)) {
                            const token = jwt.sign(
                            { id: userInfo._id },
                            req.app.get("secretKey"),
                            { expiresIn: "22h" }
                            );
                            return res.json(
                              {
                                "name":userInfo.name,
                                "id":userInfo.id,
                                "token":token,
                                "profileUrl":userInfo.profileUrl,
                                "message":"success",
                                "upvote":userInfo.upvote,
                                "downvote":userInfo.downvote
                              })
                            // return res.status(200).json(
                            // {   "message":"success",
                            //     "token":token,
                            //     "userName":userInfo.name,
                            //     "profileUrl":userInfo.profileUrl,
                            //     "email":userInfo.email,
                            //     "upvote":userInfo.upvote,
                            //     "downvote":userInfo.downvote,
                            //     "userName":userInfo.country
                            // }
                        // );
                }
                else{
                    return res.json({"status":401,"error":"incorrect password"});
                }
            }
        });
    }
   async  getProfiles(req,res){
          userModel.find({_id:{$ne : req.body.userId}, onlineStatus:true},function(err,data){
            return res.json({data:data,status:200})
            process.exit();

          })

        // console.log("user Id of the user is....",req.body.userId);
        // userModel.find({}, function(err, data) {
        //     if (!err){
        //         return res.json({data:data,status:200})
        //         process.exit();
        //     } else {
        //         return res.json({data:null,status:401})
        //     }
        // });
    }
  async startChat(req, res){
    var query = {$and:[{userId:{$regex:req.body.authuserId, $options: 'i'}},{recieverId:{$regex: req.body.userId, $options: 'i'}}]}
        chatkit.createRoom({
          id: 'java',
          creatorId: 'userId',
          name: 'my room',
          customData: { foo: 42 },
        })
          .then(() => {
            console.log('Room created successfully');
          }).catch((err) => {
            console.log(err);
          });


          // chatkit.createUser({
          //   id: 'ananya',
          //   name: 'Some Name',
          // })
          //   .then(() => {
          //     console.log('User created successfully');
          //   }).catch((err) => {
          //     console.log(err);
          //   });

          //   Chat.findOne(query,function(err,doc){
          //       if(doc==null){
          //           const chat = new Chat({
          //               userId:req.body.authuserId,
          //               recieverId:req.body.userId
          //           });
          //           if(chat.save()){
          //              return res.json({message:"data saved..."});
          //           }
          //       }
          //      else{
          //         //let key = KeyVal.getKeyByValue(doc.toJSON(),req.body.authuserId);
          //         Chat.findOne({userId: req.body.authuserId},function(err,doc){
          //           return res.json({"messages":doc.message});
          //         })
          //     }   
          // });
          console.log("data", req.body);
  }
}

module.exports = new RouteHandler();