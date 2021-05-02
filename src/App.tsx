import React from 'react';
import './App.css';

import {Board} from "./board/board";
import {IBoardSettings} from "./board-state";

export interface IPossibleBoardSettings extends Omit<IBoardSettings, 'mines'>{
    mines: { beginner: number, default: number, intermediate: number, expert: number }
}

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

function getPossibleSettings(): Array<IPossibleBoardSettings> {
    const vw = window.innerWidth, vh = window.innerHeight
    const result = []
    const modes = Object.keys(fillModes) as Array<keyof IPossibleBoardSettings['mines']>
    for (let columns = 2; columns <= 100; columns++)
        for (let rows = 2; rows < 100; rows++) {
            const size = Math.min(vh / rows, vw / columns)
            const width = columns * size
            const height = rows * size
            if (vw - width < 10 && vh - height < 10) {
                const area = columns * rows
                const settings = {width: columns, height: rows, mines: {}} as IPossibleBoardSettings
                modes.forEach(mode => settings.mines[mode] = Math.floor(fillModes[mode].mines * area))
                result.push(settings)
            }
        }

    return result
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
    // @ts-ignore
    window.possibleSettings = getPossibleSettings()

    // fix for mobile landscape
    const isLandscape = window.screen.orientation
        ? window.screen.orientation.type.substr(0, 4) === 'land'
        : window.innerWidth > window.innerHeight

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
