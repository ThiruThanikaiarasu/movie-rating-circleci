import React from 'react'
import MovieListComponent from '../MovieListComponent/MovieListComponent'
import { MovieState } from '../../Context/MovieContext'
import SearchResultComponent from '../SearchResultComponent/SearchResultComponent'
import { Box, Typography } from '@mui/material'
import MovieListingTemplateComponent from '../MovieListingTemplateComponent/MovieListringTemplateComponent'

const HomeComponent = () => {

    const { filteredMovies, isSearchResultNone, lastSearch } = MovieState()

  return (
    <div className='home-container'>
        { filteredMovies && filteredMovies.length > 0 &&
                <SearchResultComponent movies={filteredMovies} heading="Search Result" />
        }
        { isSearchResultNone && 
                <Box
                    sx={{
                        paddingTop: '2em',
                        paddingLeft: '43px'
                    }}
                >
                    <Typography variant='h5'>No result found for `{lastSearch}`</Typography>
                </Box>
        }

        <MovieListComponent />
        <MovieListingTemplateComponent url="latest" heading="Latest" />
        <MovieListingTemplateComponent url="top-rating" heading="Top Rated" />
    </div>
  )
}

export default HomeComponent