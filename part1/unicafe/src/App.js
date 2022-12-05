import React,{useState} from 'react';
const StatisticsLine = ({value})=>{
  return(
    <p>{value}</p>
  )
}
const Buttons =({text,task})=>{
  return(
    <button onClick={task}>{text}</button>
  )
}
const Statistics = ({good,neutral,bad})=>{
  const average = good*1+neutral*0+bad*-1
  const goodPercntage = (good/(good+neutral+bad))*100
  const total = good+bad+neutral
 
    if(good>0||bad>0||neutral>0)
      {
        return(
        <div>
          <table>
            <tbody>
              <tr>
                
              </tr>
              <tr>
                <td> <StatisticsLine  value="Good"/></td>
                <td> <StatisticsLine  value={good}/> </td>
                
              </tr><tr>
                <td> <StatisticsLine  value="Neutral"/></td>
                <td> <StatisticsLine  value={neutral}/> </td>
                
              </tr><tr>
                <td> <StatisticsLine  value="Bad"/></td>
                <td> <StatisticsLine  value={bad}/> </td>
                
              </tr>
              <tr>
                <td> <StatisticsLine  value="Total"/></td>
                <td> <StatisticsLine  value={total}/> </td>
                
              </tr>
              <tr>
                <td> <StatisticsLine  value="Average"/></td>
                <td> <StatisticsLine  value={average}/> </td>
                
              </tr><tr>
                <td> <StatisticsLine  value="positive"/></td>
                <td> <StatisticsLine  value={goodPercntage}/> </td>
                
              </tr>
            </tbody>
          </table>
          
      </div>
        )
    }
    return(
      <p>No FeedBack is avilable to provide statistics</p>
    )
   
  
}
const App =()=>{
  const [good,setGood] = useState(0)
  const [neutral,setNeutral] = useState(0)
  const [bad,setBad] = useState(0)
  const goodUpdatehandler =()=>{
    setGood(good+1)
  }
  const neutralUpdatehandler =()=>{
    setNeutral(neutral+1)
  }
  const badUpdatehandler =()=>{
    setBad(bad+1)
  }
  return(
    <div>
      <div>
        <h1>Give Your FeedBack</h1>
        <Buttons text="Good" task={goodUpdatehandler}/>
        <Buttons text="Neutral" task={neutralUpdatehandler}/>
        <Buttons text="Bad" task={badUpdatehandler}/>
        
      </div>
      <h1>Statistics</h1>
     <Statistics good={good} bad ={bad} neutral={neutral}/>

    </div>
  )
}
export default App