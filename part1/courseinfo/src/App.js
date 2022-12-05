import React from 'react';
const Header = ({header}) =>{
  return(
    <h1>{header}</h1>
  )
}
const Part =({part,excercise})=>{
  return(
    <div>
      {part} : {excercise}
    </div>
  )
}
const Content = ({parts})=>{
  return(
    <div>
     <Part part={parts[0].name} excercise={parts[0].excercies}/>
     <Part part={parts[1].name} excercise={parts[1].excercies}/>
     <Part part={parts[2].name} excercise={parts[2].excercies}/>
     </div>
    )
}
const Total =({parts})=>{
  return(
    <p>
      Total Excercises = {parts[0].excercies+parts[1].excercies+parts[2].excercies}
    </p>
  )

}
const App = () =>{
  const course = {
    name:'Half Stack application development',
    parts: [
      {
      name:'Fundamentals of React',
      excercies : 10
    },
      {
      name:'Using props to pass data',
      excercies:7
    },
      {
      name:'State of a component',
      excercies:14
    }
  ]
}
  return (
    <div>
      <Header header = {course.name}/>
      <Content parts={course.parts}/>
      <Total parts = {course.parts}/>
    </div>
  )
}


export default App