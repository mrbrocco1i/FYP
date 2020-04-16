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
import TextField from "@material-ui/core/TextField";
import {getFromStorage} from "./storage";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";

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

export default function CustomerService() {
    const [userEmail, setUserEmail] = useState('');
    const [message, setMessage] = useState('');
    const classes = useStyles();
    const [ifSuccessful, setIfSuccessful] = useState(false);
    const [open, setOpen] = useState(false);
    const [prompt, setPrompt] = useState('');

    function onTextboxChangeMessage(event) {
        return setMessage(event.target.value);
    }

    useEffect(() => {
        const fetchPosts = async () => {
            const obj = getFromStorage('userEmail');
            const { email } = obj;
            setUserEmail(email);
        }
        fetchPosts();
    }, []);

    const handleClose = () => {
        setOpen(false);
    };

    function onSubmit() {
        const obj = {
            email: userEmail,
            message: message
        }
        axios.post('api/users/sendComplaint',obj)
            .then(res => {
                setPrompt(res.data.message);
                setIfSuccessful(res.data.success);
                setOpen(true);
                if (res.data.success) {
                    setTimeout(() => {  window.location.href = '/customerService'; }, 2000);
                }
            })
    }



    return (
        <React.Fragment>
            <CssBaseline />
            <main>
                {/* Hero unit */}
                <div className={classes.heroContent}>
                    <Container maxWidth="sm">
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                            Contact Us
                        </Typography>
                        <Typography variant="h5" align="center" color="textSecondary" paragraph>
                            Leave any message to make this website better!
                        </Typography>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="msg"
                            label="message"
                            id="msg"
                            onChange={onTextboxChangeMessage}
                        />
                        <div className={classes.heroButtons}>
                            <Grid container spacing={2} justify="center">
                                <Grid item>
                                    <Button onClick={onSubmit} variant="contained" color="primary">
                                        Submit
                                    </Button>
                                    <Dialog
                                        open={open}
                                        onClose={handleClose}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                    >
                                        <DialogContent>
                                            {ifSuccessful &&
                                            <DialogContentText id="alert-dialog-description">
                                                {prompt}
                                            </DialogContentText>
                                            }
                                            {!ifSuccessful &&
                                            <DialogContentText id="alert-dialog-description">
                                                {prompt}
                                            </DialogContentText>
                                            }
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={handleClose} color="primary">
                                                Ok
                                            </Button>
                                        </DialogActions>
                                    </Dialog>
                                </Grid>
                            </Grid>
                        </div>
                    </Container>
                </div>
            </main>
        </React.Fragment>

    );


}