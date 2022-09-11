const Course = ({course}) => {
    return (
      <>
        {course.map(course=>{
          return(
            <div key={course.id}>
              <Header course={course.name} />
              <Content parts={course.parts} />
              <Total parts={course.parts} />
            </div>
          )
        })}
        
      </>
    )
  }
  
//components

const Header = (props) => {
return(
    <h1>{props.course}</h1>
)
}

const Content = ({parts}) => {
return(
    <>
    {parts.map(part=><Part part={part.name} exercises={part.exercises} key={part.id}/>)}
    </>
)
}

const Part = ({part, exercises}) =>{
return(
    <p>
    {part} {exercises}
    </p>
)
}

const Total = ({parts}) =>{
const total = parts.reduce((prev, cur)=>prev+cur.exercises,0)
return(
    <>
    <p>total of {total} exercises</p>
    {/* <p>total of {parts[0].exercises + parts[1].exercises + parts[2].exercises} exercises</p> */}
    </>
)
}

export default Course