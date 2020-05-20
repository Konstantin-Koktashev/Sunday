import React from 'react'
import { useState,useEffect } from 'react'

export default function FilterByText(props) {
    const [searchStr,setSearchStr]=useState('')
    useEffect(() => {
        searchBoard()
        return () => {
            setSearchStr('')
        }
    }, [searchStr])
    return (
        <div>
            <input onChange={setSearch(e.target.value)}></input>
        </div>
    )
}
