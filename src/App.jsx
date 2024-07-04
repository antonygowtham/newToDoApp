import React, { useEffect ,useState } from "react"
import ListHeader from "./components/ListHeader"
import ListItem from "./components/ListItem"
import Auth from "./components/Auth"
import Filter from "./components/Filter"
import axios from "axios"
import {useCookies} from "react-cookie"

function App() {
  const serverUrl = import.meta.env.VITE_SERVERURL

  const [cookies,setCookie,removeCookie]=useCookies(null)
  const authToken=cookies.AuthToken
  const userEmail = cookies.Email
  const UserId=cookies.UserId
  

  const [tasks,setTasks]=useState(null)
  const [types,setTypes]=useState(null)

  async function getData(){
    try {
      const response =  await axios.get(`${serverUrl}/todos/${UserId}`)
      const response1 =  await axios.get(`${serverUrl}/types/${UserId}`)
      setTypes(response1.data)
      setTasks(response.data)
      
    } catch (err) { 
      console.error(err)
    }
  }

  //finished tasks
  async function getFinishedTasks(){
    try {
      const response =  await axios.get(`${serverUrl}/todos/${UserId}/is_finished/true`)
      setTasks(response.data)
      
    } catch (err) { 
      console.error(err)
    }
  }

  //get filtered tasks
  async function getFilteredTasks(category){
    try {
      const response =  await axios.get(`${serverUrl}/todos/${UserId}/category/${category}`)
      setTasks(response.data)
      
    } catch (err) { 
      console.error(err)
    }
  }

  useEffect(()=>{getData()},[])
  //console.log(types)

  const sortedTasks=tasks?.sort((a,b)=>new Date(a.date)-new Date(b.date));

  return (
    <>
      {!authToken && <Auth/>}
      {authToken && 
        <>
          <div className="container shadow py-3 px-5 mt-3">
            <div className="row shadow p-3  ">
              <ListHeader getData={getData}/>
            </div>
            <hr/>
            <div className="row btn-group">
              <button type="button" className="btn btn-secondary" onClick={getData}>All</button>
              {types?.map((type,index) => <Filter key={index} type={type} getFilteredTasks={getFilteredTasks}/>)}
              <button type="button" className="btn btn-secondary" onClick={getFinishedTasks}>finished </button>
            </div>
            
            <div className="row shadow p-3">
              {sortedTasks?.map((task) => <ListItem key={task.id} task={task} getData={getData}/>)}
            </div>
          </div>
        </>
      }
    </>
  )
}

export default App
