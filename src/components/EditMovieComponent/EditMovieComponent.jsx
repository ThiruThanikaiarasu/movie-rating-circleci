import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    TextField,
    MenuItem,
    FormControl,
    Select,
    InputLabel,
    Typography,
    Container,
    Grid,
    Chip,
} from '@mui/material';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const genres = [
    "Action", "Adventure", "Animation", "Biography", "Comedy", "Crime", "Documentary",
    "Drama", "Family", "Fantasy", "History", "Horror", "Music", "Musical", "Mystery",
    "Romance", "Sci-Fi", "Sport", "Thriller", "War", "Western"
];

const EditMovieComponent = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const {movie} = location.state
    if(movie == null){
        navigate('/admin')
    }

    const initialDate = new Date(movie.releasedDate);
    const formattedDate = `${initialDate.getFullYear()}-${(initialDate.getMonth() + 1).toString().padStart(2, '0')}-${initialDate.getDate().toString().padStart(2, '0')}`;

    const [formValues, setFormValues] = useState({
        title: movie.title,
        synopsis: movie.synopsis,
        releasedDate: formattedDate,
        rating: movie.rating,
        trailer: movie.trailer,
        genre: [...movie.genre],
        director: movie.director,
        cast: [...movie.cast],
        
    });

    const [formErrors, setFormErrors] = useState({});
    const [currentCastMember, setCurrentCastMember] = useState('');
    const [imagePreview, setImagePreview] = useState(null);

   

    const handleChange = (event) => {
        const { name, value, files } = event.target;
        if (name === 'poster' && files.length > 0) {
            const file = files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                setFormValues((prevValues) => ({
                    ...prevValues,
                    [name]: file
                }));
            };
            reader.readAsDataURL(file);
        } else {
            setFormValues({
                ...formValues,
                [name]: value
            });
        }
    };

    const handleAddCastMember = () => {
        if (currentCastMember.trim() !== '') {
            setFormValues({ ...formValues, cast: [...formValues.cast, currentCastMember] });
            setCurrentCastMember('');
        }
    };

    const handleRemoveCastMember = (index) => {
        const newCast = formValues.cast.filter((_, i) => i !== index);
        setFormValues({ ...formValues, cast: newCast });
    };

    const validate = () => {
        let errors = {};

        if (!formValues.title) errors.title = 'Title is a mandatory field';
        else if (formValues.title.length > 25) errors.title = 'Title can be at most 25 characters long';

        if (!formValues.synopsis) errors.synopsis = 'Synopsis is a mandatory field';

        if (!formValues.releasedDate) errors.releasedDate = 'Released Date is a mandatory field';
        else if (!/^\d{4}-\d{2}-\d{2}$/.test(formValues.releasedDate)) errors.releasedDate = 'Released Date must be a valid date';

        if (formValues.rating && !/^\d(\.\d)?$|^10(\.0)?$/.test(formValues.rating)) errors.rating = 'Rating should be a number from 0 to 10 with up to one decimal place';

        if (!formValues.genre || formValues.genre.length === 0) errors.genre = 'Genre is a mandatory field';

        if (!formValues.director) errors.director = 'Director is a mandatory field';

        if (formValues.cast.length === 0) errors.cast = 'Cast is a mandatory field and must be a non-empty array';

        return errors;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const errors = validate();
        if (Object.keys(errors).length === 0) {
            const formData = new FormData();
            formData.append('id', movie._id)
            formData.append('title', formValues.title);
            formData.append('synopsis', formValues.synopsis);
            formData.append('releasedDate', formValues.releasedDate);
            formData.append('rating', formValues.rating);
            formData.append('trailer', formValues.trailer);
            formValues.genre.forEach((genre) => formData.append('genre', genre));
            formData.append('director', formValues.director);
            formValues.cast.forEach((castMember) => formData.append('cast', castMember));

            axios
                .post(
                    // `http://localhost:3500/api/v1/movie/edit`, 
                    `https://movie-rating-server.vercel.app/api/v1/movie/edit`, 
                    formData,
                    {
                        withCredentials: 'true',
                    },
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        }
                    }
                )
                .then((response) => {
                    if (response.status === 200) {
                        setFormValues({
                            title: '',
                            synopsis: '',
                            releasedDate: '',
                            rating: '',
                            trailer: '',
                            genre: [],
                            director:'',
                            cast: []
                        });
                        setFormErrors({});
                        alert(response.data.message)
                        navigate('/admin')
                    }
                })
                .catch((error) => {
                    if (error.response.status === 401) {
                        alert("You need to be an admin to edit");
                        navigate('/admin')
                    } else {
                        alert(`Status : ${error.message}`);
                    }
                });

        } else {
            setFormErrors(errors);
        }
    };

    return (
        <Container maxWidth="md">
            <Box sx={{ mt: 4, mb: 2 }}>
                <Typography variant="h4" component="h1" gutterBottom color='black'>
                    Edit Movie
                </Typography>
            </Box>
            <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Title"
                            name="title"
                            value={formValues.title}
                            onChange={handleChange}
                            error={!!formErrors.title}
                            helperText={formErrors.title}
                            autoComplete='off'
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Synopsis"
                            name="synopsis"
                            value={formValues.synopsis}
                            onChange={handleChange}
                            error={!!formErrors.synopsis}
                            helperText={formErrors.synopsis}
                            autoComplete='off'
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Released Date"
                            name="releasedDate"
                            type="date"
                            value={formValues.releasedDate}
                            onChange={handleChange}
                            error={!!formErrors.releasedDate}
                            helperText={formErrors.releasedDate}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            autoComplete='off'
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Rating"
                            name="rating"
                            value={formValues.rating}
                            onChange={handleChange}
                            error={!!formErrors.rating}
                            helperText={formErrors.rating}
                            autoComplete='off'
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Trailer (optional)"
                            name="trailer"
                            value={formValues.trailer}
                            onChange={handleChange}
                            autoComplete='off'
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth error={!!formErrors.genre}>
                            <InputLabel>Genre</InputLabel>
                            <Select
                                name="genre"
                                value={formValues.genre}
                                onChange={handleChange}
                                multiple
                                sx={{ '& .MuiSelect-menu': { backgroundColor: '#000000' } }}
                            >
                                {genres.map((genre) => (
                                    <MenuItem key={genre} value={genre} sx={{ color: 'black' }}>
                                        {genre}
                                    </MenuItem>
                                ))}
                            </Select>
                            {formErrors.genre && <Typography color="error">{formErrors.genre}</Typography>}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Director"
                            name="director"
                            value={formValues.director}
                            onChange={handleChange}
                            error={!!formErrors.director}
                           
                            helperText={formErrors.director}
                            autoComplete='off'
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Cast Member"
                            value={currentCastMember}
                            onChange={(e) => setCurrentCastMember(e.target.value)}
                            error={!!formErrors.cast}
                            helperText={formErrors.cast ? 'Each cast member must be a non-empty string' : ''}
                            autoComplete='off'
                        />
                        <Button variant="outlined" onClick={handleAddCastMember} sx={{ mt: 1 }}>
                            Add Cast Member
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        {formValues.cast.map((castMember, index) => (
                            <Chip
                                key={index}
                                label={castMember}
                                onDelete={() => handleRemoveCastMember(index)}
                                sx={{ mt: 1, mr: 1, color: 'black', '& .MuiChip-label': { color: 'black' } }}
                            />
                        ))}
                    </Grid>
                    <Grid item xs={12} sx={{ paddingBottom: '2em' }}>
                        <Button type="submit" variant="contained" color="primary" onClick={handleSubmit} >
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default EditMovieComponent;
