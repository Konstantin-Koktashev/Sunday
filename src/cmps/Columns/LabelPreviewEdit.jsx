import React, { Component } from "react";
import { CirclePicker } from "react-color";

export default class extends Component {
  state = {
    text: "",
    color: "",
    id: "",
    colorPickerIsShown: false,
  };

  componentDidMount() {
    const { label } = this.props;
    this.setState(
      {
        text: label.value,
        color: label.color,
        id: label.id,
      },
      () => console.log("edit", this.state)
    );
  }

  toggleCirclePicker = (ev) => {
    ev.stopPropagation();
    this.setState(({ colorPickerIsShown }) => ({
      colorPickerIsShown: !colorPickerIsShown,
    }));
  };

  onChangeComplete = (color) => {
    this.setState(
      { color: color.hex },
      () => console.log(this.state),
      () => {}
    );
  };

  handleChange = ({ target }) => {
    const value = target.value;
    this.setState({ text: value });
  };

  handleSubmit = (ev, label) => {
    ev.stopPropagation();
    let color = this.state.color;
    let text = this.state.text;
    this.props.setLabel(label, color, text);
  };

  render() {
    const { colorPickerIsShown, color, text } = this.state;
    return (
      <>
        <section className="box-label">
          <input
            name="text"
            type="text"
            value={text}
            onChange={this.handleChange}
          ></input>
          <div
            style={{ backgroundColor: `${color}` }}
            onClick={(ev) => this.toggleCirclePicker(ev)}
          >
            C
          </div>
        </section>
        {colorPickerIsShown && (
          <CirclePicker
            onChangeComplete={(color) => this.onChangeComplete(color)}
          />
        )}
        <div onClick={(ev) => this.handleSubmit(ev, this.props.label)}>
          Save Changes
        </div>
      </>
    );
  }
}
