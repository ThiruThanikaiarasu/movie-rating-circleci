import * as React from 'react'
import { experimentalStyled as styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import MovieCardComponent from '../MovieCardComponent/MovieCardComponent'
import { Typography } from '@mui/material'
import axios from 'axios'
import { MovieState } from '../../Context/MovieContext'

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
}))

import CircularProgress from '@mui/material/CircularProgress';

const MovieListingTemplateComponent = ({ url, heading }) => {
    const [movies, setMovies] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        axios
            // .get(`http://localhost:3500/api/v1/movie/${url}`)
            .get(`https://movie-rating-server.vercel.app/api/v1/movie/${url}`)
            .then((response) => {
                if (response.status === 200) {
                    setMovies(response.data.data);
                }
            })
            .catch((error) => {
                // alert(`Status: ${error.message}`);
                console.log(error.message)
            })
            .finally(() => {
                setLoading(false);
            });
    }, [url]);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Box sx={{ paddingLeft: '43px', paddingTop: '2em' }}>
                <Typography variant="h5">{heading}</Typography>
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
                {loading ? (
                    <CircularProgress />
                ) : (
                    movies.map((movie, index) => (
                        <Item key={index}>
                            <MovieCardComponent movie={movie} index={index} isEdit="false"/>
                        </Item>
                    ))
                )}
            </div>
        </Box>
    );
};



export default MovieListingTemplateComponent
