import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MovieCardComponent from '../MovieCardComponent/MovieCardComponent';
import { Typography } from '@mui/material';
import { MovieState } from '../../Context/MovieContext';

const Item = styled('div')(({ theme }) => ({
  backgroundColor: '#1a1a1a',
  borderRadius: '5px',
  color: 'white',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  flex: '0 0 auto',
  whiteSpace: 'normal',
  display: 'inline-block',
  width: '165px', 
  margin: theme.spacing(1),
  [theme.breakpoints.down('sm')]: {
    minWidth: '150px', 
  },
}));

const SearchResultComponent = ({movies, heading}) => {

    const {lastSearch} = MovieState()

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Box 
                sx={{
                    paddingLeft: '43px',
                    paddingTop: '2em'
                }}
            >
                <Typography variant="h5">{heading} </Typography>
            </Box>

            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'flex-start',
                    padding: '8px',
                    paddingLeft: '25px'
                }}
            >
                {movies ? (
                    movies.map((movie, index) => (
                        <Item key={index}>
                            <MovieCardComponent movie={movie} index={index} idEdit="false"/>
                        </Item>
                    ))
                ) : (
                    <Typography variant="body1">Loading...</Typography>
                )}
            </div>
        </Box>
    );
};


export default SearchResultComponent;
