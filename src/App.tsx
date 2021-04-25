import React from 'react';
import './App.css';

import {Board} from "./board/board";
import {IBoardSettings} from "./board-state";

const modes: {[mode: string]: IBoardSettings} = {
    beginner: {width: 9, height: 9, mines: 10},
    default: {width: 12, height: 8, mines: 12},
    intermediate: {width: 16, height: 16, mines: 40},
    expert: {width: 30, height: 16, mines: 99},
}

const fillModes: {[mode: string]: {min: number, mines: number}} = {
    beginner: {min: 10, mines: 0.12},
    default: {min: 12, mines: 0.125},
    intermediate: {min: 16, mines: 0.15},
    expert: {min: 20, mines: 0.2}
}

const synonyms: {[key: string]: string} = {
    beginer: 'beginner',
    small: 'beginner',
    easy: 'beginner',
    min: 'beginner',
    medium: 'intermediate',
    middle: 'intermediate',
    big: 'expert',
    max: 'expert',
    herd: 'expert'
}

function getSettings(): IBoardSettings {
    let hash = window.location.hash.replace('#', '').toLowerCase()

    if (!hash) return modes.default
    if (hash in synonyms) hash = synonyms[hash]
    if (hash in modes) return modes[hash]

    if (/^fill:?(\w+)?$/.test(hash)) {
        const calcSettings = fillModes[RegExp.$1] || fillModes[synonyms[RegExp.$1]] || fillModes.default
        const {innerWidth, innerHeight} = window
        const maxSize = Math.max(innerWidth, innerHeight)
        const minSize = Math.min(innerWidth, innerHeight)

        const fieldSize = Math.floor(minSize / calcSettings.min)
        const fieldsMaxSide = Math.floor(maxSize / fieldSize)

        const mines = Math.floor(calcSettings.min * fieldsMaxSide * calcSettings.mines)

        return innerWidth > innerHeight
            ? {
                mines,
                width: fieldsMaxSide,
                height: calcSettings.min
            }
            : {
                mines,
                width: calcSettings.min,
                height: fieldsMaxSide
            }
    }

    if (/^custom:/.test(hash)) {
        const groups = hash.match(/^custom:(?<width>\d+)\D(?<height>\d+)\D(?<mines>\d+)/)?.groups as {[key: string]: string}
        let customSettings = {} as IBoardSettings
        for (let key in groups) customSettings[key as keyof IBoardSettings] = +groups[key]
        return customSettings
    }


    return modes.default
}

function App() {
    let settings = getSettings()

    // fix for mobile landscape
    const isLandscape = window.screen.orientation.type.substr(0, 4) === 'land'
    const isMobile = window.innerWidth < 800
    // @ts-ignore
    if (isMobile && isLandscape && settings.width < settings.height) {
        [settings.width, settings.height] = [settings.height, settings.width]
    }

    return (
        <div className="App">
            <Board width={settings.width} height={settings.height} mines={settings.mines}/>
        </div>
    );
}

export default App;
