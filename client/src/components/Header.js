import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actions from '../actions'
import {Link} from 'react-router-dom'

class Header extends Component {
  renderContent(){
    switch (this.props.auth){
      case null:
        return;
      case false:
        return (
          <React.Fragment>
            <div className="Socials">

              <li> <a  href="/auth/google" >  <img height="40px" src={require("../img/googleButton.png")} /></a> </li>
              <li> <a  href="/auth/facebook" >  <img height="70px" margin-top="10px" src="https://www.freeiconspng.com/uploads/facebook-sign-in-button-png-26.png" /></a> </li>
            </div>
          </React.Fragment>

        )
      default:
        return <li> <a href="/api/logout"> Logout</a> </li>
    }
  }


  render() {
    console.log('carajo',this.props.auth);
    return (
      <div>
      <nav>
        <div className="nav-wrapper container 2social" >

          <Link to={this.props.auth ? '/surveys' : '/'} 
            className="brand-logo"
            >Smart
          </Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <a href="sass.html">Inventory</a>
            </li>

              {this.renderContent()}
          </ul>
        </div>
      </nav>
    </div>)
  }
}

function mapStateToProps(state){
  return{
    auth: state.auth
  }
}

export default connect(mapStateToProps)(Header);
