import React from 'react';
const Header = ({header}) =>{
    return(
      <h2>{header}</h2>
    )
  }
  const Part =({part,excercise,id})=>{
    return(
      <div>
        {part} : {excercise}
      </div>
    )
  }
  const Content = ({parts})=>{
     return parts.map((part)=>{
         return <Part key={part.id} part={part.name} excercise={part.excercies}/>
      })
}
const Sum = ({parts})=>{
    
   const sums = parts.reduce((sum,part)=>sum+part.excercies,0)
    return <div>
        <p>The Total Excercies are {sums}</p>
    </div>
}
  
const Course = ({course})=>{
    return(
        <div>
            <Header  header = {course.name}/>
            <Content  parts={course.parts}/>
            <Sum parts={course.parts}/>
        </div>
    )
}

export default Course