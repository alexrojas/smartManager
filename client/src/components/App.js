import React, {Component} from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import {connect} from 'react-redux'
import * as actions from '../actions'

import Header from './Header'
import Footer from './Footer'
import Landing from './Landing'

// const Header = () => <h2> Header </h2>
const Dashboard = () => <h2> dashboard </h2>
const Survey = () => <h2> Survey </h2>
// const Landing = () => <h2> Landing </h2>

class App extends Component {
  componentDidMount(){
    this.props.fetchUser()
  }

  render(){
    return(
      <div >
        <BrowserRouter>
          <div>
            <Header></Header>
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route path="/surveys/new" component={Survey} />
            <Footer></Footer>

          </div>
        </BrowserRouter>
      </div>
    )

  }
}

export default connect(null, actions)(App)
