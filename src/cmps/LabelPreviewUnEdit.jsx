
import React from 'react'



export default class LabelPreviewUnEdit extends React.Component {

    state = {
        text: '',
        value: '',
        order: ''
    }

    componentDidMount() {
        this.setState({
            text: this.props.value,
            color: this.props.color,
            order: this.props.order

        })
    }



    render() {

        return (
            <section onClick={() => this.props.setLabel((this.state), (this.props.value))} className="box-label" style={{ backgroundColor: `${this.props.color}` }} >
                <p>{this.props.value}</p>
            </section>
        )
    }


}

