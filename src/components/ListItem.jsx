import React, {useState } from "react";
import axios from "axios";
import Modal from "./Modal";
import ProgressBar from "./ProgressBar";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


function ListItem({task,getData}) {
    if (!task) {
        return null
    }
    const serverUrl = import.meta.env.VITE_SERVERURL
    const [showModal,setShowModal]=useState(false)
    const [showNote,setShowNote]=useState(false)

    async function deleteItem(){
        setShowNote(true)
        try {
            const response=await axios.delete(`${serverUrl}/todos/${task.id}`);
            if(response.status===200){
                getData();
                window.location.reload()
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
                {showNote && <h2 class="text-center "><div class="text-center spinner-border"></div></h2>}
                <ProgressBar progress={task.progress}/>
                
                <button className="btn btn-sm btn-outline-info mr-2" onClick={()=>setShowModal(true)}><EditIcon/></button>
                <button className="btn btn-sm btn-outline-danger" onClick={deleteItem}><DeleteIcon />
                </button>
            </div>
            
        </div>
        {showModal && <Modal mode='edit' setShowModal={setShowModal} task={task} getData={getData}/>}
    </>
  )
}

export default ListItem