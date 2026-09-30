import React from "react";
import * as io from 'socket.io-client';
import "./messageComponent.css"

import { notify } from "../../ultility/notify";

const socketURL = process.env.REACT_APP_SOCKET_URL;


export class MessageComponent extends React.Component{
    constructor() {
        super();
        this.state = {
            data: {
                senderName: "",
                senderId: '',
                receiverName: '',
                receiverId: '',
                time: '',
                message:'',
            },
            messages: [],
            currentUser: {},
            users:[],
        };
    }

    componentDidMount() {
        console.log("i am here mount");

        const currentUser = JSON.parse(localStorage.getItem('user'));
        this.setState({
            currentUser
        }, () => {
            this.runSocket();
        })
    }

    runSocket = () => {
        this.socket = io.connect(socketURL);

        this.socket.emit("new-user", this.state.currentUser.username);

        this.socket.on('reply-msg', msgData => {
            const { messages ,data} = this.state;
            data.receiverId=msgData.senderId;
            messages.push(msgData);
            this.setState({
                messages,
            })

            console.log("client message", messages);
        })


        this.socket.on('reply-msg-own', msgData => {
            const { messages ,data} = this.state;
            messages.push(msgData);
            this.setState({
                messages,
            })
            console.log("client message", messages);
        })


        this.socket.on("users", users => {
            this.setState({
                users
            })
            console.log("all users",this.state.users);
        })

    }


    handleChange = (e) => {
        const { name, value } = e.target;

        this.setState(preState => ({
            data: {
                ...preState.data,
                [name]:value
            }
        }))
    }

    send = (e) => {
        e.preventDefault();
        const { data,currentUser,users } = this.state;
        
        if(!data.receiverId){
            return notify.showInfo("Select A Receiver First");
        }

        data.senderName = currentUser.username;
        data.senderId=users.find(user => user.name === currentUser.username).id;
        this.socket.emit("new-msg", data);

        this.setState(preState => ({
            data: {
                ...preState.data,
                message:'',
            }
        }))
    }

    selectUser =(user)=>{
        this.setState(preState=>({
            data:{
                ...preState.data,
                receiverId:user.id,
                receiverName:user.name,
            }
        }))
    }


    render() {

        return (
            <>
                <h1>Lets Chart</h1>
                <div className="message">
                    <h3>{ this.state.currentUser.username}</h3>
                    <div className="messages">
                        {
                            this.state.messages.map((item, i) => {
                                return (
                                    <div key={i} className="container">
                                        {/* <img src="/w3images/avatar_g2.jpg" alt="Avatar" className="right" style={{ width:"100%"}}/> */}
                                        <p>{ item.message}</p>
                                        <span className="time-left">{ item.senderName }11:05</span>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <form  onSubmit={this.send}>
                        <input type="text" placeholder="Type Message..." name="message" onChange={this.handleChange} value={this.state.data.message}></input>
                        <button type="submit"cclassName="submitButton">Send</button>
                    </form>
                </div>
                
                <div className="userList">
                    {
                        this.state.users.map((user, i) => {
                            return (
                                <li className="activeUser" key={i} >
                                    <span onClick={()=>this.selectUser(user)}>{user.name}</span>
                                </li>
                            )
                        })
                        }
                </div>
            </>
        )
    }
}






/*
inside message box


<div className="container">
                    <img src="/w3images/bandmember.jpg" alt="Avatar" style={{ width:"100%"}}/>
  <p>Hello. How are you today?</p>
  <span className="time-right">11:00</span>
</div>

<div className="container darker">
  <img src="/w3images/avatar_g2.jpg" alt="Avatar" className="right" style={{ width:"100%"}}/>
  <p>Hey! I'm fine. Thanks for asking!</p>
  <span className="time-left">11:01</span>
</div>

<div className="container">
  <img src="/w3images/bandmember.jpg" alt="Avatar" style={{ width:"100%"}}/>
  <p>Sweet! So, what do you wanna do today?</p>
  <span className="time-right">11:02</span>
</div>

<div className="container darker">
  <img src="/w3images/avatar_g2.jpg" alt="Avatar" className="right" style={{ width:"100%"}}/>
  <p>Nah, I dunno. Play soccer.. or learn more coding perhaps?</p>
  <span className="time-left">11:05</span>
</div>
*/