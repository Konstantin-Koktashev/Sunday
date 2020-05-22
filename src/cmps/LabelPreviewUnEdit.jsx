
import React from 'react'

export default function LabelPreviewUnEdit(props) {
    console.log('props from prev', props)

    return (
        <section onClick={()=> props.setLabel((props.color),(props.value))} className="box-label" style={{ backgroundColor: `${props.color}` }} >
            <p>{props.value}</p>
        </section>
    )
}

