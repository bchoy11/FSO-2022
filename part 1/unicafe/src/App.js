import { useState } from 'react'

//Components
const Display = (props) => {
    return(
    <table>
      <tbody>
        <tr>
          <td style={{textAlign: "center"}}>{props.name}</td>
          <td style={{textAlign: "center"}}>{props.value}</td>
        </tr>
      </tbody>
    </table>
    )
}

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

const Statistics = ({good, neutral, bad}) => {

  const all = good+neutral+bad;
  const average = (good-bad)/(all);
  const positive = good/all;


  const stats = {
    all: all,
    average: average,
    positive: positive
  }

  if(all===0){
    return(<p>No feedback given</p>)
  }

  return (
    <>
      <Display name="good" value={good}/>
      <Display name="neutral" value={neutral}/>
      <Display name="bad" value={bad}/>
      <Display name='all' value={stats.all}/>
      <Display name='average' value={stats.average}/>
      <Display name='positive' value={stats.positive}/>
    </>
  )
}




//App
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  return (
    <div>
      <h2>give feedback</h2>
      <Button handleClick={()=>setGood(good+1)} text="good"/>
      <Button handleClick={()=>setNeutral(neutral+1)} text="neutral"/>
      <Button handleClick={()=>setBad(bad+1)} text="bad"/>
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  );
}

export default App;
