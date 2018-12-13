import React, {Component} from 'react';
import firebase from 'firebase';
import './Chatroom.css'
export default class ChatRoom extends Component {
  
    constructor(){
        super();
        this.state = {
            message: '',
            messages: [],
            whotyping: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateMessage = this.updateMessage.bind(this);
        this.typingIndicator = this.typingIndicator.bind(this);
    }

    componentDidMount(){
        firebase.database().ref('messages/').on('value', snapshot => {
            const currentMessage = snapshot.val();
            if(currentMessage !== null){
                this.setState({
                    messages: currentMessage
                })
            }
        })
        console.log(this.state.messages)
    }

    handleSubmit(e){
        e.preventDefault();
        var objToday = new Date(),
	weekday = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'),
	dayOfWeek = weekday[objToday.getDay()],
	domEnder = function() { var a = objToday; if (/1/.test(parseInt((a + "").charAt(0)))) return "th"; a = parseInt((a + "").charAt(1)); return 1 == a ? "st" : 2 == a ? "nd" : 3 == a ? "rd" : "th" }(),
	dayOfMonth = today + ( objToday.getDate() < 10) ? '0' + objToday.getDate() + domEnder : objToday.getDate() + domEnder,
	months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'),
	curMonth = months[objToday.getMonth()],
	curYear = objToday.getFullYear(),
	curHour = objToday.getHours() > 12 ? objToday.getHours() - 12 : (objToday.getHours() < 10 ? "0" + objToday.getHours() : objToday.getHours()),
	curMinute = objToday.getMinutes() < 10 ? "0" + objToday.getMinutes() : objToday.getMinutes(),
	curSeconds = objToday.getSeconds() < 10 ? "0" + objToday.getSeconds() : objToday.getSeconds(),
	curMeridiem = objToday.getHours() > 12 ? "PM" : "AM";
    var today = dayOfMonth + " of " + curMonth + ", " + curYear + " " + curHour + ":" + curMinute + curMeridiem + " ";

        const newMessage = {
            prvider: firebase.auth().currentUser.displayName,
            providerPhoto:firebase.auth().currentUser.photoURL,
            id: this.state.messages.length,
            text: this.state.message,
            moment: today
        }
       firebase.database().ref(`messages/${newMessage.id}`).set(newMessage)
        this.setState({
            message: ""
        })
    }
    updateMessage(e){
        var message = e.target.value        
        this.setState({
            message
        })
        
    }

    typingIndicator(e){
        var input = e.target;
        var message = e.target.value 
        var whotyping = document.getElementById('whotyping');        
        if(message !== ""){
            this.setState({
                whotyping: firebase.auth().currentUser.displayName + " is writing"
            })
        }else{
            this.setState({
                whotyping: ""
            })
        }
        
    }
    render(){

        const {messages} = this.state;
        const messageList = messages.map(message => {
            return (
            <li key={message.id}> 
                <div  className="chat-member">
                    <img className="profilepic-member" src={message.providerPhoto} alt=""/>
                    <p className="nickname-member">{message.prvider}</p>
                    <div className="message">{message.text}</div>
                    <span className="moment-member">{message.moment}</span>
                </div>
            </li>)
        })
        const whotyping = this.state.whotyping;
        
        return(
           <div className="chat-room">
                 <div style={{flex: 1}}>
                     <ol className="chatlist">
                        {messageList}
                     </ol>
                 </div>
                <form className="chat-input" onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="Message"
                        onChange={this.updateMessage}
                        onKeyUp={this.typingIndicator}
                        value={this.state.message}
                    />
                    <label id="whotyping">{whotyping}</label>
                    <button type="submit">
                        Send
                    </button>
                </form>
                {
                    
                }
           </div>
        )
    }   
    
};
