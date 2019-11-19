const path = require('path');
const queryHandler = require('./../handlers/query-handler');
class Socket{
	constructor(socket){
		this.io = socket;
    }
    socketEvents(){
        this.io.on('connection', function (socket){
           console.log("connection successfull##########################",socket.id)
            socket.on('add-message', async (data) => {
                console.log('data.######################',data);
            })
            socket.on('disconnect', async (next) => { 
                console.log('disconnected user socket id', socket.id);
                try{
                    await queryHandler.removeSocketId({
                        socketId: socket.id
                    });
                    next();
                }
                catch(err){

                }
            }) 
        });
    }
    socketConfig(){
		    this.io.use( async (socket, next) => {
                let userId = socket.request._query["userId"];
                console.log("your user Id", userId);
                // var parts = str.split('+', 2);
                // var userId = parts[0];
                // var recieverId  = parts[1];
                try{
                    await queryHandler.addSocketId({
                        userId:  userId,
					    socketId: socket.id
                    });
                    next();
                }
                catch(err){
                    console.log("query handle function not found");
                }
            })
            this.socketEvents();
    }

}
module.exports = Socket;