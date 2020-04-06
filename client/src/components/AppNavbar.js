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

class AppNavBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            token: '',
            signUpError: '',
            signInError: '',
            isSignedIn: false
        };

        this.logOut = this.logOut.bind(this);

    }

    componentDidMount() {
        const obj = getFromStorage('FYP');
        if (obj && obj.token) {
            const { token } = obj;
            axios.put('api/users/verify?token='+token)
                .then(res => {
                        this.setState({
                            token,
                            isLoading: false,
                            isSignedIn: res.data.success
                        });
                        console.log(res.data);
                        console.log(token);
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
                        isLoading: false
                    });
                    console.log(res.data);
                    localStorage.clear();
                })


        }
        else {
            this.setState({
                isLoading: false,
            });
        }
}

    render() {
        const {
            isLoading,
            token,
            isSignedIn
        } = this.state;


       /* if (isLoading) {
            return (<div><p>Loading...</p></div>);
        }*/

        if (!token) {
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
                                            clothes
                                        </DropdownItem>
                                        <DropdownItem>
                                            furniture
                                        </DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem>
                                            100% Recyclable ones
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                                <NavItem>
                                    <Button color="primary">Post a Second-Hand Item <FontAwesomeIcon icon={faMouse} /></Button>
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
                                        clothes
                                    </DropdownItem>
                                    <DropdownItem>
                                        furniture
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        100% Recyclable ones
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            <NavItem>
                                <Button color="primary">Post a Second-Hand Item <FontAwesomeIcon icon={faMouse} /></Button>
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
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    <FontAwesomeIcon icon={faHome} />
                                </DropdownToggle>
                                <DropdownMenu right style={{backgroundColor:'#1FD14B'}}>
                                    <DropdownItem>
                                        My Account
                                    </DropdownItem>
                                    <DropdownItem>
                                        My Posted Items
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