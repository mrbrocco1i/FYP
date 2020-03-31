import React from 'react';
import AppNavbar from "./components/AppNavbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './components/Main';

function App() {
  return (
    <div className="App">
        <AppNavbar></AppNavbar>
        <Main />
    </div>

  );
}

export default App;
