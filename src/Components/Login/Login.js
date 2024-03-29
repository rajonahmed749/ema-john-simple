import { useContext, useState } from 'react';
import { userContext } from "../../App";
import { useHistory, useLocation } from "react-router-dom";
import { createUserWithEmailAndPassword, handleFbSignIn, handleGoogleSignIn, handleSignOut, initializeLoginFramework, signInWithEmailAndPassword } from './LoginManager';




function Login() {
  const [newUser,setNewUser] = useState(false);
  
  const [user, setUser] = useState({
    isSignIn: false,
    name: '',
    email : '',
    photo: ''
  });

  initializeLoginFramework()

  const [loggedInUser, setLoggedInUser] = useContext(userContext);

  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };


  const googleSignIn = () => {
    handleGoogleSignIn()
    .then(res =>{
      handleResponse(res, true)
    })
  }

  const fbSignIn = () => {
    handleFbSignIn()
    .then(res =>{
      handleResponse(res, true)
    })
  }

  const signOut = () => {
    handleSignOut()
    .then(res =>{
     handleResponse(res, false)
    })
  }

  const handleResponse = (res, redirect) => {
    setUser(res)
    setLoggedInUser(res)
    if(redirect){
      history.replace(from);
    }

  }

 
  const handleBlur= (e) =>{
    // console.log(e.target.name, e.target.value);

    // validation the user email and password

    let isFieldValid=true;
    if(e.target.name === 'email'){
       isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
      
    }
    if(e.target.name === 'password'){
      const isPasswordValidate= e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);

      isFieldValid=isPasswordValidate && passwordHasNumber;
    }
    if(isFieldValid){
      const newUserInfo= {...user};
      newUserInfo[e.target.name]= e.target.value;
      setUser(newUserInfo)
    }
  }

  const handleSubmit = (e) => {
    if(newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.name, user.email, user.password)
      .then(res =>{
        handleResponse(res, true)
      })
    
    }
    if(!newUser && user.email && user.password){
      signInWithEmailAndPassword(user.email, user.password)
      .then(res =>{
        handleResponse(res, true)
      })
    }
    e.preventDefault();
  }

    

  return (
    <div style={{textAlign:'center'}}>
      {
        user.isSignIn ? <button onClick={signOut}>Sign out</button> :
        <button onClick={googleSignIn}>Sign In</button>     
      } <br/>
      <button onClick={fbSignIn}>Sign In via Facebook</button>
      {
        user.isSignIn &&
        <div>
          <p> Welcome , {user.name}</p>
          <p> your email : {user.email}</p>
          <img src={user.photo} alt="userPhoto"/>
        </div> 
      }

      <h1>Our own athentication</h1>
      
      <form onSubmit={handleSubmit}>
        <input type="checkbox" name="newUser" onChange={()=> setNewUser(!newUser)} id="newUser"/> 
        <label htmlFor="newUser">New user sign up</label> <br/>

        {newUser && <input type="text" name='name' placeholder='Your name' onBlur={handleBlur}/>}
        <br/>
        <input type="text" name='email' onBlur={handleBlur} placeholder='Enter valid email' required/> <br/>
        <input type="password" name="password" onBlur={handleBlur} placeholder="Your password" required/> <br/>
        <input type="submit" value="Submit"/>
      </form>
      <p style={{color:'red'}}> {user.error}</p>
      {
        user.success && <p style={{color:'green'}}> User {newUser ? 'created' : 'logged'} successfully</p>
      }
    </div>
  );
}

export default Login