import React, {Component} from 'react';
import './App.css';
import {TypeArea} from "./TypeArea";

class App extends Component {
    render() {
        return (
            <div className="App">
                <TypeArea
                    text='I motioned him to take up the letter, while I walked up and down the room in the extremest agitation. Tears also gushed from the eyes of Clerval, as he read the account of my misfortune.'/>
            </div>
        );
    }
}

export default App;
