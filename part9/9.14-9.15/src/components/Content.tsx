import React from 'react'
import { CoursePart } from '../App';
import { Part } from './Part'
export const Content = ({ parts }: { parts: Array<CoursePart> }) => {
    return (
        <div>
        {parts.map(p =>
            <Part key={p.name} part={p}></Part>
        )}
        </div>
    )
};