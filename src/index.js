import React from "react";
import ReactDOM from "react-dom";
import App from "./components/Main";

import {Provider} from 'react-redux'  
import {createStore} from 'redux';  
import reducer from './reducers/mainreducer';  
 
const store = createStore(reducer);  
   
ReactDOM.render(<App store={store}/>,document.getElementById("app"));