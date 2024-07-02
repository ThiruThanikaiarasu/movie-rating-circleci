import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'; // Watchlist icon
import StarIcon from '@mui/icons-material/Star'; 
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Button from '@mui/material/Button';
import { Box, Collapse } from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';

// import logo from "../../assets/logo.png"

const SaveIconWrapper = styled('div')({
  position: 'absolute',
  top: '2px',
  left: '2px',
  zIndex: 1,
});

const MovieCardComponent = ({index, movie, isEdit}) => {
  const [expanded, setExpanded] = React.useState(false);
  const navigate = useNavigate()

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleEditButtonClick = (movie) => {
    navigate('/admin/edit',{ state: {movie: movie}})
  }

  return (
    <Card sx={{ position: 'relative' , maxWidth: '165px', backgroundColor: '#1a1a1a', border: 'none', boxShadow: 'none' }}>
        <SaveIconWrapper
            sx={{
                backgroundColor: '#00000080',
                height: '3em',
                margin: '0px',
                position: 'absolute',
                borderRadius: '5px',
                zIndex: '1000',
                '&:hover': {
                backgroundColor: '#00000050',
                height: '3.5em'
                }
            }}
            >
            {isEdit === "true" ? (
                <IconButton aria-label="edit" onClick={() => handleEditButtonClick(movie)}>
                    <EditIcon sx={{ color: 'white' }} />
                </IconButton>
            ) : (
                <IconButton aria-label="add to watchlist">
                    <BookmarkIcon sx={{ color: 'white' }} />
                </IconButton>
            )}
        </SaveIconWrapper>

  <CardMedia
    component="img"
    width="165px"    // Adjusted width
    height="244px"   // Adjusted height
    image={movie.poster}
    alt="Paella dish"
  />
  <CardContent
    sx={{
        padding: '0px',
    }}
  >
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', padding: '0px'}}>
        <CardActions 
                disableSpacing 
                sx={{ 
                    paddingX: '0px',
                    marginRight: '6px'
                }}>
            <IconButton 
                aria-label="rating" 
                sx={{ 
                    paddingX: '0px'
                }}
            >
              <StarIcon sx={{ fontSize: 'medium'}} color='yellow'/>
            </IconButton >
          </CardActions>
        <Typography variant="p"> 
            {movie && movie.rating}
        </Typography>
        <CardActions disableSpacing>
            <IconButton 
                aria-label="rating" 
                sx={{ 
                    padding: '0px',
                    ml: 1,
                    width: '100%',
                    height: '100%',
                    borderRadius: '5px',
                    '&:hover': {
                        backgroundColor: '#575757',
                        width: '100%',
                        height: '100%'
                    },
                }}>
              <StarBorderIcon 
                sx={{ 
                    fontSize: 'medium',
                     '&:hover': {
                        // fontSize: 'large',
                    },
                }} 
            />
            </IconButton>
          </CardActions>
    </Box>
    <Typography variant="p" component="div" gutterBottom sx={{ fontSize: '1.15em', height: '3em'}}>
      {index + 1}. {movie && movie.title}
      {/* the lords */}
    </Typography>
    <Button 
        sx={{
            width:'100%',
            marginTop: '.5em',
            backgroundColor: '#2c2c2c',
            color: '#497cbe',
            fontWeight: 'bold',
            '&:hover' :{
                backgroundColor: '#636c78'
            }
        }}
    >
      More
    </Button>
  </CardContent>
  
</Card>

  );
}

export default MovieCardComponent

