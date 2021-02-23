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
import SearchResults from './components/SearchResults'
import Footer from './components/Footer'
import ImageUpload from './components/ImageUpload'
import AddRecipeModal from './components/AddRecipeModal'


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
      <Route exact path="/recipes" component={AllRecipes} />
      <Route exact path="/recipes/:recipeId" component={SingleRecipe} />
      <Route exact path="/userrecipes" component={UserRecipes} />
      <Route exact path="/search" component={SearchResults} />
      <Route exact path="/image" component={ImageUpload} />
      <Route exact path="/modal" component={AddRecipeModal} />
    </Switch>
    <Footer />
  </BrowserRouter>
)

export default App


