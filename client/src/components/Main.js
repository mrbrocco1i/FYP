import React from "react";
import { Switch, Route } from 'react-router-dom';
import Homepage from "./Homepage";
import login from './login';
import signup from './signup';
import items from './items';
import form from './form';
import postedItems from './PostedItems';
import personalAcc from "./personalAcc";
import clothing from './type_clothing';
import furniture from './type_furniture';
import mostRecyclable from './100%recyclable';
import customerService from "./customerService";

const Main = () => {
    return (
        <main>
            <Switch>
                <Route exact path='/' component={Homepage} />
                <Route exact path='/login' component={login} />
                <Route exact path='/signup' component={signup} />
                <Route exact path='/items' component={items} />
                <Route exact path='/form' component={form} />
                <Route exact path='/posted' component={postedItems} />
                <Route exact path='/acc' component={personalAcc} />
                <Route exact path='/clothing' component={clothing} />
                <Route exact path='/furniture' component={furniture} />
                <Route exact path='/100recyclable' component={mostRecyclable} />
                <Route exact path='/customerService' component={customerService} />
            </Switch>
        </main>
    )
}

export default Main;