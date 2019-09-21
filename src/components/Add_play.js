import React from "react";

export default class Add_players extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state={
            plr1score:"",
            plr2score:"",
            alldata:[],
            opt1:"",
            opt2:"",
            court:"",
            turn:"",
            alldata2:[],
        }
    }
    plr1=(e)=>{
        this.setState({
            plr1score:e.target.value
        })
    }
    plr2=(e)=>{
        this.setState({
            plr2score:e.target.value
        })
    }
   
    submitall=()=>
    {
        const axios = require('axios'); 
        const requestParam = {
                method: 'POST',
                url: 'http://localhost:5000/players',
                data : {
                    opt1 : this.state.opt1,
                    opt2 : this.state.opt2,
                    court : this.state.court,
                    turn : this.state.turn,
                    plr1score : this.state.plr1score,
                    plr2score:this.state.plr2score
                }
            }
            axios(requestParam)
                 .then(response =>
                    {                        
                        console.log(response)
                    } )
                 .catch(err => console.log(err));      
        
    }

    had_player2=(e)=>
    {
        this.setState({
            opt2:e.target.value
        })
    }

    had_player1=(e)=>
    {
        this.setState({
            opt1:e.target.value
        })
    }

    opt_court=(e)=>
    {
        this.setState({
            court:e.target.value
        })
    }

    opt_turnam=(e)=>
    {
        this.setState({
            turn:e.target.value
        })
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
        console.log(this.state.alldata)
        return(
            <React.Fragment>
                <div className="container">
                    <div className="jumbotron jumbotron-fluid mt-3 pt-3">
                        <label className=" d-flex justify-content-center lead text-danger mb-3">Enter Match details</label>
                        <div className=" d-flex justify-content-center">
                            <div className="container">
                                <select onChange={this.had_player1}  className="custom-select custom-select-lg">
                                    <option  defaultValue>Select player 1</option>
                                    {this.state.alldata2.map((ele,index)=>{
                                    return( <option key={index} >{ele[0]}</option>)
                                })}
                                </select>
                            </div>
                            <div className="container">
                                <select onChange={this.had_player2} className="custom-select custom-select-lg">
                                    <option defaultValue>Select player 2</option>
                                    {this.state.alldata2.map((ele,index)=>{
                                    return(
                                    <option key={index}>{ele[0]}</option>)
                                })}
                                </select>
                            </div>
                            <div className="container">
                                <select onChange={this.opt_court} className="custom-select custom-select-lg">
                                    <option defaultValue>Court</option>
                                    <option value="Grass">Grass</option>
                                    <option value="Clay">Clay</option>
                                    <option value="Hard">Hard</option>
                                </select>
                            </div>
                            <div className="container">
                                <select onChange={this.opt_turnam} className="custom-select custom-select-lg">
                                    <option defaultValue>Tournament</option>
                                    <option value="Australian">Australian Open</option>
                                    <option value="French">French Open</option>
                                    <option value="Wimbledon">Wimbledon</option>
                                    <option value="US">US Open</option>
                                </select>
                            </div>
                        </div>
                        <div className="row mt-4 container m-2">
                            <input  className="col mr-2" type="text" value={this.state.plr1score} onChange={this.plr1} placeholder={`Enter ${this.state.opt1} score`}  />
                            <input className="col mr-2" type="text" value={this.state.plr2score} onChange={this.plr2} placeholder={`Enter ${this.state.opt2} score`}  />
                             <button className="btn btn-outline-danger ml-2 w-50 " onClick={this.submitall} >Submit</button>
                        </div>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-hover table-bordered table-dark">
                            <thead>
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
                </div>
            </React.Fragment>
        );
    }
}