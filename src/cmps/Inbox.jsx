import React, { Component } from 'react'
import { TextField } from '@material-ui/core';
export default class Inbox extends Component {
  render() {
    return (
      <div>
        <form className={"classes.container"} noValidate>
          <TextField
            id="date"
            label="Due date"
            type="date"
            defaultValue="2017-05-24"
            className={"classes.textField"}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </form>
      </div>
    )
  }
}
