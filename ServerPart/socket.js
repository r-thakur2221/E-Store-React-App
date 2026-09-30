const socket=require("socket.io");
const users=[];
module.exports=function (app,configs){
	const io = socket(app.listen(configs.socketPort,function(err,done){
		if(err){
			console.log("error in listening to socket server");
		}
		else{
			console.log("Server listening at socket port "+configs.socketPort);
		}
	}),
	{
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials:true
  }
}
	)

	io.on("connection",function(client){
		console.log("Client connected to socket server ");
		var id=client.id;
		client.on("new-user",data=>{
			var user={
				id,
				name:data
			}
			users.push(user);
			client.emit("users",users);
			client.broadcast.emit("users",users);
		})

		client.on('new-msg',data=>{
			console.log("server messages is ",data);
			client.emit('reply-msg-own', data); // for own client which has fired event
			client.broadcast.emit("reply-msg",data);
		})

		client.on("disconnect",()=>{
			users.forEach((user,i)=>{
				if(user.id===id){
					users.splice(i,1);
				}
			})
			client.broadcast.emit("users",users);
		})
	})
}
