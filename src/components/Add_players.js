import React from "react";

export default class Add_players extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state={
            name:"",
            country:"",
            age:"",
            alldata:[],
        }
    }
    handlename=(e)=>{
        this.setState({
            name:e.target.value
        })
    }
    handlecountry=(e)=>{
        this.setState({
            country:e.target.value
        })
    }
    handleage=(e)=>{
        this.setState({
            age:e.target.value
        })
    }
    submitall=()=>
    {
        const axios = require('axios'); 
        const requestParam = {
                method: 'POST',
                url: 'http://localhost:5000/add',
                data : {
                    name : this.state.name,
                    country : this.state.country,
                    age:this.state.age
                }
            }
            axios(requestParam)
                 .then(response =>
                    {
                        this.setState({
                            alldata:[...this.state.alldata,response.data.data]
                        }) 
                        console.log(this.state.alldata)
                    } )
                 .catch(err => console.log(err));


        
        
    }
    componentDidMount()
    {
        const axios = require('axios'); 
        axios.get('http://localhost:5000/show')
        .then(response =>
            this.setState({
            alldata:[...this.state.alldata,...response.data.data]
        }))
        .catch(err => console.log(err));
    }
    render()
    {
        return(
            <React.Fragment>
                <div className="container">
                    <div className="jumbotron jumbotron-fluid mt-3 pt-3">
                        <label className=" d-flex justify-content-center lead text-danger mb-3">Enter Player details</label>
                        <div className="d-flex justify-content-center">
                            <input  className="mr-2" type="text" value={this.state.name} onChange={this.handlename} placeholder="Name"  />
                            <input className="mr-2" type="text" value={this.state.country} onChange={this.handlecountry} placeholder="Country"  />
                            <input  className="mr-2" type="text" value={this.state.age} onChange={this.handleage} placeholder="Age"  />
                            <button className="btn btn-outline-danger ml-2" onClick={this.submitall} >Submit</button>
                        </div>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-hover table-bordered table-dark">
                            <thead>
                                <tr>
                                    <th scope="col">Sr No</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Country</th>
                                    <th scope="col">Age</th>
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