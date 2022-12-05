import React from 'react'
const AddPerson = (props)=>{
  const   {addPerson,handelNoChange,handelNameChange} = props
return(
    <div>
        <h1>Add New No </h1>
      <form onSubmit={addPerson} >
        <div>
          Name:<input type="text"  name='name' onChange={handelNameChange}/>
        </div>
        <br></br>
        <div>
          Number:<input type="text" name="number" onChange={handelNoChange}/>
        </div>
        
        <div>
          <button type="submit" >Add</button>
        </div>
      </form>
    </div>
)
} 
export default AddPerson