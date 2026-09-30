import React from "react";
import { HttpClient } from "../../ultility/HttpClient";
import { notify } from "../../ultility/notify";
import "./NotePad.css";

const defaultNote = {
    title: "",
    text:"",
}

export class NotePad extends React.Component{
    constructor() {
        super();
        this.state = {
            data:{
                ...defaultNote,
            },
            allNotes:[],
        }

        this.cardRef = React.createRef();
        
    }
    componentDidMount() {
        HttpClient
            .GET('/note', true)
            .then(res => {
                console.log("note res is >>", res);
                this.setState({
                    allNotes:res.data,
                })
            })
            .catch(err => {
                notify.handleError(err);
            })
        console.log("all notes", this.state.allNotes);
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

    handleSubmit = (e) => {
        e.preventDefault();
        HttpClient
            .POST('/note', this.state.data, true)
            .then(res => {
                console.log("note res is >>", res);
                notify.showSuccess("Note Added Successfully")
                this.cardRef.current.style.display = "none";
                this.props.history.push("/notes");
            })
            .catch(err => {
                notify.handleError(err);
            })
    }

    add=()=>{
        this.cardRef.current.style.display = "block";
    }

    remove = () => {
        this.cardRef.current.style.display = "none";
    }

    delete = (id,index) => {
        HttpClient
                .DELETE(`/note/${id}`, true)
                .then(res=>{
                    notify.showInfo("Note Removed!!!");
                    const { allNotes } = this.state;
                    allNotes.splice(index, 1);
                    this.setState({
                        allNotes
                    })
                })
                .catch(err => {
                    notify.handleError(err);
                })
    }


    render() {
        return (
            <div className="container">
                <div className="header">
                    <h1>Notes</h1>
                    <span onClick={this.add} className="addNote" >+</span>
                </div>
                <div className="content">
                    {/* notes will apear here */}
                    <div className="card" ref={this.cardRef}  >
                        <label style={{color:"white",fontSize:"18px"}}>Add New Note</label><br></br>
                        <input type="text" placeholder="Title" name="title" onChange={this.handleChange} value={this.state.data.title}></input>
                        <span onClick={ this.remove} className="removeNotes" >X</span>
                        <div className="notes">
                            <textarea placeholder="Write your notes here..." name="text" onChange={this.handleChange} value={this.state.data.text}></textarea>
                        </div>
                        <button onClick={this.handleSubmit} >Save</button>
                    </div>

                    {
                        this.state.allNotes.map((item, i) => (
                                <div className="viewCard"  key={i} >
                                    <h3>{ item.title }</h3>
                                    <span onClick={()=>this.delete(item._id,i)} className="deleteNote" >X</span>
                                    <div className="text">
                                        <p>{ item.text }</p>
                                    </div>
                                </div>
                        ))
                    }
                </div>
            </div>
        )
    }
}