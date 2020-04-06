import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from "axios";
import {setInStorage} from "./storage";
import {BrowserRouter as Router,Route,
    Redirect,Switch} from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


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
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: "#186A3B",
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignUp() {

    // modal window
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };
    //

    const [signupUsername, setUsername] = useState('');
    const [signupEmail, setEmail] = useState('');
    const [signupPassword, setPassword] = useState('');
    const [prompt, setPrompt] = useState('');
    const [ifSuccessful, setIfSuccessful] = useState(false);

    const classes = useStyles();

    function onTextboxChangeSignUsername(event) {
        return setUsername(event.target.value);
    }

    function onTextboxChangeSignEmail(event) {
        return setEmail(event.target.value);
    }

    function onTextboxChangeSignPassword(event) {
        return setPassword(event.target.value);
    }

    const onSignup = event => {
        event.preventDefault();
        const newUser = {
            username: signupUsername,
            email: signupEmail,
            password: signupPassword
        };

        axios.post('api/users/signup', newUser)
            .then(res => {
                /*setInStorage('FYP', {token: res.data.token});
                setToken(res.data.token);*/
                setPrompt(res.data.message);
                setIfSuccessful(res.data.success);
                console.log(res.data);
                setOpen(true);

                if (res.data.success) {
                    setTimeout(() => {  window.location.href = '/login'; }, 2000);
                }

            })


    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                name="username"
                                variant="outlined"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                autoFocus
                                onChange={onTextboxChangeSignUsername}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={onTextboxChangeSignEmail}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={onTextboxChangeSignPassword}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary" />}
                                label="I want to receive inspiration, marketing promotions and updates via email."
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={onSignup}
                    >
                        Sign Up
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
                                {prompt}. Please log in now...
                            </DialogContentText>
                            }
                            {!ifSuccessful &&
                            <DialogContentText id="alert-dialog-description">
                                {prompt}. Please sign up again.
                            </DialogContentText>
                            }
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Ok
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/login" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}