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

    toggleCirclePicker = (ev) => {
        ev.stopPropagation()
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

    handleSubmit = (ev) => {
        ev.stopPropagation()
        let color = this.state.color
        let text = this.state.text
        this.props.setLabel(color, text)
    }

 


    render() {
        const { colorPickerIsShown, color, text } = this.state
        return (
            <>
                <section className="box-label">
                    <input name="text" type="text" value={text} onChange={this.handleChange}></input>
                    <div style={{ backgroundColor: `${color}` }} onClick={(ev) => this.toggleCirclePicker(ev)}>
                        C
                    </div>
                </section>
                {colorPickerIsShown && <CirclePicker onChangeComplete={(color) => this.onChangeComplete(color)} />}
                <div onClick={(ev) => this.handleSubmit(ev)}>Apply</div>
            </>
        )
    }
}
