import React, { Component } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import axios from 'axios';



export default class EditExcercise extends Component{
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

        axios.get("http://localhost:5000/excercises/"+this.props.match.params.id).then(res => {
            this.setState(
                {
                    userName: res.data.userName,
                    description: res.data.description,
                    duration: res.data.duration,
                    date: new Date(res.data.date),
                }
            );
        }).catch(err => {
            console.log(err);
        });

        axios.get("http://localhost:5000/users").then(res => {
            if(res.data.length > 0){
                this.setState({
                    users: res.data.map(user => user.userName),                
                });
            }
        }).catch(err => {
            console.log(err);
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

        const excercise = {
            userName: this.state.userName,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date,
        };

        console.log(excercise);

        axios.post("http://localhost:5000/excercises/update/"+this.props.match.params.id, excercise)
        .then( res => {
            console.log(res.data);
        })
        .catch( err => {
            console.log(err);
        });

        window.location = '/';
    }



    render(){
        return (
            <div className="container">
                <h3>Edit Excercise</h3>
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