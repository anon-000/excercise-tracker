import React, { Component } from 'react';
import axios from 'axios';



export default class CreateUser extends Component{

    constructor(props){
        super(props);
        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            userName: '',
        }
    }

    onChangeUserName(e){
        this.setState({
            userName: e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();

        const user = {
            userName: this.state.userName,
        };

        console.log(user);

        axios.post("http://localhost:5000/users/add", user)
        .then( res => {
            console.log(res.data);
        })
        .catch( err => {
            console.log(err);
        });

        this.setState({
            userName: ''
        });
    }
       

    render(){
        return (
            <div className="container">
                <h3>Create New User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text" className="form-control" value={this.state.userName} onChange={this.onChangeUserName} />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        );
    }
}