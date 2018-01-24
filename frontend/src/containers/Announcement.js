import React, {Component} from "react";
import { Link, Redirect } from "react-router-dom";
import api from "../api/Api";


class Announcement extends Component{
    constructor(props){
        super(props);
        this.state = {
            id: this.props.match.params.discussion_id
        }
    }

    render(){
        return(
            <section className="section">
                <h1 className="title is-4"> {this.state.id} </h1>   
            </section>
        );
    }
}

export default Announcement;