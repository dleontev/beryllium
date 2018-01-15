import React, { Component } from 'react';

class CreateUser extends Component{
    render(){
        return(
            <form action="/api/users/" method="POST">
                email <input type="text" name="email"/> <br/>
                First Name<input type="text" name="first_name"/> <br/>
                Middle Name <input type="text" name="middle_name"/> <br/>
                Last Name <input type="text" name="last_name"/> <br/>
                Time Zone <input type="number" name="time_zone"/> <br/>
                Password <input type="text" name = "password"/> <br/>
                <button type="submit"> Save </button>
            </form>
        );
    }
}

export default CreateUser;