import { useState, useEffect } from "react";
import phonebookService from "./services/phonebook";

const App = () => {
  const [people, setPeople] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [filterVal, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)

  useEffect(() => {
    phonebookService
      .getAll()
      .then(phonebook => setPeople(phonebook))
  },[])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} messageType={messageType}/>
      <Filter filterVal={filterVal} setFilter={setFilter}/>
      <h2>add a new</h2>
      <PersonForm 
        people={people} 
        setPeople={setPeople} 
        newName={newName} 
        newNum={newNum} 
        setNewName={setNewName} 
        setNewNum={setNewNum}
        setMessage={setMessage}
        setMessageType={setMessageType}
      />
      <h2>Numbers</h2>
      <Numbers people={people} filterVal={filterVal} setPeople={setPeople}/>
    </div>
  )
}

//components

const Filter = ({ setFilter, filterVal }) => {
  const handleFilter = (e) => {
    setFilter(e.target.value)
  }

  return(
    <div>
      filter shown with <input value={filterVal} onChange={handleFilter}/>
    </div>
  )
}

const PersonForm = ({ people, setPeople, newName, newNum, setNewName, setNewNum, setMessage, setMessageType}) => {

  const obj = {
    name: newName,
    number: newNum,
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if(checkDuplicate(newName)){
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const id = getId(newName)[0].id
        phonebookService
          .update(id, obj)
          .then(entry => {
            setPeople(people.map(person => person.id !== id ? person : entry))
            setMessageType('success')
            setMessage(`Updated ${newName}'s number`)
            setTimeout(()=>{
              setMessage(null)
              setMessageType(null)
            }, 4000)
          })
          .catch(error=>{
            setMessageType('error')
            setMessage(`Information of ${newName} has already been removed from server`)
            setTimeout(()=>{
              setMessage(null)
              setMessageType(null)
            }, 4000)
            setPeople(people.filter(people => people.id !== id))
          })
      }
      setNewName('')
      setNewNum('')
    }
    else{
      phonebookService
        .create(obj)
        .then(returnedEntry => {
          setPeople(people.concat(returnedEntry))
          setMessageType('success')
          setMessage(`Added ${returnedEntry.name}`)
          setTimeout(()=>{
            setMessage(null)
            setMessageType(null)
          }, 4000)
          setNewName('')
          setNewNum('')
        })
    }
  }

  const handleChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNum = (e) => {
    setNewNum(e.target.value)
  }

  const checkDuplicate = (name) => {
    if(people.some(person => person.name === name))
      return true
  }

  const getId = (name) => {
    return people.filter(person => person.name === name)
  }

  return(
    <form onSubmit={handleSubmit}>
      <div>
        name: <input value={newName} onChange={handleChange}/>
      </div>
      <div>
        number: <input value={newNum} onChange={handleNum}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Numbers = ({ people, filterVal, setPeople }) => {
  return(
    <>
      {people.filter(person => person.name.toLowerCase().includes(filterVal.toLowerCase())).map(person => (<Persons person={person} key={person.name} setPeople={setPeople} people={people}/>))}
    </>
  )
}

const Persons = ({ person, setPeople, people }) => {
  const handleClick = () => {
    phonebookService
      .remove(person.id)  
    setPeople(people.filter(p => p.id !== person.id))
  }

  return(
    <div>
      <p>
        {`${person.name} ${person.number} `}
        <button onClick={handleClick}>delete</button>
      </p>
    </div>
  )
}

const Notification = ({message, messageType}) => {
  if(message === null)
    return null

  return(
    <div className={messageType}>
      {message}
    </div>
  )
}

export default App;
