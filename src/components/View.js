import React from "react";
import {Route, Link } from "react-router-dom";

export default class Search extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state={
            alldata:[],
            alldata2:[],
        }
    }
    componentDidMount()
    {
        const axios = require('axios'); 
        axios.get('http://localhost:5000/played')
        .then(response =>
            this.setState({
            alldata:[...this.state.alldata,...response.data.data]
        }))
        .catch(err => console.log(err));

        axios.get('http://localhost:5000/show')
        .then(response =>
            this.setState({
            alldata2:[...this.state.alldata2,...response.data.data]
        }))
        .catch(err => console.log(err));
    }
    render()
    {
      
        return(
            <React.Fragment>             
                 <div className="container mt-4">
                    <table class="table">
                        <thead class="thead-dark">
                            <tr>
                                <th scope="col">Match No</th>
                                <th scope="col">Player1</th>
                                <th scope="col">Player2</th>
                                <th scope="col">Court</th>
                                <th scope="col">Tournament</th>
                                <th scope="col">Player1 Score</th>
                                <th scope="col">Player2 Score</th>
                                <th scope="col">Winner</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.alldata.map((ele,index)=>{
                                    return(
                                    <tr key={index}>
                                        <th scope="row">{index+1}</th>
                                        <td>{ele[0]}</td>
                                        <td>{ele[1]}</td>
                                        <td>{ele[2]}</td>
                                        <td>{ele[3]}</td>
                                        <td>{ele[4]}</td>
                                        <td>{ele[5]}</td>
                                        <td>{ele[6]}</td>
                                    </tr>
                                    );                                        
                                })
                            }
                            
                        </tbody>
                    </table>
                </div>
            </React.Fragment>
        );
    }
}