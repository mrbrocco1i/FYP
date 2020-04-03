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

class AppNavBar extends Component {
    state = {
        isOpen: false
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };

    render() {
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
                                    <DropdownItem>
                                        Log out
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

export default AppNavBar;