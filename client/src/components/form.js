import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import axios from "axios";
import {getFromStorage, setInStorage} from "./storage";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

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

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    stepper: {
        padding: theme.spacing(3, 0, 5),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
}));

const steps = ['Title', 'Commodity info', 'Recycling info'];


export default function Form() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [material, setMaterial] = useState('');
    const [manufacturer, setManufacturer] = useState('');
    const [type, setType] = useState('');
    const [price, setPrice] = useState(0);
    const [userEmail, setUserEmail] = useState('');
    const [prompt, setPrompt] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [state, setState] = React.useState({
        checkedA: false,
        checkedB: false,
        checkedC: false,
    });

    const handleCheck = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    function onChangeName(event) {
        return setName(event.target.value);
    }
    function onChangeDesc(event) {
        return setDesc(event.target.value);
    }
    function onChangeMaterial(event) {
        return setMaterial(event.target.value);
    }
    function onChangeManufacturer(event) {
        return setManufacturer(event.target.value);
    }
    function onChangeType(event) {
        return setType(event.target.value);
    }
    function onChangePrice(event) {
        return setPrice(event.target.value);
    }

    useEffect(() => {
        const obj = getFromStorage('userEmail');
        const { email } = obj;
        setUserEmail(email);
    });

    function getStepContent(step) {
        switch (step) {
            case 0:
                return  <React.Fragment>
                    <Typography variant="h6" gutterBottom>
                        What's your post title?
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField required id="name" label="Title/name" fullWidth value={name} onChange={onChangeName} />
                        </Grid>
                    </Grid>
                </React.Fragment>;
            case 1:
                return <React.Fragment>
                    <Typography variant="h6" gutterBottom>
                        Detailed description of your good
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="type"
                                name="type"
                                label="Type"
                                fullWidth
                                value={type}
                                onChange={onChangeType}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="description"
                                name="description"
                                label="Desc. (condition, if worn out, any stains)"
                                fullWidth
                                value={desc}
                                onChange={onChangeDesc}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="material"
                                name="material"
                                label="Material"
                                fullWidth
                                value={material}
                                onChange={onChangeMaterial}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField required id="manufacturer" name="manufacturer" label="Manufacturer" fullWidth value={manufacturer} onChange={onChangeManufacturer} />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField
                                required
                                id="price"
                                name="price"
                                label="Price €"
                                fullWidth
                                value={price}
                                onChange={onChangePrice}
                            />
                        </Grid>
                    </Grid>
                </React.Fragment>;
            case 2:
                return  <React.Fragment>
                    <Typography variant="h6" gutterBottom>
                        Which following requirements does this good meet?
                    </Typography>
                    <FormGroup column>
                        <FormControlLabel control={<Checkbox checked={state.checkedA} onChange={handleCheck} name="checkedA" color="primary" />}
                            label="recyclable packaging" />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={state.checkedB}
                                    onChange={handleCheck}
                                    name="checkedB"
                                    color="primary"
                                />
                            }
                            label="recyclable materials"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={state.checkedC}
                                    onChange={handleCheck}
                                    name="checkedC"
                                    color="primary"
                                />
                            }
                            label="eco-friendly manufacturer"
                        />
                    </FormGroup>

                </React.Fragment>;
            default:
                throw new Error('Unknown step');
        }
    }

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const handleSubmit = event => {
        event.preventDefault();

        let recycling_index = 0;
        let partA = 0;
        let partB = 0;
        let partC = 0;

        if (state.checkedA) {
            partA = 1;
        }
        if (state.checkedB) {
            partB = 1;
        }
        if (state.checkedC) {
            partC = 1;
        }
        recycling_index = partA + partB + partC;

        if (activeStep !== steps.length - 1) {
            handleNext();
        }

        else if (activeStep === steps.length - 1) {
            const newCommodity = {
                name: name,
                type: type,
                description: desc,
                material: material,
                manufacturer: manufacturer,
                price: price,
                seller_email: userEmail,
                isRecycPackaging: state.checkedA,
                isRecycMaterial: state.checkedB,
                isRecycManufacturer: state.checkedC,
                recycling_index: recycling_index
            };


            axios.post('api/commodities/', newCommodity)
                .then(res => {
                    /*setInStorage('FYP', {token: res.data.token});
                    setToken(res.data.token);*/
                    if (!res.data.success) {
                        setPrompt(res.data.message);
                        setDialogOpen(true);
                    }
                    else {
                        handleNext();
                    }

                })
        }

    }
















    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    return (
        <React.Fragment>
            <CssBaseline />
            {/*<AppBar position="absolute" color="default" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap>
                        Hi! {userEmail}
                    </Typography>
                </Toolbar>
            </AppBar>*/}
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center">
                        Posting Page
                    </Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <React.Fragment>
                        {activeStep === steps.length ? (
                            <React.Fragment>
                                <Typography variant="h5" gutterBottom>
                                    Thank you! {userEmail}
                                </Typography>
                                <Typography variant="subtitle1">
                                    You have post your good successfully. Now you can check it by browsing our website!
                                </Typography>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                {getStepContent(activeStep)}
                                <div className={classes.buttons}>
                                    {activeStep !== 0 && (
                                        <Button onClick={handleBack} className={classes.button}>
                                            Back
                                        </Button>
                                    )}
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleSubmit}
                                        className={classes.button}
                                    >
                                        {activeStep === steps.length - 1 ? 'Post' : 'Next'}
                                    </Button>
                                    <Dialog
                                        open={dialogOpen}
                                        onClose={handleDialogClose}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                    >
                                        <DialogContent>
                                            <DialogContentText id="alert-dialog-description">
                                                {prompt}
                                            </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={handleDialogClose} color="primary">
                                                Ok
                                            </Button>
                                        </DialogActions>
                                    </Dialog>
                                </div>
                            </React.Fragment>
                        )}
                    </React.Fragment>
                </Paper>
                <Copyright />
            </main>
        </React.Fragment>
    );
}