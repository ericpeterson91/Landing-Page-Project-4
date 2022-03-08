import React from 'react'
import Quote from './Quote'

export default function Todo(props) {
    return (
        <div>
            <label>Todo:</label>
            <input type="text" onChange={props.handleChange} />
            <button onClick={props.addToList}>Add to list</button>
            <Quote />
        </div>
    )
}