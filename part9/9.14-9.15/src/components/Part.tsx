import React from 'react'
import { CoursePart } from '../App';

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

export const Part = ({ part }: { part: CoursePart }) => {
    switch (part.type) {
        case "normal":
            return (
                <div>
                    <p><b>{part.name} {part.exerciseCount}</b>
                    <br></br>
                    <i>{part.description}</i></p>
                </div>
            )
        case "groupProject":
            return (
                <div>
                    <p><b>{part.name} {part.exerciseCount}</b>
                    <br></br>
                    project exercises {part.groupProjectCount}</p>
                </div>
            )
        case "submission":
            return (
                <div>
                    <p><b>{part.name} {part.exerciseCount}</b>
                    <br></br>
                    <i>{part.description}</i>
                    <br></br>
                    submit to {part.exerciseSubmissionLink}</p>
                </div>
            )
        case "special":
            return (
                <div>
                    <p><b>{part.name} {part.exerciseCount}</b>
                    <br></br>
                    <i>{part.description}</i>
                    <br></br>
                    required skills: {part.requirements.map(r => `${r} `)}</p>
                </div>
            )
        default:
            return assertNever(part)
    }
};