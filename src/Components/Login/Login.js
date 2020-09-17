import { Link, useHistory, useLocation } from 'react-router-dom';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import './Login.css';
import { useContext } from 'react';
import { UserContext } from '../../App';
import "firebase/auth";
import { createUserWithEmailAndPassword, fbSignIn, googleSignIn, initializeFirebase, signInWithEmailAndPassword, updateUserName } from './loginManager';

import { useForm } from "react-hook-form";


const Login = () => {

  const [user, setUser] = useContext(UserContext);
  const [isSignUpForm, setisSignUpForm] = useState(false);//toggling login and sign up form

  //for privateRoute
  let history = useHistory();  
  let location = useLocation(); 
  let { from } = location.state || { from: { pathname: "/hotels" } };
  
  
  initializeFirebase(); //initializing Firebase

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(res =>{
        setUser(res);
        history.push('/hotels');
        
        })
       }

  const handleFbSignIn=()=>{
    fbSignIn().then(res=>{
      setUser(res);
      history.push('/hotels')
    })
    
  }
  
  const { register, handleSubmit ,watch,errors } = useForm();
  
  const onSubmit = data =>{
   const {email,password,firstName,confirmPassword}=data;
   console.log(data);
      
   if(isSignUpForm && email && password===confirmPassword){
       
    createUserWithEmailAndPassword(email,password)
       .then((res)=>{
        setUser(res);
        updateUserName(firstName);
      })
    }

    if(!isSignUpForm && email && password){
      
      signInWithEmailAndPassword(email,password)
      .then((res)=>{
        console.log(res);
        
        if(res.user){
        const {displayName,email}=res.user;
        
        const signedInUser={
          isSignedIn:true,
          name:displayName,
          email:email,
          password:'',
          isCreatedNow:false,
        }
        setUser(signedInUser);
        }
        else{
          const signedInUser={
            isSignedIn:false,
            name:'',
            email:'',
            password:'',
            isCreatedNow:false,
            isPassValid:false
          }
         setUser(signedInUser)
        }
        history.replace(from);
      })
      
       }
    }

  return (
    <div className='login'>
      <div className='login__container'>
      <form onSubmit={handleSubmit(onSubmit)}>
          {
            isSignUpForm ?
            <h4>Create an account</h4>
            :
            <h4>Login</h4>
          }
         
          {
            isSignUpForm ?
              <div>
                <input className='form__input' name="firstName" placeholder='First Name' ref={register({ required: true, maxLength: 20 })} />
                {errors.firstName && <span>First Name is required</span>}
                
                <input className='form__input' name="lastName" placeholder='LastName' ref={register({ pattern: /^[A-Za-z]+$/i })} />
                {errors.lastName && <span>Last Name is required</span>}
              </div>
              
              :
              <div>
             </div>
          }

              <input  name='email'  className='form__input' type="text" placeholder='Username or Email' ref={register({required: true, pattern:  /\S+@\S+\.\S+/ })} />
              {errors.email && <span>email is required</span>}
              

              <input  name='password' className='form__input' type='password' placeholder='Password' ref={register({ pattern:   /^[A-Za-z]\w{7,14}$/ })} />
              {errors.password && <span>Password is required</span>}

          {
            isSignUpForm ?
              
              <div>
                <input  name='confirmPassword' className='form__input' type='password' placeholder='Confirm Password' ref={register({ pattern:   /^[A-Za-z]\w{7,14}$/ })} />
               {errors.confirmPassword && <span>Confirm Password is required</span>}

                <input className='bg-warning blockBtn' type="submit" value='Create an account' />
                <div className="signup__disclaimer">

                  {
                  user && user.isCreatedNow ?
                    <span  className='small__text'>Account Created Succesfully</span>
                     :
                     <span className='small__text' > Already have an account?</span>
                  }
                  <Button onClick={()=>setisSignUpForm(false)}  variant="white" size="sm">Login</Button>
               </div>
              </div>
              
              :

            <div>
              <div className='login__disclaimer'>
                <span><input type="checkbox"/>  Remember Me</span>
                <span>Forgot password</span>
              </div>
              
                <input className='blockBtn bg-warning' type="submit" value='Login' />
              
              <div className="signup__disclaimer">
             
                <span className='small__text'>
                  Don't have an account?
                <button onClick={()=>setisSignUpForm(true)} className='create__accountBtn'>Create an account</button>
                </span>
              </div>
            </div>
          }
         
        </form>
      </div>
      <p>-----------or---------</p>
      <button onClick={handleGoogleSignIn}>
        Sign in with Google
      </button>
    
      <br/>
      <button onClick={handleFbSignIn}>
        Sign in with Facebook
      </button>

    </div>
  );
};

export default Login;