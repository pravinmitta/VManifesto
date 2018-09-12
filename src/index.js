
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import Map from './Map';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getSectionsDB , init  } from './../src/javascript/firebase'

import { render } from "react-dom";
import React, { Component } from "react";


// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();

class Index extends Component {
    constructor(props) {
        super(props);
      
      }
}

render( 
    <App /> ,
    document.getElementById("root")
);
registerServiceWorker();
