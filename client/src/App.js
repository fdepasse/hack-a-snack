import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Register from './components/Register'
import Login from './components/Login'
import Logout from './components/Logout'
import Home from './components/Home'
import MyAccount from './components/MyAccount'
import Navbar from './components/Navbar'
import AllRecipes from './components/AllRecipes'
import SingleRecipe from './components/SingleRecipe'
import UserRecipes from './components/UserRecipes'
import Footer from './components/Footer'
// import AddRecipeModal from './components/AddRecipeModal'
// import UpdateProfileModal from './components/UpdateProfileModal'

import 'bulma'
import './styles/style.scss'

const App = () => (
  <BrowserRouter>
    <Navbar />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/logout" component={Logout} />
      <Route exact path="/myaccount" component={MyAccount} />
      <Route exact path="/allrecipes" component={AllRecipes} />
      <Route exact path="/singlerecipe" component={SingleRecipe} />
      <Route exact path="/userrecipes" component={UserRecipes} />
      {/* <Route exact path="/myaccount" component={AddRecipeModal} />
      <Route exact path="/myaccount" component={UpdateProfileModal} /> */}
    </Switch>
    <Footer />
  </BrowserRouter>
)

export default App


