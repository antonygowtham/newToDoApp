import React, {useState } from "react";
import Modal from "./Modal";
import {useCookies} from "react-cookie"

function ListHeader({getData}) {
    const [cookies,setCookie,removeCookie]=useCookies(null)
    const [showModal,setShowModal] =useState(false)


    function signOut(){
        console.log('signout')
        removeCookie('Email')
        removeCookie('AuthToken')
        window.location.reload()
    }

  return (
    <>
        <div className="col-md-6 text-center"><h1>My ToDo</h1></div>
        <div className="col-md-6 text-center">
            <p className="d-flex"><strong>{cookies.Email}</strong></p>
            <button className="btn btn-light mx-3" onClick={()=>setShowModal(true)}>ADD NEW TASK</button>
            <button className="btn btn-danger" onClick={signOut}>SIGN OUT</button>  
        </div>
        {showModal && <Modal mode={'create'} setShowModal={setShowModal} getData={getData}/>}
    </>
  )
}

export default ListHeader