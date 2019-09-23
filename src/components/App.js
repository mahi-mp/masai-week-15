import React from "react";
import {Route, Link } from "react-router-dom";
import Search from "./Search";
import Add_players from "./Add_players";
import Add_play from "./Add_play";
import View from "./View";
import Rank from "./Rank";
import Stats from "./Stats";
import User_delete from "./User_delete";
const Del = (props) =>{
  const axios = require('axios'); 
        const requestParam = {
        method: 'get',
        url: `http://localhost:5000/add/delete/${props.name.match.params.id}`,

    }
    axios(requestParam)
          .then(response =>
            {
                console.log(response)
            } )
          .catch(err => console.log(err));       
  console.log(typeof(props.name.match.params.id))
  return null
}
export default class App extends React.Component
{
  constructor(props)
  {
    super(props)
    this.state={
      search_input:""
    }
  }
  hand_change=(e)=>
  {
    this.setState({
      search_input:e.target.value
    })
  }
  
  render()
  {
    console.log(this.state.search_input)
    return(
      <React.Fragment>
        <div>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
              <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                <li className="nav-item active">
                  <Link to="/home/view" className="nav-link">Home <span className="sr-only">(current)</span></Link>
                </li>
                <li className="nav-item">
                  <Link to="/add" className="nav-link" >Add Player</Link>
                </li>
                <li className="nav-item">
                  <Link to="/players" className="nav-link" >Add Record</Link>
                </li>
                
              </ul>
              <div className="form-inline my-2 my-lg-0">
                <input className="form-control mr-sm-2" value={this.state.search_input} onChange={this.hand_change} placeholder="Search" aria-label="Search" />
                <Link to={{pathname:`/search`, state:{data:this.state.search_input}}}><button className="btn btn-outline-danger my-2 my-sm-0" >Search</button></Link>
              </div>
            </div>
          </nav>
        </div>
        <Route path="/search" component={Search} />
        <Route path="/add" component={Add_players} />
        <Route path="/add/delete/:id" render={(props)=>{return(<Del name={props} />)}} />
        <Route path="/players" component={Add_play} />
        <Route exact path="/home/view" component={View} />
        <Route path="/ranking" component={Rank} />
        <Route path="/stats" component={Stats} />
      </React.Fragment>
    );
  }
}