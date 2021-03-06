import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Pagination from "./Pagination";
import EcoIcon from '@material-ui/icons/Eco';
import commodityImage from '../assets/images/logo.png'

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Second-Hand Commodity Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles(theme => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
}));

const getPhoneNumber = async (email) => {
    console.log(email);
    const obj = {
        email: email
    }
    const res = await axios.post('api/users/getByEmail',obj);
    alert("Phone Number: " + res.data.phone);
}


export default function Album() {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(6);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            const res = await axios.get('api/commodities');
            setPosts(res.data);
            setLoading(false);
        }

        fetchPosts();

    }, []);

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = pageNumber => setCurrentPage(pageNumber);




    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline />
            <main>
                {/* Hero unit */}
                <div className={classes.heroContent}>
                    <Container maxWidth="sm">
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                            All Commodities
                        </Typography>
                        <Typography variant="h5" align="center" color="textSecondary" paragraph>
                            Find every second-hand commodity here at this website. You can see a recycling level for
                            each item. Choose what suits you best!
                        </Typography>

                    </Container>
                </div>
                <Container className={classes.cardGrid} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        {currentPosts.map(post => (
                            <Grid item key={post._id} xs={12} sm={6} md={4}>
                                <Card className={classes.card}>
                                    <CardMedia
                                        className={classes.cardMedia}
                                        image={commodityImage}
                                        title="Image title"
                                    />
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h4" component="h2">
                                            {post.name}
                                        </Typography>
                                        <Typography>
                                            Type: {post.type}
                                        </Typography>
                                        <Typography>
                                            Desc: {post.description}
                                        </Typography>
                                        <Typography>
                                            Price: €{post.price}
                                        </Typography>
                                        <Typography>
                                            Seller: {post.seller_email}
                                        </Typography>
                                        {post.recycling_index === 1 &&
                                            <Grid>
                                                <EcoIcon style={{backgroundColor:'#1FD14B'}}></EcoIcon>
                                            </Grid>
                                        }
                                        {post.recycling_index === 2 &&
                                            <Grid>
                                                <EcoIcon style={{backgroundColor:'#1FD14B'}}></EcoIcon>
                                                <EcoIcon style={{backgroundColor:'#1FD14B'}}></EcoIcon>
                                            </Grid>
                                        }
                                        {post.recycling_index === 3 &&
                                            <Grid>
                                                <EcoIcon style={{backgroundColor:'#1FD14B'}}></EcoIcon>
                                                <EcoIcon style={{backgroundColor:'#1FD14B'}}></EcoIcon>
                                                <EcoIcon style={{backgroundColor:'#1FD14B'}}></EcoIcon>
                                            </Grid>
                                        }
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" color="primary" onClick={getPhoneNumber.bind(this,post.seller_email)}>
                                            View Phone Number
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
                <Container>
                    <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} />
                </Container>
            </main>
        </React.Fragment>
    );
}