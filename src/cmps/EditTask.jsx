import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Select from 'react-select'
import Calendar from 'react-calendar';



export class EditTask extends Component {

    state={
        task:{
            _id: 2222,
            assignedGroupId:123,
            taskTitle: "Todo",
            createdAt: "date",
            submitDate:'1590030531',
            // Aggregation
            users: [
                { _id: 1234, name: 'shahar' }
            ], // Min users
            // Inside Tas
            columns: [], //  Columns Objects
            updates: [], // updates objects
            notes: [], // Notes objects
            people: [],
            status: 'Done',
            priority: 'urgent',
            DueDate: '15.02',
            budget: '150',
            text: 'text about task',
            link: '',
            assignedBy:1234,
            assignedTo:1234,
            associatedBoardId:1,
            assingedByUser:{  userName: "user1412",
            _id: "1",},
            assignedToUser:{
                userName: "user1412",
                _id: "2",
            }
        },
        boards:this.props.userBoards.board
    }
    getTaskBoardGroups=()=>{
     const  board  = this.state.boards
        const relaventBoard=board.find(board=>+board._id===this.state.task.associatedBoardId)
        const taskGroups=relaventBoard.groups
        return taskGroups
    }

    getReporter(){
        const Reporter=this.state.task.assingedByUser
        return Reporter
    }
    getSubmitDate(){
        
    }


    





    render() {
        console.log(this.getTaskBoardGroups());
        const taskGroups=this.getTaskBoardGroups()
        const Reporter=this.getReporter()
        console.log("EditTask -> render -> Reporter", Reporter)
        return (
            <div className='edit-modal'>
            <div className='group'>
                <span>Groups</span> 
                <select name="groups" id="groups">
                    {taskGroups.map(group=>{
                        return(<option>{group.name}</option>)
                    })}
  <option value="volvo">Volvo</option>
  <option value="saab">Saab</option>
  <option value="mercedes">Mercedes</option>
  <option value="audi">Audi</option>
</select>
            </div>
                <div className='assinging-user'>
                    <span>Reporter</span>
                    {Reporter.userName}
                </div>
                <div>
        <Calendar

        />
      </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    userBoards: state.userBoards,
    currUser: state.user
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(EditTask)






















// import React from "react";
// import { useForm, Controller } from "react-hook-form";
// import Select from "react-select";
// import { TextField, Checkbox } from "@material-ui/core";
// import { useState } from "react";

// export default function EditTask() {
//   const methods = useForm();
//   const { handleSubmit, control, reset,setValue  } = methods;
//   const onSubmit = data => console.log(data);
//   const groupOptions = [
//     { value: 'chocolate', label: 'Chocolate' },
//     { value: 'strawberry', label: 'Strawberry' },
//     { value: 'vanilla', label: 'Vanilla' }
//   ]

//   const [groupBoards, setGroup] = useState({ groupOptions: [
//     { value: 'chocolate', label: 'Chocolate' },
//     { value: 'strawberry', label: 'Strawberry' },
//     { value: 'vanilla', label: 'Vanilla' }
//   ] });

//   const handleMultiChange = selectedOption => {
//     setGroup( selectedOption);
//   }

//   return (
//     <form onChange={handleSubmit(onSubmit)}>
//       {/* Option 1 (preferred): pass a component to the Controller. */}
//       <Controller as={TextField} name="Group" control={control} defaultValue="" />

//       {/* Option 2: pass a JSX element to the Controller. */}
//       {/* Note that any prop passed to the element will be overriden. */}
//       {/* In this case, "SomeName" will be changed to "MyCheckbox". */}
//       <Controller
//         as={<Checkbox name="SomeName"/>}
//         name="MyCheckbox"
//         value="test"
//         control={control}
//         defaultValue={false}
//       />
//       <Controller
//         as={<Select options={groupOptions.groupBoards} />}
//         control={control}
//         rules={{ required: true }}
//         onChange={([selected]) => {
//           // Place your logic here

//           return selected;
//         }}
//         name="reactSelect"
//         defaultValue={{ value: "chocolate" }}
//       />

//     </form>
//   );
// }