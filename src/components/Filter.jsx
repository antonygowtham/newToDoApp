import React, {useState } from "react"

function Filter({type,getFilteredTasks}){
    if(!type){
        return
    }
    return (
        <button type="button" className="btn btn-secondary mx-1 rounded-circle" onClick={()=>getFilteredTasks(type.category)}>{type.category}</button>
    )
}

export default Filter;