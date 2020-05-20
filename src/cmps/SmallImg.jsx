import React from 'react'

export default function SmallImg(props) {
if(props.url) return (
    <img style={{zIndex: `${props.zindex}`}} className="user-small-img" src={props.url} alt="R"/>
)

    return (
        <div style={{zIndex: `${props.zindex}`}} className="user-small-img">
          {props.name}
        </div>
    )
}
