import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Box from '@material-ui/core/Box';
import Button from "@material-ui/core/Button";
import {getFromStorage} from "./storage";
import axios from "axios";
import Grid from '@material-ui/core/Grid';
import LabelIcon from "@material-ui/icons/Label";
import TextField from "@material-ui/core/TextField";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '60%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
}));

export default function ControlledExpansionPanels() {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [userEmail, setUserEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [newPhone, setNewPhone] = useState('');
    const [username, setUsername] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [password, setPassword] = useState('');
    const [ifSuccessful, setIfSuccessful] = useState(false);
    const [open, setOpen] = useState(false);
    const [prompt, setPrompt] = useState('');


    function onTextboxChangeUsername(event) {
        return setNewUsername(event.target.value);
    }

    function onTextboxChangePhone(event) {
        return setNewPhone(event.target.value);
    }

    function onTextboxChangePassword(event) {
        return setPassword(event.target.value);
    }

    useEffect(() => {
        const fetchPosts = async () => {
            const obj = getFromStorage('userEmail');
            const { email } = obj;
            setUserEmail(email);

            const obj2 = {
                email: email
            }
            const res = await axios.post('api/users/getByEmail', obj2);
            setPhone(res.data.phone);
            setUsername(res.data.username);
        }
        fetchPosts();
    }, []);

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    function onUpdateUsername() {
        const upd = {
            email: userEmail,
            username: newUsername
        }
        axios.post('api/users/updUsername',upd)
            .then(res => {
                setPrompt(res.data.message);
                setIfSuccessful(res.data.success);
                setOpen(true);
                if (res.data.success) {
                    setTimeout(() => {  window.location.href = '/acc'; }, 2000);
                }
            })
    }

    function onUpdatePhone() {
        const upd = {
            email: userEmail,
            phone: newPhone
        }
        axios.post('api/users/updPhone',upd)
            .then(res => {
                setPrompt(res.data.message);
                setIfSuccessful(res.data.success);
                setOpen(true);
                if (res.data.success) {
                    setTimeout(() => {  window.location.href = '/acc'; }, 2000);
                }
            })
    }

    function onUpdatePsd() {
        const upd = {
            email: userEmail,
            password: password
        }
        axios.post('api/users/updPsd',upd)
            .then(res => {
                setPrompt(res.data.message);
                setIfSuccessful(res.data.success);
                setOpen(true);
                if (res.data.success) {
                    setTimeout(() => {  window.location.href = '/acc'; }, 2000);
                }
            })
    }


    return (
        <div className={classes.root}>
            <ExpansionPanel expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography className={classes.heading}>Username</Typography>
                    <Typography className={classes.secondaryHeading}>{username} --- Unfold to update your username</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Grid container wrap="nowrap" spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                onChange={onTextboxChangeUsername}
                            />
                        </Grid>
                        <Grid>
                            <Button color="primary" onClick={onUpdateUsername} >UPDATE</Button>
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
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2bh-content"
                    id="panel2bh-header"
                >
                    <Typography className={classes.heading}>Phone Number</Typography>
                    <Typography className={classes.secondaryHeading}>
                        {phone} --- Unfold to update your phone number
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Grid container wrap="nowrap" spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="phone"
                                label="Phone Number"
                                name="phone"
                                onChange={onTextboxChangePhone}
                            />
                        </Grid>
                        <Grid>
                            <Button color="primary" onClick={onUpdatePhone} >UPDATE</Button>
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
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3bh-content"
                    id="panel3bh-header"
                >
                    <Typography className={classes.heading}>Password</Typography>
                    <Typography className={classes.secondaryHeading}>
                        Unfold to update your password
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Grid container wrap="nowrap" spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={onTextboxChangePassword}
                            />
                        </Grid>
                        <Grid>
                            <Button color="primary" onClick={onUpdatePsd} >UPDATE</Button>
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
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    );
}
