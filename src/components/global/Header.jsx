import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Col,
  Form, 
  FormGroup, 
  Button,
  Label, 
  CustomInput,
  Input,
  Alert,
  Dropdown
  } from 'reactstrap';

  import './Header.css'

import {Link} from 'react-router-dom';

import firebaseO from 'firebase';

export default class Header extends Component {
    constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.isLoggin = this.isLoggin.bind(this);
    this.handleChangeProfilePic = this.handleChangeProfilePic.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.state = {
      isOpen: false
    };
  }

  
  componentDidMount(){
    const {firebase} = this.props;
        firebaseO.auth().onAuthStateChanged(user => {
            this.setState({ user });
        });
    }
    

 
   handleLogout () {     
       const {firebase} = this.props;
        firebaseO.auth().signOut()          
        .then(result => this.isLoggin())
    } 

    handleChangeName(){
        
        var newUsername = document.getElementById('username').value;
        var user = firebaseO.auth().currentUser;
               user.updateProfile({
                displayName: newUsername,
                
               }).then(()=>firebaseO.auth().currentUser.reload())
        
    }
    
    handleChangeProfilePic(){
        var inputprofile = document.getElementById('profilepic');
        var urls = inputprofile.files[0];        
        var storageRef = firebaseO.storage().ref();
        var imageref = storageRef.child(`profilepics/${firebaseO.auth().currentUser.displayName}`).put(urls);
        
        imageref.snapshot.ref.getDownloadURL().then(downloadURL => {
            var user = firebaseO.auth().currentUser;
               user.updateProfile({
                photoURL: downloadURL
                
               }).then(()=>firebaseO.auth().currentUser.reload())
        })
        
        
    }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  handleSubmit(e){
      e.preventDefault();
  }

  handleLogin(){
      const {firebase} = this.props;
      var email = document.getElementById('email').value;
      var password = document.getElementById('password').value;
      var rembe = document.getElementById('remb').checked;
      
      var eAler = document.getElementById('alert');
      if(rembe){
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
          .then(function(){
              return firebase.auth().signInWithEmailAndPassword(email, password)
            .then(result =>{
                window.location.reload();
            })
            .catch(error => {
            eAler.removeAttribute('hidden');
            eAler.innerText = error
            })
          })
      }else{
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
          .then(function(){
              return firebase.auth().signInWithEmailAndPassword(email, password)
            .then(result =>{

            this.isLoggin()
            })
            .catch(error => {
            eAler.removeAttribute('hidden');
            eAler.innerText = error
            })
          })
      }
      
  }

  isLoggin(){
    const {firebase} = this.props;
      if(this.state.user){
          return(
            <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Perfil
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                  <img className="profilepic" src={firebase.auth().currentUser.photoURL} alt=""/>
                    <span className="profilename"> {firebase.auth().currentUser.displayName}</span>
                  </DropdownItem>
                  <Dropdown direction="right" isOpen={this.state.btnDropright} toggle={() => { this.setState({ btnDropright: !this.state.btnDropright }); }}>
                    <DropdownToggle caret color="success">
                        Change name
                    </DropdownToggle>
                    <DropdownMenu>
                            <Col md={11}>
                                <FormGroup>
                                    <Label for="username">Username</Label>
                                    <Input type="text" name="username" id="username" placeholder="new username" />
                                </FormGroup>
                            </Col>
                            <Col md={11}>
                                <Button onClick={this.handleChangeName} color="success">Ready</Button>
                            </Col>
                    </DropdownMenu>
                    </Dropdown>
                    <Dropdown direction="right" isOpen={this.state.btnDroprights} toggle={() => { this.setState({ btnDroprights: !this.state.btnDroprights }); }}>
                    <DropdownToggle caret color="success">
                        Change profile picture
                    </DropdownToggle>
                    <DropdownMenu>
                            <Col md={14}>
                                <FormGroup>
                                    <Label for="file">Picture</Label>
                                    <Input type="file" accept=".jpg, .jpeg, .png, .gif" name="file" id="profilepic" />
                                </FormGroup>
                            </Col>
                            <Col md={11}>
                                <Button onClick={this.handleChangeProfilePic} color="success">Ready</Button>
                            </Col>
                    </DropdownMenu>
                    </Dropdown>
                  <DropdownItem divider />
                  <DropdownItem onClick={this.handleLogout}> 
                    Log out
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
          )
      }else{
          return(
            <React.Fragment>
                
                <NavItem>
                    <NavLink href="/signup">Sign up</NavLink>
                </NavItem>
                <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                        Log In
                    </DropdownToggle>
                    <DropdownMenu right>
                        <Form onSubmit={this.handleSubmit}>
                            <Alert color="danger" id="alert" hidden>
                               
                           </Alert>    
                            <Col md={11}>
                                <FormGroup>
                                    <Label for="email">Email</Label>
                                    <Input type="email" name="email" id="email" placeholder="Email" />
                                </FormGroup>
                            </Col>
                            <Col md={11}>
                                <FormGroup>
                                    <Label for="password">Password</Label>
                                    <Input type="password" name="password" id="password" placeholder="Password" />
                                </FormGroup>
                            </Col>
                            <Col md={11}>
                                <CustomInput type="checkbox" id="remb" label="Remember me" />
                            </Col>
                            <Col md={11}>
                                <Button onClick={this.handleLogin} color="success">Ready</Button>
                            </Col>
                            <DropdownItem divider />
                            <Col>
                              <DropdownItem>Forgot Password</DropdownItem>
                              <DropdownItem>Firebase api</DropdownItem>
                            </Col>                         

                        </Form>
                    </DropdownMenu>
                </UncontrolledDropdown>
          
            </React.Fragment>
          )
      }
  }
  render() {
    return (
      <div className="navigatorr">
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">React x Firebase Chat</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink href="https://twitter.com/MrEmiii">Twitter</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/">Home</NavLink>
              </NavItem>
              {
                  this.isLoggin()
              }
            </Nav>
          </Collapse>
        </Navbar>
      </div>
        )
    }   
    
};
