import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import {images} from "../constants";
import {styled} from "@mui/material/styles";
import {useNavigate} from "react-router-dom";

const pages = [
    {
        title: 'صفحه اصلی',
        path: '/',
    },
    {
        title: 'درباره ما',
        path: '/about',
    },
    {
        title: 'بلیط‌ها',
        path: '/tickets',
    },
    {
        title: 'اقامتگاه‌ها',
        path: '/blogs',
    }
];

const ColorAppBar = styled(AppBar)(({theme}) => ({
    backgroundColor: '#c7751d'
}));


const SignUpLoginButton = styled(Button)(
    {
        color: '#c7751d',
        backgroundColor: 'white',
        borderColor: 'white',
        '&:hover': {
            backgroundColor: 'white',
            borderColor: 'white'
        }
    }
)

const Navbar = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const navigate = useNavigate();

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };


    return (
        <ColorAppBar dir={'rtl'} position="sticky">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <img
                        width='50'
                        height='50'
                        src={images.logo}
                        alt={'رایانش'}
                        style={{marginLeft: '1rem'}}
                    />

                    {/* for extra-small size screens*/}
                    <Box sx={{marginRight: 1, flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: {xs: 'block', md: 'none'},
                            }}
                        >
                            {
                                pages?.map((item) => (
                                    <MenuItem key={item.title} onClick={
                                        () => {
                                            navigate(item.path);
                                        }
                                    }>
                                        <Typography textAlign="center" sx={{color: '#c7751d'}}>{item.title}</Typography>
                                    </MenuItem>
                                ))}
                        </Menu>
                    </Box>


                    {/* for md and bigger size screens*/}
                        <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                            {pages?.map((item) => (
                                <Button
                                    key={item.title}
                                    onClick={
                                        () => {
                                            navigate(item.path);
                                        }
                                    }
                                    sx={{my: 2,
                                        color: 'white',
                                        display: 'block',
                                        // add left and right border to the button
                                        borderLeft: '1px solid white',
                                        width: '100px',
                                        borderRadius: 0,
                                        textAlign: 'center',
                                        backgroundColor: 'inherit'
                                    }}
                                >
                                    <Typography variant={'body1'} fontWeight={'bold'}
                                                textAlign="center">{item.title}</Typography>
                                </Button>
                            ))}
                        </Box>


                    <Box>
                        {true && <SignUpLoginButton color={'success'} variant='contained' onClick={
                            () => {
                                navigate('/signup');
                            }
                        }>
                            <Typography variant={'body1'}>
                                ثبت نام/ورود
                            </Typography>
                        </SignUpLoginButton>}
                        {false &&
                            <Avatar
                                alt="something shit"
                                src="/static/images/avatar/2.jpg"
                            />
                        }
                    </Box>
                </Toolbar>
            </Container>
        </ColorAppBar>
    );
};
export default Navbar;
