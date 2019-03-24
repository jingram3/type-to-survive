import React from 'react';
import './App.css';
import {TypeArea} from "./TypeArea";

export default function App() {
    return (
        <div className="App">
            <TypeArea
                text='I motioned him to take up the letter, while I walked up and down the room in the extremest agitation. Tears also gushed from the eyes of Clerval, as he read the account of my misfortune.'
            />
        </div>
    );
}