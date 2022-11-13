import React,{useEffect, useState,useRef} from 'react'
import axios from 'axios'
import { useNavigate} from 'react-router-dom';

import todoImg from "../images/todo.jpg"

const INPUT_REGEX=/^[a-zA-Z][a-zA-Z0-9-_]{5,23}$/;
const PASSWORD_REGEX=/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%&]).{8,24}$/
const EMAIL_REGEX=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

const Signup = () => {

    const inputRef= useRef();
    const errorRef= useRef();

    const navigate= useNavigate();

    const [loggedIn,setLoggedIn]= useState(false);
    const [userData,setUserData]= useState({
        username:"",
        password:"",
        email:""
    })

    const [confirmedPassword,setConfirmedPassword]= useState("")
    const [errorMessage,setErrorMessage]= useState("")

    const [validUserName,setValidUserName]= useState(false);
    const [validPassword,setValidPassword]= useState(false);
    const [validConfirmPassword,setValidConfirmPassword]=useState(false)
    const [validEmail,setValidEmail]= useState(false)


    const [userNameFocus,setUserNameFocus]= useState(false);
    const [passwordFocus,setPasswordFocus]= useState(false)
    const [confirmPwdFocus,setConfirmPwdFocus]= useState(false)
    const [emailFocus,setEmailFocus]= useState(false);
    

    function goToLogin(){
        navigate("/")
    }

    function handleInputs(event){
            const {name,value}=event.target;

            setUserData((prev)=>{
                return {
                    ...prev,
                    [name]:value
                }
            })
    }

    async function addnNewUser(){
        try{
        const response= await axios.post('http://localhost:5000/',userData)
        const data= await response.data;
        if(!data){
            console.log("Error in creating user") 
        }
        else{
            console.log(data);
            navigate(`/welcome`,{state:{"userId":data,"isLoggedIn":loggedIn}})
        }
        }
        catch(err)
        {
            console.log(err)
        }
    }


    function handleSubmit(event){
        event.preventDefault()
        // console.log(userData)

            addnNewUser();
      
    }
    
    useEffect(()=>{
        inputRef.current.focus();
    },[])
    useEffect(()=>{
        const vaildUser= INPUT_REGEX.test(userData.username)
    
        setValidUserName(prev=>vaildUser)

    },[userData.username])

    useEffect(()=>{
        const validPwd=PASSWORD_REGEX.test(userData.password)
  
        setValidPassword(validPwd)
        const validConPasswd= userData.password==confirmedPassword
     
        setValidConfirmPassword(validConPasswd)

    },[userData.password,confirmedPassword])

    useEffect(()=>{
        const validEml= EMAIL_REGEX.test(userData.email)
     
        setValidEmail(validEml);
        

    },[userData.email])

  return (
    <section  className='h-screen  bg-white flex flex-col justify-center items-center'>
         <h1 className='px-10 mb-10 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl text-center'>Your one stop destination for <span className='  bg-gradient-to-r from-sky-400 to-green-500'>tasks!!</span></h1>
         
         <section className=' min-h-max mx-100  w-4/5 md:w-2/3 border-1 rounded-lg shadow-2xl flex justify-center  items-center'>
            

         <section className='md:w-1/2 py-2 rounded-lg w-full px-5  h-full shadow-2xl  bg-emerald-500   flex flex-col justify-center items-start'>
    <form className=' flex flex-col  w-full  items-start' method='POST' onSubmit={handleSubmit}>
    <h1 className=" text-4xl font-mono font-bold mb-4">Signup</h1>
        <div className='md:w-3/4 w-full  flex flex-col items-start justify-center'>
        <label className=' font-semibold text-lg pr-5' htmlFor='username'>Username:</label>
        <input
         type="text" 
          className='w-full rounded-lg outline-none px-4 py-2'
         id="username"
         placeholder='Enter Username'
         ref={inputRef}
         autoComplete="off"
         onChange={handleInputs} 
         name="username"      
         value={userData.username}
         required
         onFocus={()=>setUserNameFocus(true)}
        // onBlur={()=>{setUserNameFocus(false)}}
        
        />
     
        
        </div>
        {userNameFocus && userData.username && !validUserName 
        ? <p className='text-red-600 font-semibold  flex flex-col'>
            5 to 24 Characters,Must Start with a Letter Letter,Digits,Underscores allowed 
        </p>:""}
       
        <div className='md:w-3/4 w-full flex flex-col items-start justify-center'>
        <label className=' font-semibold text-lg pr-5' htmlFor='password'>Password:</label>
        <input
         type="password"
         className='w-full rounded-lg outline-none px-4 py-2'
         id="password"
         placeholder='Enter Password'
         onChange={handleInputs}
         name="password" 
         value={userData.password}
         required
         onFocus={()=>{setPasswordFocus(true)}}
        // onBlur={()=>{setUserNameFocus(false)}}
         />
         </div>
            {passwordFocus && userData.password && !validPassword 
        ? <p className='text-red-600 font-semibold '>
            Use 8 or more characters with a mix of letters, numbers & symbols
            
        </p>:""}
        
        <div className='md:w-3/4 w-full flex flex-col items-start justify-center'>
        <label className=' font-semibold text-lg pr-5' htmlFor='cpassword'>Confirm Password:</label>
        <input
         type="password"
         id="cpassword"
         placeholder='Confirm Password'
         className='w-full rounded-lg outline-none px-4 py-2'
         onChange={(e)=>{setConfirmedPassword(e.target.value)}}
         name="password" 
         value={confirmedPassword}
         onFocus={()=>{setConfirmPwdFocus(true)}}
         //onBlur={()=>{setConfirmPwdFocus(false)}}
         required
         />
         </div>
   
          { !validConfirmPassword && confirmPwdFocus 
        ? <p className='text-red-600 font-semibold'>
            Those passwords didn't match. Try again.<br />
            
        </p>:""}

        <div className='md:w-3/4 w-full flex flex-col items-start justify-center'>
        <label className=' font-semibold text-lg pr-5' htmlFor='email'>Email:</label>
        <input 
        type="email" 
        className='w-full rounded-lg outline-none px-4 py-2 '
        id='email'
        placeholder='Enter Email' 
        onChange={handleInputs} 
        name="email" 
        value={userData.email} 
        autoComplete="off"
        onFocus={()=>{setEmailFocus(true)}}
       // onBlur={()=>{setEmailFocus(false)}}
        required
        />
        </div>
        {emailFocus && userData.email && !validEmail 
        ? <p className='text-red-600 font-semibold'>
            Enter a valid email address!<br />
            
        </p>:""}
       
        <button className='w-1/2 px-5 py-3 mt-4 my-2 text-yellow-50 rounded-md bg-gray-900 hover:bg-cyan-500 '>Submit</button>
    </form>
<button onClick={goToLogin} >Already have an account?</button>

</section>
<div className='md:block hidden shadow-2xl rounded-lg w-1/2 h-full  '><img className='object-cover shadow-2xl w-full h-full rounded-2xl' src={todoImg} /></div>
 
 </section>
</section>
  )
}

export default Signup