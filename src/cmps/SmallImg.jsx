import React from "react";

export default function SmallImg(props) {
  // CHANGE TO SWITCH CASE!!
  if (props.type === "myweek" && props.url) {
    return (
      <img
        style={{ zIndex: `${props.zindex}` }}
        className="user-preview-circle-myweek"
        src={props.url}
        alt={props.name}
      />
    );
  }
  if (props.type === "myweek" && !props.url) {
    return (
      <div
        style={{ zIndex: `${props.zindex}` }}
        title={props.name}
        className="user-preview-circle-myweek"
      >
        {props.name && props.name.charAt(0)}
      </div>
    );
  }
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
        {renderedName && renderedName.charAt(0)}
      </div>
    );
  }
  return (
    <div
      style={{ zIndex: `${props.zindex}` }}
      title={props.name}
      className="user-preview-circle"
    >
      {props.name && props.name.charAt(0)}
    </div>
  );
}
