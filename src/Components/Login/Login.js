
import React, { useState ,useContext } from 'react';
import './Login.css';

//Libraries
import {useHistory, useLocation } from 'react-router-dom';
import "firebase/auth";
import { Button } from 'react-bootstrap';

import { useForm } from "react-hook-form";

//Mz Custom components
import { UserContext } from '../../App';
import { createUserWithEmailAndPassword, fbSignIn, googleSignIn, initializeFirebase, signInWithEmailAndPassword, updateUserName } from './loginManager';
import Header from '../Header/Header';




const Login = () => {

  const headerNavColor={
    color:'black',
   }

  const [user, setUser] = useContext(UserContext);  //context from app.js
  
  const [isSignUpForm, setisSignUpForm] = useState(false);//toggling login and sign up form

  //for privateRoute
  let history = useHistory();  
  let location = useLocation(); 
  let { from } = location.state || { from: { pathname: "/home" } };
  
  
  initializeFirebase(); //initializing Firebase

  const handleGoogleSignIn = () => {
       googleSignIn()
       .then(res => {
       setUser(res);    
        history.push('/home');
        })
    }

  const handleFbSignIn=()=>{
    fbSignIn().then(res=>{
      setUser(res);
      history.push('/home')
    })
  }
  
  //handle Form validation and sign up and log in using email and password
  const { register, handleSubmit ,watch,errors } = useForm();
  

  
  const onSubmit = data =>{
   const {email,password,firstName,lastName,confirmPassword}=data;
    
   
   if(isSignUpForm && email && password===confirmPassword){
       
      createUserWithEmailAndPassword(firstName+lastName,email,password)
       .then((res)=>{
        setUser(res);
        updateUserName(firstName+lastName);
      })
    }

    if(!isSignUpForm && email && password){
      
      signInWithEmailAndPassword(email,password)
      .then((res)=>{
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
     <div>
       <Header headerNavColor={headerNavColor}/>
     </div>
      <div className='container'>
      <div className='form__container col-md-5'>
    
       { 
        isSignUpForm ?
       
       <form onSubmit={handleSubmit(onSubmit)}>
         <div className='signupForm__container'>
          
          <h4 className='signupForm__title'>
            Create an account
          </h4>
          <input  className='form__input' 
            type='text'
            name="firstName" 
            placeholder='First Name' 
            ref={
              register({ required:'minimum 8 characters needed',minLength:8, maxLength: 20 })
            } 
            />
            {errors.firstName && <span>{errors.firstName.message}</span>}
            
          <input className='form__input'
            type='text' 
            name="lastName" 
            placeholder='LastName' 
            ref={
              register({ pattern: /^[A-Za-z]+$/i })
              } 
            />
            {errors.lastName && <span>last Name is required</span>}

            <input   className='form__input'
               name='email'
               type='email' 
               placeholder='Username or Email' 
               ref=
               {
                 register({required: true, pattern:  /\S+@\S+\.\S+/ })
               } 
               />
              {errors.email && <span>email is required</span>}
              

              <input   className='form__input'
               name='password'
               type='password' 
               placeholder='password' 
               ref=
               {
                 register({ required:'minimum 7 characters needed, first letter should be a letter', pattern: /^[A-Za-z]\w{7,14}$/ })
               } 
               />
              {errors.password && <span>{errors.password.message}</span>}

              <input  className='form__input'
                name='confirmPassword'
                 type='password' 
                 placeholder='Confirm Password' 
                 ref=
                 {register({required:'confirm your password', pattern: /^[A-Za-z]\w{7,14}$/ })
                 } 
               />
               {errors.confirmPassword && <span>{errors.confirmPassword.message}
                </span>}
              
                
              <input className='bg-warning blockBtn' 
                type="submit" 
                value='Create an account' />
                
               <div className="signup__disclaimer">
                  {
                    user && user.isCreatedNow ?
                    <span  className='small__text'>
                      Account Created Succesfully
                    </span>
                     :
                    <span className='small__text'> 
                      Already have an account?
                    </span>
                   }
              </div>
            
            </div>
          </form>
  
            
            :
            <form onSubmit={handleSubmit(onSubmit)}>
             <div className='signupForm__container'>
               <h4>Login</h4>
               <input   className='form__input'
                  name='email'
                  type='email' 
                  placeholder='Username or Email' 
                  ref=
                  {
                    register({required: true, pattern:  /\S+@\S+\.\S+/ })
                  } 
               />
              {errors.email && <span>email is required</span>}

              <input   className='form__input'
               name='password'
               type='password' 
              
               placeholder='password' 
               ref=
               {
                 register({ required:'minimum 7 characters needed, first letter should be a letter', pattern: /^[A-Za-z]\w{7,14}$/ })
               } 
               />
              {errors.password && <span>errors.password.message</span>}
               
              <div className='login__disclaimer'>
                <p><input type="checkbox"/> Remember Me</p>
                <p>Forgot password</p>
              </div>
              
              <input className='blockBtn bg-warning' 
              type="submit" v
              alue='Login' 
              />

             <div className="signup__disclaimer">
                <span className='small__text'>
                   <p>Don't have an account?</p>
                  <button 
                    onClick={()=>setisSignUpForm(true)} className='create__accountBtn'
                   >
                    Create an account
                   </button>
                 </span>
               </div>
             </div>
          </form>
        
         }
        
           <hr/>
           <div className='googleFbButton__container'>
           
          
            <Button className='google__Btn'
              
              onClick={handleGoogleSignIn} 
              variant="white"
              size="sm" 
              block
              >
              <i className="fab fa-google mr-5"></i>
              Sign in with Google
            </Button>

           <Button className='fb__Btn' 
                onClick={handleFbSignIn}
                variant="white"
                size="sm" 
                block>
                <i className="fab fa-facebook-f mr-5"></i>
                Sign in with Facebook
            </Button>
        

          
          </div>
        </div>
      </div> 
   </div>

  );
};

export default Login;