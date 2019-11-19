var Chat = require('../models/chat');
var User = require('../models/users');
var KeyVal = require('../utils/getKey')
class QueryHandler{    
    constructor(){
        // this.Chat = require('../models/chat');
    }
    addSocketId({userId,recieverId, socketId}){
        User.findOneAndUpdate({_id: userId},{$set:{socketId:socketId,onlineStatus:true}},{new:true})
        .then((docs)=>{
            if(docs){
               console.log('socketId updated successfully');
            }
            else{
               console.log('unable to update socketId');
            }
        })
    }

    removeSocketId({socketId}){
        console.log("removed the user with socketId",socketId)
    }

}

module.exports = new QueryHandler();
