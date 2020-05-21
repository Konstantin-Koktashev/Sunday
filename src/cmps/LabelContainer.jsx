import React, { Component } from 'react'
import LabelPreviewUnEdit from './LabelPreviewUnEdit'
import LabelPreviewEdit from './LabelPreviewEdit'

export default class LabelContainer extends Component {
    state = {
        isEditAble:false,
        labels: null,

       
    }

    componentDidMount() {
        this.loadLabels()
    }

    loadLabels = () => {
        this.setState({
            labels: [{
                order: 1,
                color: 'green',
                value: 'Done'
            },
            {
                order: 2,
                color: 'orange',
                value: 'Working'
            }, {
                order: 3,
                color: 'red',
                value: 'Stuck'
            }]

        })
    }

    // UNEDIT
    setLabel = (order) =>{
        //find the label with the order and set the label on the props who props column who submit the label
        console.log('got to set label with order num:' , order)
    }

    onRemove =(onRemove , orderId ) =>{

    }





    render() {
        const {isEditAble , labels}= this.state
        return (
            <section className="label-container">
                {!isEditAble && labels &&
                labels.map((label , idx)=>{
                  return  <LabelPreviewUnEdit setLabel={this.setLabel} key={idx} isEdit={false} value={label.value} color={label.color} order={label.order}/>
                })
                }

                {isEditAble && labels &&
                labels.map((label , idx)=>{
                    return  <LabelPreviewEdit
                    key={idx} value={label.value} color={label.color} order={label.order} onRemove={this.onRemove}  />
                })
                }
                


            </section>
        )
    }
}
