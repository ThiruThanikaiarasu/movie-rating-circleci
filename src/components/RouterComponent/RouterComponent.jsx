import React from 'react'
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import NavbarComponent from '../NavbarComponent/NavbarComponent'
import HomeComponent from '../HomeComponent/HomeComponent'
import AddMovieComponent from '../AddMovieComponent/AddMovieComponent'
import LoginComponent from '../LoginComponent/LoginComponent'
import ShowAllMoviesComponent from '../ShowAllMoviesComponent/ShowAllMovieComponent'
import EditMovieComponent from '../EditMovieComponent/EditMovieComponent'

const RouterComponent = () => {
  return (
    <Router>
        <NavbarComponent />
        <Routes>
            <Route path='/' element={<HomeComponent />} />
            <Route path='/admin' element={<ShowAllMoviesComponent />} />
            <Route path='/admin/login' element={<LoginComponent />} />
            <Route path='/admin/add' element={<AddMovieComponent />} />
            <Route path='/admin/edit' element={<EditMovieComponent />} />
        </Routes>
    </Router>
  )
}

export default RouterComponent