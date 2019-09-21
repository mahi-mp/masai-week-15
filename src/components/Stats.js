import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,} from 'recharts';
export default class Example extends PureComponent 
{
    constructor(props)
    {
        super(props)
        this.state={
            alldata:[],
            alldata2:[]
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

  render() {
      console.log(this.state.alldata)
    return (
      <LineChart width={500} height={300} data={this.state.alldata} margin={{ top: 5, right: 30, left: 20, bottom: 5,}} >
        <CartesianGrid strokeDasharray="3 2" />
        <XAxis dataKey={this.state.alldata2.map(ele=>{return(ele[0])})} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey={this.state.alldata2.map(ele=>{return(ele[4])})} stroke="#8884d8" activeDot={{ r: 8 }} />
        
      </LineChart>
    );
  }
}
