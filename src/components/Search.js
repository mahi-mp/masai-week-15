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
            alldata:[...this.state.alldata,...response.data]
        }))
        .catch(err => console.log(err));

        axios.get('http://localhost:5000/show')
        .then(response =>
            this.setState({
            alldata2:[...this.state.alldata2,...response.data]
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
                                if(ele.name==this.props.location.state.data )
                                {
                                    return(
                                        <tbody key={index}>
                                        {this.state.alldata.map((ele2,index2)=>
                                            {
                                                if(ele2.player1==this.props.location.state.data || ele2.player2==this.props.location.state.data )
                                                {
                                                    return(
                                                        <tr scope="col" key={index2}>
                                                            <th scope="row">{index2+1}</th>
                                                            <td>{ele.name}</td>
                                                            <td>{ele.country}</td>
                                                            <td>{ele.age}</td>                                 

                                                            <td>{ele2.p1score}</td>
                                                            {ele2.player1==this.props.location.state.data?<td>{ele2.player2}</td>:<td>@{ele2.player1}</td>}
                                                            <td>{ele2.court}</td>
                                                            <td>{ele2.turn}</td>
                                                            
                                                            <td>{ele2.p2score}</td>
                                                            <td>{ele2.win}</td>
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