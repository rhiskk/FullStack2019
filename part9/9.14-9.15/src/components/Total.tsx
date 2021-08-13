import React from 'react'
import { CoursePart } from '../App';

export const Total = ({ parts }: { parts: Array<CoursePart> }) => {
    return (
        <p>
            Number of exercises{" "}
            {parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
        </p>
    )
};