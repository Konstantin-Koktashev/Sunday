import React from "react";

export default function SmallImg(props) {
  console.log("SmallImg -> props", props);
  if (props.url) {
    return (
      <img
        style={{ zIndex: `${props.zindex}` }}
        className="user-preview-circle-chat heartbeat "
        src={props.url}
        alt={props.name}
      />
    );
  }
  if (props.user) {
    let renderedName = props.user.username
      ? props.user.username
      : props.user.name;
    return (
      <div
        style={{ zIndex: `${props.zindex}` }}
        title={renderedName}
        className={`user-preview-circle heartbeat ${props.type}`}
      >
        {renderedName.charAt(0)}
      </div>
    );
  }
  return (
    <div
      style={{ zIndex: `${props.zindex}` }}
      title={props.name}
      className="user-preview-circle"
    >
      {props.name.charAt(0)}
    </div>
  );
}
