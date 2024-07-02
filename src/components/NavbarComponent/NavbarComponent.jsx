import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Slide from '@mui/material/Slide';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import SearchIcon from '@mui/icons-material/Search';
import Select from '@mui/material/Select';
import Badge from '@mui/material/Badge';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { styled, alpha } from '@mui/material/styles';
import logo from '../../assets/logo.png';
import InputBase from '@mui/material/InputBase';
import axios from 'axios';
import { MovieState } from '../../Context/MovieContext';


const Search = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
    width: 'auto',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
    },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 1),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledSelect = styled(Select)(({ theme }) => ({
    color: 'white',
    backgroundColor: 'black',
    '& .MuiSelect-select': {
        padding: theme.spacing(1, 1, 1, 0),
        transition: theme.transitions.create('width'),
        width: 'auto',
        minWidth: '60px',
        paddingLeft: '15px',
    },
    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: alpha(theme.palette.common.white, 0.25),
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: alpha(theme.palette.common.white, 0.5),
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: alpha(theme.palette.common.white, 0.75),
    },
    '& .MuiMenu-paper': {
        backgroundColor: 'black', 
    },
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
    color: 'black', 
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25), 
    },
}));

const SuggestionsContainer = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: 'calc(100% + 8px)', 
    left: '133px',
    width: 'auto', 
    backgroundColor: '#353535', 
    zIndex: 1,
    boxShadow: theme.shadows[1],
    borderRadius: theme.shape.borderRadius,
}));

function HideOnScroll(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
    });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

HideOnScroll.propTypes = {
    children: PropTypes.element.isRequired,
    window: PropTypes.func,
};

export default function NavbarComponent(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const [isLogin, setIsLogin] = React.useState(false);
    const [filter, setFilter] = React.useState('all');
    const [inputSearch, setInputSearch] = React.useState('');
    const [suggestions, setSuggestions] = React.useState([]); 
    const [selectedSuggestion, setSelectedSuggestion] = React.useState(''); 
    const { setFilteredMovies, setIsSearchResultNone, setLastSearch } = MovieState();

    const inputRef = React.useRef(null)

    const handleChange = (event) => {
        setFilter(event.target.value);
    };

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleSignUp = () => {
        // Implement sign up logic here
    };

    const handleSearchChange = (event) => {
        if(event.target.value == '') {
            setSuggestions([])
        }
        const query = event.target.value;
        setInputSearch(query);

        // Fetch suggestions based on input query
        if (query.trim() !== '') {
            fetchSuggestions(query);
        } else {
            setSuggestions([]);
        }
    };

    const fetchSuggestions = (query) => {

        axios
            .get(
                // `http://localhost:3500/api/v1/movie/suggestion/${filter}/${query}`, 
                `https://movie-rating-server.vercel.app/api/v1/movie/suggestion/${filter}/${query}`, 
            )
            .then((response) => {
                if (response.status === 200) {
                    setSuggestions(response.data.data)
                }
            })
            .catch((error) => {
                // alert(error.message)
                console.log(error.message)
            });

        // setSuggestions(filteredSuggestions);
    };

    const filteredSuggestions = suggestions.filter((suggestion) => {
        if (filter === 'title' || filter === 'all') {
            return suggestion.title.toLowerCase().includes(inputSearch.toLowerCase());
        } else if (filter === 'genre') {
            return suggestion.genre.toLowerCase().includes(inputSearch.toLowerCase());
        } else if (filter === 'director') {
            return suggestion.director.toLowerCase().includes(inputSearch.toLowerCase());
        }
        return false;
    });

    const handleSuggestionClick = (suggestion) => {
        // Update input field with selected suggestion
        setInputSearch(suggestion.title);
        setSelectedSuggestion(suggestion.title);
        setSuggestions([]); // Clear suggestions
        if(inputRef.current){
            inputRef.current.focus()
        }
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        if (inputSearch.trim() !== '') {
            setFilteredMovies([]);
            setLastSearch(selectedSuggestion);

            // Perform search based on selected suggestion
            let url;
            if (filter !== 'all') {
                // url = `http://localhost:3500/api/v1/movie?${filter}=${inputSearch}`
                url = `https://movie-rating-server.vercel.app/api/v1/movie?${filter}=${inputSearch}`
            } else {
                // url = `http://localhost:3500/api/v1/movie/${inputSearch}`
                url = `https://movie-rating-server.vercel.app/api/v1/movie/${inputSearch}`
            }

            axios
                .get(url)
                .then((response) => {
                    if (response.status === 200) {
                        setInputSearch('');
                        setSelectedSuggestion('');
                        setSuggestions([])
                        if (response.data.data.length === 0) {
                            setIsSearchResultNone(true);
                        } else {
                            setFilteredMovies(response.data.data);
                        }
                    }
                })
                .catch((error) => {
                    alert(`Status : ${error.message}`);
                });
        }
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
                open={isMobileMenuOpen}
                onClose={handleMobileMenuClose}
            >
                <MenuItem>
                    <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                        <Badge badgeContent={4} color="error">
                            <MailIcon />
                        </Badge>
                    </IconButton>
                    <p>Messages</p>
                </MenuItem>
                <MenuItem>
                    <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
                        <Badge badgeContent={17} color="error">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    <p>Notifications</p>
                </MenuItem>
                <MenuItem onClick={handleProfileMenuOpen}>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="primary-search-account-menu"
                        aria-haspopup="true"
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                    <p>Profile</p>
                </MenuItem>
            </Menu>
        );
    
        // Dynamic suggestions dropdown menu
        const SuggestionsDropdown = (
            <SuggestionsContainer>
                {filteredSuggestions.map((suggestion) => (
                    <MenuItem key={suggestion._id} onClick={() => handleSuggestionClick(suggestion)}>
                        {suggestion.title}
                    </MenuItem>
                ))}
            </SuggestionsContainer>
        );
    
        return (
            <React.Fragment>
                <CssBaseline />
                <HideOnScroll {...props}>
                    <AppBar
                        sx={{
                            backgroundColor: '#121212',
                        }}
                    >
                        <Toolbar>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="open drawer"
                                sx={{ mr: 2, ml: 5 }}
                            >
                                <img src={logo} alt="Logo" style={{ width: '2em' }} />
                            </IconButton>
                            <Box sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                                <StyledSelect
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={filter}
                                    onChange={handleChange}
                                >
                                    <StyledMenuItem value={'all'}>All</StyledMenuItem>
                                    <StyledMenuItem value={'title'}>Movies</StyledMenuItem>
                                    <StyledMenuItem value={'genre'}>Genre</StyledMenuItem>
                                    <StyledMenuItem value={'director'}>Director</StyledMenuItem>
                                </StyledSelect>
                                <form onSubmit={(event) => handleSearchSubmit(event)}>
                                    <Search>
                                        <StyledInputBase
                                            placeholder="Search…"
                                            inputProps={{ 'aria-label': 'search' }}
                                            value={inputSearch}
                                            onChange={handleSearchChange}
                                            inputRef={inputRef}
                                        />
                                        <SearchIconWrapper>
                                            <SearchIcon />
                                        </SearchIconWrapper>
                                    </Search>
                                </form>
                                {suggestions.length > 0 && SuggestionsDropdown}
                            </Box>
                            <Box sx={{ flexGrow: 1 }} />
                            {!isLogin ? (
                                <IconButton
                                    size="large"
                                    edge="end"
                                    aria-label="sign up"
                                    onClick={handleSignUp}
                                    sx={{
                                        color: 'inherit',
                                        '&:hover': {
                                            backgroundColor: 'rgba(255, 255, 255, 0.08)',
                                        },
                                        borderRadius: '10px',
                                        paddingY: '6px',
                                        marginRight: '5px',
                                    }}
                                >
                                    <Typography variant="body1" sx={{ mr: 1, textAlign: 'center' }}>
                                        Sign Up
                                    </Typography>
                                </IconButton>
                            ) : (
                                <React.Fragment>
                                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                                        <IconButton
                                            size="large"
                                            edge="end"
                                            aria-label="account of current user"
                                            aria-controls={menuId}
                                            aria-haspopup="true"
                                            onClick={handleProfileMenuOpen}
                                            color="inherit"
                                        >
                                            <AccountCircle />
                                        </IconButton>
                                    </Box>
                                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                                        <IconButton
                                            size="large"
                                            aria-label="show more"
                                            aria-controls={mobileMenuId}
                                            aria-haspopup="true"
                                            onClick={handleMobileMenuOpen}
                                            color="inherit"
                                        >
                                            <MoreIcon />
                                        </IconButton>
                                    </Box>
                                </React.Fragment>
                            )}
                        </Toolbar>
                    </AppBar>
                </HideOnScroll>
                <Toolbar />
                {renderMobileMenu}
                {renderMenu}
            </React.Fragment>
        );
    }
    