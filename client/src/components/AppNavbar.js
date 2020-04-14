import React, { Component } from 'react';
import '../assets/css/AppNavbar.css';
import logo from '../assets/images/logo.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch,faMouse,faHome } from "@fortawesome/free-solid-svg-icons";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
    Button
} from 'reactstrap';
import {
    getFromStorage,
    setInStorage,
} from "./storage";
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Typography from "@material-ui/core/Typography";


class AppNavBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            token: '',
            signUpError: '',
            signInError: '',
            isSignedIn: false,
            userEmail: '',
            dialogOpen: false
        };

        this.logOut = this.logOut.bind(this);

    }

    componentDidMount() {
        const obj = getFromStorage('FYP');
        const obj2 = getFromStorage('userEmail');
        if (obj && obj.token) {
            const { email } = obj2;
            const { token } = obj;
            axios.put('api/users/verify?token='+token)
                .then(res => {
                        this.setState({
                            token,
                            isLoading: false,
                            isSignedIn: res.data.success,
                            userEmail: email
                        });
                        console.log(res.data);
                        console.log(token);
                        console.log(this.state.userEmail);
                    }
                    )

        }
        else {
            this.setState({
                isLoading: false,
            });
        }
    }

    state = {
        isOpen: false
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };

    handleDialogClose = () => {
        this.setState({
            dialogOpen: false
        });
    };

    logOut() {
        this.setState({
            isLoading : true
        });
        const obj = getFromStorage('FYP');
        console.log(obj)
        if (obj && obj.token) {
            const { token } = obj;
            axios.put('api/users/verify?token='+token)
                .then(res => {
                    this.setState({
                        token: '',
                        isLoading: false,
                        isSignedIn: false,
                        userEmail: ''
                    });
                    console.log(res.data);
                    localStorage.clear();
                    window.location.href = '/';
                })


        }
        else {
            this.setState({
                isLoading: false,
            });
        }
}

    onIssuedForUser() {
        window.location.href = '/form';
}

    onIssuedForGuest = () => {
        this.setState({
            dialogOpen: true
        });
        setTimeout(() => {  window.location.href = '/login'; }, 2000);
    }

    render() {
        const {
            isLoading,
            token,
            isSignedIn,
            userEmail
        } = this.state;


       /* if (isLoading) {
            return (<div><p>Loading...</p></div>);
        }*/

        if (!isSignedIn) {
            return (
                <div className="AppNavbar">
                    <Navbar light expand="lg" className="mb-5" style={{backgroundColor: '#1FD14B'}}>
                        <NavbarBrand className="NavbarBrand" href="/">Second-Hand Commodity Website<img className="logo" src={logo} alt="earth"/></NavbarBrand>
                        <NavbarToggler onClick={this.toggle}></NavbarToggler>
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="mr-auto" navbar>
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav caret>
                                        Commodities
                                    </DropdownToggle>
                                    <DropdownMenu left style={{backgroundColor:'#1FD14B'}}>
                                        <DropdownItem>
                                            <NavLink href="/items">All Commodities</NavLink>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <NavLink href="/clothing">Clothing</NavLink>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <NavLink href="/furniture">Furniture</NavLink>
                                        </DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem>
                                            <NavLink href="/100recyclable">100% Recyclable Ones</NavLink>
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                                <NavItem>
                                    <Button color="primary" onClick={this.onIssuedForGuest}>Post a Second-Hand Good <FontAwesomeIcon icon={faMouse} /></Button>
                                    <Dialog
                                        open={this.state.dialogOpen}
                                        onClose={this.handleDialogClose}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                    >
                                        <DialogContent>
                                            <DialogContentText id="alert-dialog-description">
                                                Sorry. Please log in first.
                                            </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={this.handleDialogClose} color="primary">
                                                Ok
                                            </Button>
                                        </DialogActions>
                                    </Dialog>
                                </NavItem>
                            </Nav>
                            <Nav pullRight navbar className="right_nav">
                                <NavItem>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText style={{backgroundColor:'#6BD502', borderColor:'black'}}>
                                                <FontAwesomeIcon icon={faSearch} style={{color: 'white'}}/>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input placeholder="search" className="search_bar" />
                                    </InputGroup>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="/login">Log in</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="/signup">Sign up</NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Navbar>
                </div>
            )

        }

        return (
            <div className="AppNavbar">
                <Navbar light expand="lg" className="mb-5" style={{backgroundColor: '#1FD14B'}}>
                    <NavbarBrand className="NavbarBrand" href="/">Second-Hand Commodity Website<img className="logo" src={logo} alt="earth"/></NavbarBrand>
                    <NavbarToggler onClick={this.toggle}></NavbarToggler>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Commodities
                                </DropdownToggle>
                                <DropdownMenu left style={{backgroundColor:'#1FD14B'}}>
                                    <DropdownItem>
                                        <NavLink href="/items">All Commodities</NavLink>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <NavLink href="/clothing">Clothing</NavLink>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <NavLink href="/furniture">Furniture</NavLink>
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        <NavLink href="/100recyclable">100% Recyclable Ones</NavLink>
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            <NavItem>
                                <Button color="primary" onClick={this.onIssuedForUser} >Post a Second-Hand Good <FontAwesomeIcon icon={faMouse} /></Button>
                            </NavItem>
                        </Nav>
                        <Nav pullRight navbar className="right_nav">
                            <NavItem>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText style={{backgroundColor:'#6BD502', borderColor:'black'}}>
                                            <FontAwesomeIcon icon={faSearch} style={{color: 'white'}}/>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input placeholder="search" className="search_bar" />
                                </InputGroup>
                            </NavItem>
                            <Typography component="h2" variant="h6" align="bottom">Welcome! {this.state.userEmail}</Typography>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    <FontAwesomeIcon icon={faHome} />
                                </DropdownToggle>
                                <DropdownMenu right style={{backgroundColor:'#1FD14B'}}>
                                    <DropdownItem>
                                        <NavLink href="/acc">My Account</NavLink>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <NavLink href="/posted">My Posted Items</NavLink>
                                    </DropdownItem>
                                    <DropdownItem>
                                        My Orders
                                    </DropdownItem>
                                    <DropdownItem>
                                        Customer Service
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem onClick={this.logOut}>
                                        Log out
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>

        )

    }
}

export default AppNavBar;