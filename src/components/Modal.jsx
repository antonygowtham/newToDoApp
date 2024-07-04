import React, {useState } from "react";
import axios from "axios";
import {useCookies} from "react-cookie";

function Modal({mode,setShowModal,getData,task}) {
    const serverUrl = import.meta.env.VITE_SERVERURL;
    const [cookies,setCookie,removeCookie]=useCookies(null);
    const [showNote,setShowNote]=useState(false)

    const editMode = mode == 'edit' ? true : false;

    const [data, setData] = useState({
        user_id : editMode ? task.user_id : cookies.UserId,
        title : editMode ? task.title : null,
        progress : editMode ? task.progress : null,
        category : editMode ? task.category : null,
        date: editMode ? task.date: new Date(),
    })

    async function postData(e){
        e.preventDefault()
        setShowNote(true)
        try {
            
            const response=await fetch(`${serverUrl}/todos`,{
                method:'POST',
                headers:{'content-type':'application/json'},
                body:JSON.stringify(data)
            })
            if(response.status === 200){
                getData();
                setShowModal(false);
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function editData(e){
        e.preventDefault()
        setShowNote(true)
        try {
            const response=await axios.patch(`${serverUrl}/todos/${task.id}`,data);
            if(response.status === 200){
                getData();
                setShowModal(false);
            }
        } catch (error) {
            console.error(error);
        }
    }

    function handleChange(e){
        const {name,value}=e.target;
        setData(data => ({
            ...data,[name]:value
        }))
    }

    return (
        <div className="overlay">
            <div className="container bg-white mt-5 rounded ">
                <div className="row">
                    <h3 className="col-10">Let's {mode} your task</h3>
                    
                    <button className="col-2 btn-danger" onClick={()=>setShowModal(false)}>X</button>
                </div>
                {showNote && <h2 class="text-center "><div class="text-center spinner-border"></div></h2>}
                <form className="p-3">
                    <div className="mb-3 mt-3">
                    <label className="form-label" for="title">Enter Task</label>
                        <input
                                className="form-control"
                                required
                                maxLength={30}
                                placeholder="enter task"
                                name="title"
                                value={data.title}
                                onChange={handleChange}
                            />
                    </div>

                    <div className="mb-3 mt-3">
                    <label className="form-label" for="category">Enter Category</label>
                        <input
                                className="form-control"
                                required
                                maxLength={30}
                                placeholder=" enter category"
                                name="category"
                                value={data.category}
                                onChange={handleChange}
                            />
                    </div>
                    
                    <div className="mb-3 mt-3">
                        <label className="form-label" for="range">drag to select your current progress</label>
                        <input
                                className="form-control"
                                required
                                type="range"
                                id="range"
                                min="0"
                                max="100"
                                name="progress"
                                value={data.progress}
                                onChange={handleChange}
                            />
                    </div>
                    <div className="mb-3 mt-3">
                        <input className="form-control" type="submit" onClick={editMode ? editData : postData} />
                    </div>
                </form>

            </div>
        </div>
      );
}
export default Modal