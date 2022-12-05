import React,{useState,useEffect} from 'react';
import AddPerson from'./Components/Addperson'
import FilterPerson  from './Components/FilterPerson';
import ShowPerson from './Components/ShowPerson'
import service from './services/PhoneNo'
import './App.css'
import Notification from './Components/Notification'
const App=()=>{
  const [persons,setPersons] = useState([])
  const [newName,setNewname] = useState('')
  const [newNo,setNewNo] = useState('')
  const [filter,setFilter] = useState('')
  const [message,setMessage] = useState({
    type:'',
    message:''
  })
  useEffect(()=>{
    service.getAllNo()
    .then(response=>{
      setPersons(response.data)
      response.data.map(res=>console.log(res,'hello'))
    })
  },[])
  const addPerson = (e)=>{
    e.preventDefault()
    const checker = persons.filter((person)=>person.name===newName)
    if(checker.length>0){
      if(window.confirm(`${newName} is already in phone book wanna update the phone no`)){
        service.updateNo(getPersonId(newName)[0]._id,{name:newName,number:newNo})
        .then((oks)=>setMessage({type:'success',message:`${newName} has been updated Successfully`}))
        .catch(error=>setMessage({type:'error',message:`${error.message}`}))
        setTimeout(()=>{
          setMessage({type:'',message:''})
          service.getAllNo()
          .then(response=>{
            setPersons(response.data)
            response.data.map(res=>console.log(res,'hello'))
          })
        },3000)
      }
      console.log(message)
    }
    else{
      service.addNewNo({name:newName,number:newNo})
      .then((response)=>setMessage({type:'success',message:`${newName} has been added Successfully`}))
      .catch(error=>setMessage({type:'error',message:`${error.message}`}))
      setTimeout(()=>{
        setMessage({type:'',message:''})
        service.getAllNo()
        .then(response=>{
          setPersons(response.data)
          response.data.map(res=>console.log(res,'hello'))
         })
      },3000)
      
    }
    
  }
  const getPersonname=(id)=>{
    return persons.filter((person)=>person._id===id)
  }
  const getPersonId=(name)=>{
    return persons.filter((person)=>person.name===name)
  }
  const deletePerson =(id)=>{
    if(window.confirm(`Do You Really wanna delete ${getPersonname(id)[0].name} `)){
      service.deleteNo(id)
      .then((response)=>{
        setMessage({type:'success',message:`${getPersonname(id)[0].name} is removed from server`})
      })
      .catch((error)=>{
        setMessage({type:'error',message:`${getPersonname(id)[0].name} is not found in server`})
      })
      setTimeout(()=>{
        setMessage({type:'',message:''})
        service.getAllNo()
        .then(response=>{
          setPersons(response.data)
          response.data.map(res=>console.log(res,'hello'))
        })
      },3000)
    }
  }
  const handelNameChange=(e)=>{
    setNewname(e.target.value)
  }
  const handelNoChange=(e)=>{
    setNewNo(e.target.value)
  }
  const handelFilterChange=(e)=>{
    setFilter(e.target.value)
  }
  return (
    <div>
      <h1>PhoneBook</h1>
     {message.message===''?``: <Notification messages={message}/>}
      <p></p>
      <FilterPerson handelFilterChange={handelFilterChange}/>
      <br></br>
      <AddPerson addPerson={addPerson} handelNoChange={handelNoChange} handelNameChange={handelNameChange}/>
      <div>
        <h1>Numbers</h1>
      <ShowPerson persons={persons} deleteNo={deletePerson} filter={filter}/>
      </div>
    </div>
  )
}
export default App