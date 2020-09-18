import * as firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from '../../firebase.config';



export const initializeFirebase=()=>{
  if(firebase.apps.length===0){
  firebase.initializeApp(firebaseConfig);
  }
}



export const googleSignIn=()=>{
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  
   return  firebase.auth().signInWithPopup(googleProvider)
      .then(res=> {
        const {displayName,email} = res.user;
        const signedInUser={
          isSignedIn:true,
          name:displayName,
          email:email,
          password:'',
          isCreatedNow:false,  
        }
       return signedInUser;
      })
      .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
  });
    
  }
  
export const createUserWithEmailAndPassword=(name,email,password)=>{
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(()=>{
     const newUser={
      isSignedIn:true,
      name:name,
      email:email,
      password:password,
      isCreatedNow:true,
      }
      return newUser;
    })
    .catch(function(error) {
      
    });
}

export const signInWithEmailAndPassword=(email,password)=>{
  return firebase.auth().signInWithEmailAndPassword(email, password)
  .then((res)=>{
    return res;
   })
  .catch((error)=> {
    return error.message;
  });
}


export const updateUserName=(name)=>{
  const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName:name ,

    }).then(function() {
      // Update successful.
    }).catch(function(error) {
      // An error happened.
    });
}


export const googleSignOut =()=>{
  return firebase.auth().signOut()
  .then(()=>{
    const signOut={
      isSignedIn:false,
      name:'',
      email:'',
      password:'',
      success:false,  
    }
    return signOut;
  })
  .catch(function(error) {
    
  });
}



export const fbSignIn=()=>{
  const  fbProvider = new firebase.auth.FacebookAuthProvider();
   return firebase.auth().signInWithPopup(fbProvider)
    .then(res => {
      
      const {displayName,email} = res.user;
      const signedInUser={
        isSignedIn:true,
        name:displayName,
        email:email,
        password:'',
        isCreatedNow:false,  
      }
      return signedInUser;
      
    
  }).catch(function(error) {
    
  const errorMessage = error.message;
    });
}