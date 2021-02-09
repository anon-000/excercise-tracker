import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';




export default class ExcerciseList extends Component{
    constructor(props){
        super(props);
        this.deleteExcercise = this.deleteExcercise.bind(this);
        this.state = {
            excercises: []
        };
    }


    componentDidMount(){
        axios.get("http://localhost:5000/excercises").then(res => {
            if(res.data.length > 0){
                this.setState({
                    excercises: res.data,
                });
            }
        }).catch(err => {
            console.log(err);
        });
    }
    

    deleteExcercise(id){
        console.log("de;ete" + id);
        axios.delete("http://localhost:5000/excercises/"+id).then(res => {
            console.log("deleted successfully");
            this.setState({
                excercises: this.state.excercises.filter((e) => e._id !== id)
            });
        }).catch(err => {
            console.log(err);
        });
    }


    exerciseList() {
        return this.state.excercises.map(excercise => {
          return <Excercise excercise={excercise} delete={this.deleteExcercise} key={excercise._id} />;
        })
      }

    render(){
        return (
            <div className='container'>
                <h3>Excercises</h3>
                <table className='table'>
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.exerciseList()
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}



const Excercise = props => {
    return <tr>
        <td>{props.excercise.userName}</td>
        <td>{props.excercise.description}</td>
        <td>{props.excercise.duration}</td>
        <td>{props.excercise.date.substring(0,10)}</td>
        {/* <td>{props.excercise._id}</td> */}
        <td>
            <Link to={"/edit/"+props.excercise._id}>edit</Link> | <a href="." onClick={()=>props.delete(props.excercise._id)}>delete</a>
        </td>
    </tr>;
}