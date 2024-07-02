import React from 'react'
import './App.css'
import MovieProvider from './Context/MovieContext'
import RouterComponent from './components/RouterComponent/RouterComponent'

const App = () => {
    return (
        <MovieProvider>
            <RouterComponent />
        </MovieProvider>
    )
}

export default App
