import * as React from 'react'
import { experimentalStyled as styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import MovieCardComponent from '../MovieCardComponent/MovieCardComponent'
import { Button, Typography } from '@mui/material'
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

const ShowAllMoviesComponent = () => {
    const [randomMovies, setRandomMovies] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        axios
            .get(
                // `http://localhost:3500/api/v1/admin/authenticate`, 
                `https://movie-rating-server.vercel.app/api/v1/admin/authenticate`, 
                {
                    withCredentials: 'true'
                }
            )
            .then((response) => {
                if (response.status === 200) {
                    fetchAllData()
                }
            })
            .catch((error) => {
                if(error.response.status == 401) {
                    location.href = '/admin/login'
                } else {
                alert(`Status : ${error.message}`);
                }
            });
    }, []);

    const fetchAllData = () => {
        axios
            // .get(`http://localhost:3500/api/v1/movie/all`)
            .get(`https://movie-rating-server.vercel.app/api/v1/movie/all`)
            .then((response) => {
                if (response.status === 200) {
                    setRandomMovies(response.data.data);
                }
            })
            .catch((error) => {
                alert(`Status: ${error.message}`);
            })
            .finally(() => {
                setLoading(false);
            });
    } 

    const handleAddNewMovieClick = () => {
        location.href = '/admin/add'
    }

    return (
        <Box sx={{ flexGrow: 1, backgroundColor: 'black' }}>
            <Box sx={{ paddingLeft: '43px', paddingTop: '2em', display: 'flex' }}>
                <Typography variant="h5">Add new movies to public</Typography>
                <Button variant='contained' sx={{ marginLeft: '1.5em'}} onClick={handleAddNewMovieClick}>Add</Button>
            </Box>
            <Box sx={{ paddingLeft: '43px', paddingTop: '2em' }}>
                <Typography variant="h5">Movies</Typography>
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
                    randomMovies.map((movie, index) => (
                        <Item key={index}>
                            <MovieCardComponent movie={movie} index={index} isEdit="true"/>
                        </Item>
                    ))
                )}
            </div>
        </Box>
    );
};



export default ShowAllMoviesComponent
