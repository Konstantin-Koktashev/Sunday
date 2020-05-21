import React, { Component } from 'react'
import { CirclePicker } from 'react-color'




export default class extends Component {
    state = {
        text: '',
        color: '',
        colorPickerIsShown: false
    }

    componentDidMount() {
        this.setState({ color: this.props.color, text: this.props.value })
    }

    toggleCirclePicker = () => {
        console.log('yey')
        this.setState(({ colorPickerIsShown }) => ({ colorPickerIsShown: !colorPickerIsShown }))
    }

    onChangeComplete = (color) => {
        this.setState({ color: color.hex }, () => console.log(this.state), () => {

        })
    }
    // handleChange = (ev) => {
    //     console.log('anipo')
    //     var value = ev.target.value;
    //     console.log(value)
    //     this.setState({ value })
    // }

    handleChange = ({ target }) => {
        const value = target.value;
        this.setState({ text: value })
    }

    handleSubmit = () => {
        var labelObj = {
            color: this.state.color,
            text: this.state.text,
        }
        console.log('submit with obj:', labelObj)
    }


    render() {
        const { colorPickerIsShown, color, text } = this.state
        return (
            <>
                <section className="box-label">
                    <input name="text" type="text" value={text} onChange={(ev) => this.handleChange(ev)}></input>
                    <div style={{ backgroundColor: `${color}` }} onClick={this.toggleCirclePicker}>
                        C
                    </div>
                </section>
                {colorPickerIsShown && <CirclePicker onChangeComplete={(color) => this.onChangeComplete(color)} />}
                <div onClick={this.handleSubmit}>Apply</div>
            </>
        )
    }
}
