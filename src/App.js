import React, {Component} from 'react';
import './App.css';
import {TypeArea} from "./TypeArea";

class App extends Component {
    render() {
        return (
            <div className="App">
                <TypeArea text='Here is some sample text'/>
            </div>
        );
    }
}

export default App;
