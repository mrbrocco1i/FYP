import React, {useEffect, useState} from 'react';
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
import { Redirect } from "react-router-dom";
import axios from 'axios';
import {getFromStorage, setInStorage} from "./storage";
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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Login() {
    const classes = useStyles();
    const [signInEmail, setSignInEmail] = useState('');
    const [signInPassword, setSignInPassword] = useState('');
    const [redirect, setRedirect] = useState('http:localhost:3000/');
    const [signInError, setSignInError] = useState('');
    const [token, setToken] = useState(getFromStorage('FYP'));
    const [prompt, setPrompt] = useState('');
    const [ifSuccessful, setIfSuccessful] = useState(false);

    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    function onTextboxChangeSignEmail(event) {
        return setSignInEmail(event.target.value);
    }

    function onTextboxChangeSignPassword(event) {
        return setSignInPassword(event.target.value);
    }

    const handleSubmit = event => {
        event.preventDefault();

        const user = {
            email: signInEmail,
            password: signInPassword
        };

        axios.post('api/users/login', user)
            .then(res => {
                setOpen(true);
                setIfSuccessful(res.data.success);
                setPrompt(res.data.message);
                setInStorage('FYP', {token: res.data.token});
                setToken(res.data.token);
                console.log(res.data);
                if (res.data.success) {
                    setTimeout(() => {  window.location.href = '/'; }, 2000);
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
                    Log in
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={signInEmail}
                        onChange={onTextboxChangeSignEmail}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={signInPassword}
                        onChange={onTextboxChangeSignPassword}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSubmit}
                    >
                        Log In
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
                                {prompt}. Back to homepage...
                            </DialogContentText>
                            }
                            {!ifSuccessful &&
                            <DialogContentText id="alert-dialog-description">
                                {prompt}. Please log in again.
                            </DialogContentText>
                            }
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Ok
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Grid container>
                        <Grid item xs>
                        </Grid>
                        <Grid item>
                            <Link href="/signup" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}