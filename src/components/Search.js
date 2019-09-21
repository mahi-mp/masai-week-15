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
        console.log(this.props.location.state.data)
        console.log(this.state.alldata)
        console.log(this.state.alldata2[0])
        return(
            <React.Fragment>
               <div className="container mt-4">
                    <table class="table">
                        <thead class="thead-dark">
                            <tr>
                                <th scope="col">Match No</th>
                                <th scope="col">Name</th>
                                <th scope="col">Country</th>
                                <th scope="col">Age</th>
                                <th scope="col">Score</th>
                                <th scope="col">Against</th>
                                <th scope="col">Court</th>
                                <th scope="col">Tournament</th>
                                <th scope="col">Opponent score</th>
                                <th scope="col">Winner</th>
                            </tr>
                        </thead>
                        
                            {this.state.alldata2.map((ele,index)=>
                            { 
                                if(ele[0]==this.props.location.state.data )
                                {
                                    return(
                                        <tbody key={index}>
                                        {this.state.alldata.map((ele2,index2)=>
                                            {
                                                if(ele2[0]==this.props.location.state.data || ele2[1]==this.props.location.state.data )
                                                {
                                                    return(
                                                        <tr scope="col" key={index2}>
                                                            <th scope="row">{index2+1}</th>
                                                            <td>{ele[0]}</td>
                                                            <td>{ele[1]}</td>
                                                            <td>{ele[2]}</td>
                                                            <td>{ele2[4]}</td>
                                                            <td>@{ele2[1]}</td>
                                                            <td>{ele2[2]}</td>
                                                            <td>{ele2[3]}</td>
                                                            <td>{ele2[5]}</td>                                                            
                                                            <td>{ele2[6]}</td>
                                                            <td>{ele2[7]}</td>
                                                        </tr>    
                                                        );
                                                }
                                        })}
                                    </tbody>
                                        )
                                }
                            }
                            )}
                            
                    </table>
                </div>
            </React.Fragment>
        );
    }
}