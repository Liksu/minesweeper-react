import React from 'react';
import './App.css';

import {Board} from "./board/board";
import {IBoardSettings, modes} from "./board-state";

const defaultSettings = {width: 12, height: 8, mines: 12} as IBoardSettings

function App() {
    const settings = modes[window.location.href] || defaultSettings
    alert(window.innerWidth)

    return (
        <div className="App">
            <Board width={settings.width} height={settings.height} mines={settings.mines}/>
        </div>
    );
}

export default App;
