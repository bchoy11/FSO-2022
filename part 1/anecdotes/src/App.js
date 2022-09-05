import { useState } from "react";

const App = () => {

  const [anecdotes, setAnecdotes] = useState([
    {
      quote: 'If it hurts, do it more often.',
      votes: 0,
    },
    {
      quote: 'Adding manpower to a late software project makes it later!',
      votes: 0,
    },
    {
      quote: 'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
      votes: 0,
    },
    {
      quote: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
      votes: 0,
    },
    {
      quote: 'Premature optimization is the root of all evil.',
      votes: 0,
    },
    {
      quote: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
      votes: 0,
    },
    {
      quote: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
      votes: 0,
    }
  
  ])
  const [selected, setSelected] = useState(0)

  const random = () => {
    setSelected((Math.floor(Math.random()*anecdotes.length)))
  }

  const addVote = () => {
    const copy = [...anecdotes]
    copy[selected].votes += 1
    setAnecdotes(copy)
  }

  const mostVoted = () => {
    let index = 0
    let max = 0
    anecdotes.forEach(element => {
      if(element.votes>max){
        index=anecdotes.indexOf(element)
        max=element.votes
      }
    })
    return index;
  }

  return (
    <div>
      <h2>Anecdote of the day</h2> 
      <p>{anecdotes[selected].quote}</p>
      <p>has {anecdotes[selected].votes} votes</p>
      <Vote handleClick={addVote} text="vote"/>
      <Button handleClick={random} text="next anecdote"/>
      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[mostVoted()].quote}</p>
    </div>
  );
}

//Components

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

const Vote = (props) => {
  return(
  <Button handleClick={props.handleClick} text={props.text}/>
  )
}


export default App;
