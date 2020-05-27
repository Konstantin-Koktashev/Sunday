import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

 class DropZone extends Component {
    constructor(props) {
        super(props);
          this.state = {
            selectedFile: null
          }
       
      }
      onChangeHandler=event=>{
        this.setState({
          selectedFile: event.target.files[0],
          loaded: 0,
        })
      }
      onChangeHandler=event=>{
        this.setState({
          selectedFile: event.target.files[0],
          loaded: 0,
        })
      }
      onChangeHandler=event=>{
        this.setState({
          selectedFile: event.target.files[0],
          loaded: 0,
        })
      }
    
    render() {
        return (
            <div>
                 <input type="file" name="file" onChange={this.onChangeHandler}/>
                 <input type="file" name="file" onChange={this.onChangeHandler}/>
                 <input type="file" name="file" onChange={this.onChangeHandler}/>
                 <input type="file" name="file" onChange={this.onChangeHandler}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(DropZone)
