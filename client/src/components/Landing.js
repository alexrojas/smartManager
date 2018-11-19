import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actions from '../actions'

class Landing extends Component {
  render(){
    return(
      <div style={{textAlign: "center"}} >
        <h1>Welcome to the Landing Page</h1>

        Lets collect data
      </div>
    )
  }
}

export default Landing;
