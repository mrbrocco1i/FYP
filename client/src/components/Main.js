import React from "react";
import { Switch, Route } from 'react-router-dom';
import Homepage from "./Homepage";
import login from './login';
import signup from './signup';
import items from './items';
import form from './form';

const Main = () => {
    return (
        <main>
            <Switch>
                <Route exact path='/' component={Homepage} />
                <Route exact path='/login' component={login} />
                <Route exact path='/signup' component={signup} />
                <Route exact path='/items' component={items} />
                <Route exact path='/form' component={form} />
            </Switch>
        </main>
    )
}

export default Main;