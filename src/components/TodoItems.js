
import axios from 'axios';
import React,{useEffect,useState} from 'react'
import {useNavigate} from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import {AiOutlineDelete} from 'react-icons/ai'
import {FiEdit2} from 'react-icons/fi'
import {TiTickOutline} from "react-icons/ti"


const TodoItems = () => {

const navigate= useNavigate()
const [listOfTodos,setListOfTodos]= useState([]);
const [toggleAddUpdate,setToggleAddUpdate]=useState(true)
const [newItem,setNewItem]= useState("")
const [editItem,setEditItem]= useState(null)
const location = useLocation();
const {setAuth}= useAuth();

const [errorMessage,setErrorMessage]= useState("");
const [notiMessage,setNotiMessage]= useState("");



const {userId}= location.state;
const {userName}=location.state

  

function logout(){
  setAuth({data:null})
}

//useEffect based on a criteria 
function showUpdatedItems(itemName){
  setNewItem(prev=>itemName.item)
  setEditItem(itemName._id);
  setToggleAddUpdate(false)
  //console.log(itemName._id)
}

function updateItems(id){
  // setNewItem(id.item);
  setToggleAddUpdate(true)
  if(newItem.length>20)
  {
   setErrorMessage("Max 20 charecters allowed ")
   return;
  }
 // console.log(id)
  axios.put(`https://fullstackapi.onrender.com/${id}`,{"newItem":newItem.trim(),"userID":userId})
  .then(response=>setListOfTodos( response.data))
  .catch(err=>{
    if(!err?.response)
      setErrorMessage("No Server Response!!")
    else if(err.response?.status===400)
      setErrorMessage("Item Already Present in the list!!")
  })

  setNewItem("")

}

// function deleteItems(id){
//   axios.delete(`http://localhost:5000/${id}`)
//   .then(response=>console.log("Sucess~~!"))
//   .catch(err=>console.log("Todo Error!"+err.message))

//   setListOfTodos(listOfTodos=>listOfTodos.filter(todo=>todo._id!==id))
// }

function deleteItems(id){
  axios.delete(`https://fullstackapi.onrender.com/${id}`)
  .then(response=>response)
  .catch(err=>setErrorMessage(err))

  setListOfTodos(listOfTodos=>listOfTodos.filter(todo=>todo._id!==id))
}


 async function addItems(){
   try{
     // setNewItem(prev=>prev.trim())
     if(newItem.trim()==="")
     {
      setErrorMessage("Please enter task to continue!! ")
      return;
     }
     if(newItem.length>20)
     {
      setErrorMessage("Max 20 charecters allowed ")
      return;
     }
     const response= await axios.post(`https://fullstackapi.onrender.com/${userId}`,{"newItem":newItem.trim()})
     const data= await response.data
     //console.log(data)
     
     //setListOfTodos(listOfTodos=>listOfTodos.map(todo=>todo))
     
     setListOfTodos(data)
     //setNotiMessage("New Item added")
     
     //let data1= listOfTodos.map(todo=>todo)
    // console.log("Data is!!!",data1);
     setNewItem("")

   }catch(err)
   {
    if(!err?.response)
      setErrorMessage("No Server Response!!")
    else if(err.response?.status===400)
      setErrorMessage("Item Already Present in the list!!")
   }

}

function completedListItems(id){
 
 // console.log(id+"IN completedListofItems")
  axios.post(`https://fullstackapi.onrender.com/comp/${id}`,{"userId":userId})
  .then(response=>setListOfTodos(response.data))
  .catch(err=>{
    if(!err?.response)
      setErrorMessage("No Server Response!!")
    else if(err.response?.status===400)
      setErrorMessage("Item Already Present in the list!!")
  })
}

useEffect(()=>{
    axios.get(`https://fullstackapi.onrender.com/${userId}`)
    .then(response=>setListOfTodos(response.data))
    .catch(err=>setErrorMessage(err.message))
},[])

useEffect(()=>{
setErrorMessage("")
//setNotiMessage("")
},[newItem])


  return (
    <section className='h-screen w-full bg-blue-300'>

    <header className='  p-5 flex flex-row  justify-around items-center content-center'>
      <h1 className=' text-white text-3xl font-bold'>{`Welcome ${userName} ✍`}</h1>
      {/* <button className=' py-5 px-10 my-5 font-bold text-blue-400 rounded-xl  bg-white shadow-xl shadow-blue-500/50 text-lg' onClick={logout}>Logout</button> */}
      <button className=' text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2' onClick={logout}>Logout</button>
      
      
    </header>
  
    <div className='h-4/5 w-full flex justify-center  '>
    <section className='w-full mx-10 border-8 border-white shadow-2xl bg-white rounded-2xl lg:w-1/2 flex flex-col mt-5 p-5 items-center justify-center  '>
      {<p className={`text-sm text-red-500 mb-10 {errorMessage?"":"offscreen"}`}>{errorMessage}</p>}
      {notiMessage?<p>{notiMessage}</p>:''}
    <input 
        type="text" 
        className='w-3/4 h-32 text-2xl outline-none rounded-md px-5 outline-blue-400'
        placeholder='Add Your tasks' 
        onChange={(e)=>setNewItem(e.target.value)} 
        value={newItem}       
    />
   {toggleAddUpdate? <button className=' py-5 px-10 my-5 font-bold text-yellow-50 rounded-xl  bg-blue-500 shadow-xl shadow-blue-500/50 text-lg transtion ease-in-out delay-200 hover:scale-105' onClick={addItems}>Add</button>:<button className=' py-5 px-10 my-5 font-bold text-yellow-50 rounded-lg shadow-2xl bg-blue-400 text-lg' onClick={()=>updateItems(editItem)}>Update Items</button>}
    <ul className='h-full w-full snap-y snap-mandatory snap-start  overflow-auto ' >
        {
          listOfTodos.map((todo,index)=>{
            return ( 
              <li  
              className=' w-full p-5  flex flex-col  justify-center  rounded-3xl border-blue-400  '
              
              key={index}>
                <div className= {` ${todo.completed?" bg-emerald-300   ":"bg-blue-300"}  rounded-3xl p-5  w-full text-3xl flex font-semibold shadow-2xl font-mono mb-5  } `}>
                <div className= {`  ${todo.completed?" line-through  ":"text-black"}  w-full `}>{todo.item}</div>
                {/* <div className=' w-12'>{todo.item}</div> */}
                </div>
                <div className=' flex gap-8 sm:justify-end justify-around  '>
                <button className=' transition ease-in-out delay-150 hover:scale-125 text-blue-400 text-4xl' ><TiTickOutline className=' ' onClick={()=>{completedListItems(todo._id)}}   /></button>
                <button className=' transition ease-in-out delay-150 hover:scale-125 text-blue-400 text-4xl' onClick={()=>{deleteItems(todo._id)}} ><AiOutlineDelete  /></button>
                <button className=' transition ease-in-out delay-150 hover:scale-125 text-blue-400 text-4xl' onClick={()=>{showUpdatedItems(todo)}}><FiEdit2 className='' /></button>
                
                </div>
                
              </li> 
            )
          })
        }
    </ul>
    </section>
    </div>
    </section>
  )
}

export default TodoItems