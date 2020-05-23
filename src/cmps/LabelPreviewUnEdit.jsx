
import React from 'react'



export default class LabelPreviewUnEdit extends React.Component {

    render() {
        const {color , value , _id} = this.props.label
        const {label} = this.props

        return (
            <section onClick={() => this.props.setLabel(label , color , value , _id)} className="box-label" style={{ backgroundColor: `${color}` }} >
                <p>{value}</p>
            </section>
        )
    }


}

