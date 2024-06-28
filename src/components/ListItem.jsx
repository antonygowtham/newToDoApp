import React, {useState } from "react";
import axios from "axios";
import Modal from "./Modal";
import ProgressBar from "./ProgressBar";

function ListItem({task,getData}) {
    if (!task) {
        return null
    }
    const serverUrl = import.meta.env.VITE_SERVERURL; 
    const [showModal,setShowModal]=useState(false);

    async function deleteItem(){
        try {
            const response=await axios.delete(`${serverUrl}/todos/${task.id}`);
            if(response.status===200){
                getData();
            }
        } catch (error) {
        console.error(error);
    }
    }

  return (
    <>
        <div className="card col-md-4">
            <div className="card-body">
                <h4 className="card-title">{task.title}</h4>
                <p className="card-text">{task.category}</p>
                
                <ProgressBar progress={task.progress}/>
                
                <button className="btn btn-sm btn-outline-info mr-2" onClick={()=>setShowModal(true)}><i className="fas fa-pencil-alt"></i></button>
                <button className="btn btn-sm btn-outline-danger" onClick={deleteItem}><i className="fas fa-trash-alt"></i></button>
            </div>
            
        </div>
        {showModal && <Modal mode='edit' setShowModal={setShowModal} task={task} getData={getData}/>}
    </>
  )
}

export default ListItem