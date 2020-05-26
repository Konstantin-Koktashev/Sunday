import React from 'react'

export default function SmallImg(props) {
if(props.url) return (
    <img style={{zIndex: `${props.zindex}`}} className="user-preview-circle" src={props.url} alt={props.name}/>
)

    return (
        <div style={{zIndex: `${props.zindex}`}} className="user-preview-circle">
          {props.name.charAt(0)}
        </div>
    )
}
