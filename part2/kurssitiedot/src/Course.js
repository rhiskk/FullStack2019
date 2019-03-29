import React from 'react'

const Course = (props) => {

    const courses = () => props.courses.map(course =>
        <div key={course.id}>
            <h1>{course.name} </h1>
            {
                course.parts.map(part=>
                    <p key={part.id}>{part.name} {part.exercises}</p>
                )
            }

            <p> Yhteensä {
                course.parts.reduce(
                    (s, p) => s + p.exercises,
                    0
                )
            } pistettä</p>
             
        </div>
    )

    return (
        <div>
            {courses()}
        </div>
    )
}

export default Course