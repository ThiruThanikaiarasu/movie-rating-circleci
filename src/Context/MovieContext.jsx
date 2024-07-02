import { createContext, useContext, useState } from "react"

const MovieContext = createContext()

const MovieProvider = ({ children }) => {
    const [user, setUser] = useState([])
    const [randomMovies, setRandomMovies] = useState([])
    const [filteredMovies, setFilteredMovies] = useState([])
    const [isSearchResultNone, setIsSearchResultNone] = useState(false)
    const [lastSearch, setLastSearch] = useState('')

    return (
        <MovieContext.Provider 
            value={{ 
                user, 
                setUser,
                randomMovies,
                setRandomMovies,
                filteredMovies,
                setFilteredMovies,
                isSearchResultNone,
                setIsSearchResultNone,
                lastSearch,
                setLastSearch 
            }}
        >
        {children}
        </MovieContext.Provider>
    )
}

export const MovieState = () => {
    return useContext(MovieContext)
}

export default MovieProvider
