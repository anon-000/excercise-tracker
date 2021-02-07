import React, { Component } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';



export default class CreateExcercise extends Component{

    constructor(props){
        super(props);

        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            userName: '',
            description: '',
            duration: 0,
            date: new Date(),
            users: [],
        }
    }


    componentDidMount(){
        this.setState({
            users : ['alexa', 'siri'],
            userName: 'alexa',
        });
    }

    onChangeUserName(e){
        this.setState({
            userName: e.target.value
        });
    }

    onChangeDescription(e){
        this.setState({
            description: e.target.value
        });
    }

    onChangeDuration(e){
        this.setState({
            duration: e.target.value
        });
    }

    onChangeDate(date){
        console.log(date);

        this.setState({
            date: date
        });
    }

    onSubmit(e){
        e.preventDefault();
        console.log("on submit");

        const excercise = {
            userName: this.state.userName,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date,
        };

        console.log(excercise);

        window.location = '/';
    }



    render(){
        return (
            <div className="container">
                <h3>Create New Excercise</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>

                        <select ref='userInput' required className="form-control" value={this.state.userName} onChange={this.onChangeUserName}>
                            {
                                this.state.users.map(function (user){
                                    return <option key={user} value={user}>{user}</option>;
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text" className="form-control" value={this.state.description} onChange={this.onChangeDescription} />
                    </div>
                    <div className="form-group">
                        <label>Duration: </label>
                        <input type="text" className="form-control" value={this.state.duration} onChange={this.onChangeDuration} />
                    </div>
                    <div className="form-group">
                        <label>Date:  </label>
                        <div>
                            <DatePicker className="form-control" selected={this.state.date} onChange={this.onChangeDate} />
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        );
    }
  
}