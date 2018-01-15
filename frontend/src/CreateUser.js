import React, { Component } from 'react';
var axios = require("axios");

class CreateUser extends Component{
    constructor(){
        super();
        this.state = {
            email: "",
            first_name: "",
            middle_name: "",
            last_name: "",
            time_zone: "",
            password: ""
        }
    }

    handleChange(e){
        e.preventDefault();
        switch(e.target.name){
            case "email":
                this.setState({
                    email: e.target.value
                })
                break;
            case "first_name":
                this.setState({
                    first_name: e.target.value
                })
                break;
            case "middle_name":
                this.setState({
                    middle_name: e.target.value
                })
                break;
            case "last_name":
                this.setState({
                    last_name: e.target.value
                })
                break;
            case "time_zone":
                this.setState({
                    time_zone: e.target.value
                })
                break;
            case "password":
                this.setState({
                    password: e.target.value
                })
                break;
        }
    }

    handleSubmit(e){
        axios({
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            url: 'http://localhost:4000/api/users/',
            data: {
              users: this.state
            }
          });
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit(this)}>
               Email <input type = "text" name = "email" onChange={this.handleChange.bind(this)}/>
               First Name <input type = "text" name = "first_name" onChange={this.handleChange.bind(this)}/>
               Middle Name <input type = "text" name = "middle_name" onChange={this.handleChange.bind(this)}/>
               Last Name <input type = "text" name = "last_name" onChange={this.handleChange.bind(this)}/>
               Time Zone <input type = "number" name = "time_zone" onChange={this.handleChange.bind(this)}/>
               Password <input type = "text" name = "password" onChange={this.handleChange.bind(this)}/>
               <button type="submit"> Submit </button>
            </form>
        );
    }
}

export default CreateUser;