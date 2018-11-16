import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actions from '../actions'

class Header extends Component {
  renderContent(){
    switch (this.props.auth){
      case null:
        return;
      case false:
        return (
          <React.Fragment>
            <li> <a href="/auth/google" >Google</a> </li>
            {/* <li> <a href="/auth/facebook" >facebook</a> </li> */}
          </React.Fragment>
        )
      default:
        return <li> <a> Logout</a> </li>
    }
  }


  render() {
    console.log('carajo',this.props.auth);
    return (
      <div>
      <nav>
        <div className="nav-wrapper container" >
          <a href="/" className="brand-logo">Smart </a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <a href="sass.html">Inventory</a>
            </li>
            <li>
              <a href="badges.html">RMA</a>
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
