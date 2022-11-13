import React,{useEffect, useState,useRef,useContext} from 'react'
import axios from 'axios'
import { useNavigate} from 'react-router-dom';

import useAuth from '../hooks/useAuth';
import todoImg from "../images/todo.jpg"


const Login = () => {

  const {setAuth}= useAuth();

    const navigate= useNavigate();
  
    const [loggedIn,setLoggedIn]= useState(false);
    const [userData,setUserData]= useState({
        username:"",
        password:""
    
    })
    const [errorMessage,setErrorMessage]= useState("");

    const userRef=useRef();
    const errorRef= useRef();

    useEffect(()=>{
        userRef.current.focus()
    },[])

    useEffect(()=>{
        setErrorMessage("")
    },[userData])

    function goToSignUp(){
        navigate("/signup");
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

    async function getUser(){
        console.log("In get USer")
        try{
        const response= await axios.post('https://fullstackapi.onrender.com/login',userData)
        const data= await response.data;
        console.log(data+"SUar ke");
        if(data==""){
            console.log("Error in getting user") 
        }
        else{
    // console.log(data);
             setLoggedIn(prev=>!prev);
             setAuth({data})
             console.log(loggedIn)
             navigate(`/welcome`,{state:{"userId":data,"userName":userData.username}})
    
        }
        }
        catch(err)
        {
            if(!err?.response)
                setErrorMessage("No Server Response!!")
            else if(err.response?.status===400)
                setErrorMessage("Missing UserName or Password!")
            else if(err.response?.status===401)
                setErrorMessage("Unautorized!");
            else 
                setErrorMessage("Login Falied!!")

                errorRef.current.focus();
            
        }
    }
    function handleSubmit(event){
        event.preventDefault()
        // console.log(userData)

            getUser();
    }
    
  return ( 

    <section className='h-screen  bg-white flex flex-col justify-center items-center'>
        <h1 className='px-10 mb-10 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl text-center'>Your one stop destination for <span className='  bg-gradient-to-r from-sky-400 to-green-500'>tasks!!</span></h1>
        
    
    <section className=' h-2/3 w-2/3 border-1 rounded-lg shadow-2xl   flex justify-center  items-center'>
        
        <div className='md:block hidden shadow-2xl rounded-lg w-1/2 h-full  '><img className='object-cover shadow-2xl w-full h-full rounded-2xl' src={todoImg} /></div>
    

    {loggedIn ? "" :
    <section className='md:w-1/2  rounded-lg w-full pl-10  h-full shadow-2xl  bg-emerald-500   flex flex-col justify-center items-start'>
        <div className=' w-1/2  mb-5'>
        {errorMessage?<p ref={errorRef} aria-live="assertive" className=' text-red-600' >{errorMessage}</p>:""}
        <h1 className=" text-4xl font-mono font-bold">Log In</h1>
        </div>
    <form className=' flex flex-col  w-full  items-start' method='POST' onSubmit={handleSubmit}>
        <div className=' flex flex-col items-start justify-center'>
        <label className=' font-semibold text-lg pr-5' htmlFor='username' >Username:</label>
        <input
        className='w-full rounded-lg outline-none px-4 py-2 hover:border-red-600'
         type="text" 
         id="username"
         placeholder='Enter Username'
         autoComplete='off'
         ref={userRef}
         onChange={handleInputs} 
         name="username"      
         value={userData.username}
         required
        />
        </div>
        
        <div className=' flex flex-col items-start justify-center'>
        <label className='  font-semibold text-lg ' htmlFor='password' >Password:</label>
        <input
        className=' w-full rounded-lg outline-none px-4 py-2'
         type="password"
         id="password"
         placeholder='Enter Password'
         onChange={handleInputs}
         name="password" 
         value={userData.password}
         required
              
             />
             </div>
             <br />
     
        <button className='w-1/2 px-5 py-3  text-yellow-50 rounded-md bg-gray-900 hover:bg-cyan-500 '>Submit</button>
        
        <br />
        
    </form>
    {/* <a onClick={navigate(`/signup`)}>New User?</a> */}
    <button className=' ' onClick={goToSignUp}>Create an account?</button>
    </section> 
}

    </section>

    </section>
  
  )
}

export default Login