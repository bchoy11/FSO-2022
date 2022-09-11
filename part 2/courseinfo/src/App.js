import Course from "./Course"

const App = () => {

  const courses =[
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          id: 1.1,
          name: 'Fundamentals of React',
          exercises: 10
        },
        {
          id: 1.2,
          name: 'Using props to pass data',
          exercises: 7
        },
        {
          id: 1.3,
          name: 'State of a component',
          exercises: 14
        },
        {
          id: 1.4,
          name: 'Redux',
          exercises: 11
        },
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          id: 2.1,
          name: 'Routing',
          exercises: 3,
        },
        {
          id: 2.2,
          name: 'Middlewares',
          exercises: 7,
        },
      ]
    }
  ]


  return(
    <div>
      <Course course={courses}/>
    </div>
  )
}

export default App