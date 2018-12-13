import React, {Component} from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Col, Media, Alert} from 'reactstrap';
import './signup.css'
import firebase from 'firebase';

export default class Signup extends Component {

    constructor(){
        super();
        this.handleDetect = this.handleDetect.bind(this);
        this.state = {
            image: null
        }
    }

    handleSignup(){
        var username = document.getElementById('username').value;
        var email = document.getElementById('emails').value;
        var displayName = document.getElementById('displayName').value;
        var password1 = document.getElementById('passwords').value;
        var password2 = document.getElementById('passwordss').value;
        var date = document.getElementById('birthday').value;
        var inputprofile = document.getElementById('profilepics');
        var urls = inputprofile.files[0];    
        console.log(urls);    
        var storageRef = firebase.storage().ref();
        var imageref = storageRef.child(`profilepics/${username}`).put(urls);
        var imagedefault = 'https://firebasestorage.googleapis.com/v0/b/reactxfirebasemremii.appspot.com/o/100.png?alt=media&token=d47afdfd-d3d1-40f3-9949-98bf592452ef'
        var imageoutput;
        var ealert = document.getElementById('alert');
        
        imageref.snapshot.ref.getDownloadURL().then(downloadURL => {
            imageoutput = downloadURL;
        })
        if(password1 === password2 && password1 !== "" && password2 !== ""){
            console.log('holas');
            firebase.auth().createUserWithEmailAndPassword(email, password1)
            .then(() => {
               var user = firebase.auth().currentUser;
               user.updateProfile({
                displayName: username,
                
               })
               if(urls){
                user.updateProfile({
                    photoURL: imageoutput                
               })  
               }else{
                user.updateProfile({
                    photoURL: imagedefault
               })  
               }
               
            })//
            .catch(error => {
                ealert.removeAttribute('hidden');
                ealert.innerText = error
            })
        }else{
            ealert.removeAttribute('hidden');
                ealert.innerText = "Passwords need be equals"
        }
    }

    handleDetect(e){
        var preview = document.getElementById('preview');
        var urls = e.target.files[0];
        var reader = new FileReader();
        if(e.target.files[0]){
            reader.onload = function(){
                preview.src = reader.result;
            }
            reader.readAsDataURL(urls)          
        }
              
    }

    render(){
        return(
            <div className="signup">
            <Alert color="danger" id="alert" hidden>
                               
                               </Alert>    
                <Form>
                <FormGroup>
          <Label for="username">Username</Label>
          <Input type="text" name="username" id="username" placeholder="my nick" />
        </FormGroup>
        <FormGroup>
          <Label for="displayName">Your name</Label>
          <Input type="text" name="displayName" id="displayName" placeholder="my real name" />
        </FormGroup>
        <FormGroup>
          <Label for="emails">Email</Label>
          <Input type="emails" name="emails" id="emails" placeholder="myemail@mail.com" />
        </FormGroup>
        <FormGroup>
          <Label for="passwords">Password</Label>
          <Input type="password" name="passwords" id="passwords" placeholder="password super secret!" />
        </FormGroup>
        <FormGroup>
          <Label for="passwordss">Re-Password</Label>
          <Input type="password" name="passwordss" id="passwordss" placeholder="password super secret x2!" />
        </FormGroup>
        <FormGroup>
          <Label for="birthday">Your birthday</Label>
          <Input type="date" name="birthday" id="birthday" placeholder="my birthday" />
        </FormGroup>
        <FormGroup row>
          <Label for="file" sm={2}>Picture</Label>
          <Col sm={10}>
            <Input type="file" accept=".jpg, .jpeg, .png, .gif" onChange={this.handleDetect} name="file" id="profilepics" />
            <div className="preview">
      
            <Media id="preview" object data-src="holder.js/64x64" style={{width: 100}}/>
      
            </div>
            <FormText color="success">
              This files are the profile picture
            </FormText>
          </Col>
        </FormGroup>
        <Button onClick={this.handleSignup} color="success">Ready!</Button>
      </Form>
            </div>
        )
    }
        
};
