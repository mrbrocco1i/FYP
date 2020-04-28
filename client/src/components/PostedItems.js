import React, {useEffect, useState} from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import axios from "axios";
import {getFromStorage} from "./storage";
import Pagination from "./Pagination";
import Container from "@material-ui/core/Container";
import Button from '@material-ui/core/Button';
import LabelIcon from '@material-ui/icons/Label';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        overflow: 'hidden',
        padding: theme.spacing(0, 3),
    },
    paper: {
        maxWidth: 600,
        margin: `${theme.spacing(1)}px auto`,
        padding: theme.spacing(2),
    },
}));


export default function AutoGridNoWrap() {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5);
    const [userEmail, setUserEmail] = useState('');
    const [open, setOpen] = useState(false);
    const [currentPostId, setId] = useState('');

    const classes = useStyles();
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = pageNumber => setCurrentPage(pageNumber);

    useEffect(() => {
        const fetchPosts = async () => {
            const obj = getFromStorage('userEmail');
            const { email } = obj;
            setUserEmail(email);
            const obj2 = {
                seller_email: email
            }
            const res = await axios.post('api/commodities/getByEmail', obj2);
            setPosts(res.data);
        }

        fetchPosts();
    }, []);

    const handleClose = (id) => {
        setOpen(false);
        console.log(id);
    };

    function onRemove(id) {
        console.log(id);
        axios.delete(`api/commodities/${id}`)
            .then(res => {
                alert(res.data.message);

                if (res.data.success) {
                    window.location.href = '/posted';
                }
            })

    }

    return (
        <div className={classes.root}>
            {currentPosts.map(post => (
            <Paper className={classes.paper} item key={post._id}>
                <Grid container wrap="nowrap" spacing={2}>
                    <Grid item>
                        <LabelIcon />
                    </Grid>
                    <Grid item xs>
                        <Typography>Title: {post.name}</Typography>
                        <Typography>Type: {post.type}</Typography>
                        <Typography>Price: €{post.price}</Typography>
                    </Grid>
                    <Grid>
                        <Button color="primary" onClick={onRemove.bind(this,post._id)}>REMOVE</Button>
                    </Grid>
                </Grid>
            </Paper>
            ))}
            <Container>
                <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} />
            </Container>
        </div>
    );
}
