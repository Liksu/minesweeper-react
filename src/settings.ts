import {IBoardSettings, TSettings} from "./board-state";

export type Difficulty = 'beginner' | 'default' | 'intermediate' | 'expert'

export const modes: {[difficulty in Difficulty]: IBoardSettings} = {
    beginner: {columns: 9, rows: 9, mines: 10},
    default: {columns: 12, rows: 8, mines: 12},
    intermediate: {columns: 16, rows: 16, mines: 40},
    expert: {columns: 30, rows: 16, mines: 99},
}

export const fillModes: {[difficulty in Difficulty]: {min: number, mines: number}} = {
    beginner: {min: 10, mines: 0.12},
    default: {min: 12, mines: 0.125},
    intermediate: {min: 16, mines: 0.15},
    expert: {min: 20, mines: 0.2}
}

const synonyms: {[key: string]: Difficulty} = {
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

export interface IPossibleBoardSettings extends Omit<IBoardSettings, 'mines'>{
    mines: {[difficulty in Difficulty]: number}
}

export class Settings implements IBoardSettings {
    public columns!: number
    public rows!: number
    public mines!: number

    constructor() {
        const settings = Settings.getInitialSettings()

        // fix for mobile landscape
        const isLandscape =
            settings.orientation
                ? settings.orientation === 'landscape'
                : window.screen.orientation
                    ? window.screen.orientation.type.substr(0, 4) === 'land'
                    : window.innerWidth > window.innerHeight

        const isMobile = window.innerWidth < 800

        if (isMobile && isLandscape && settings.columns < settings.rows) {
            [settings.columns, settings.rows] = [settings.rows, settings.columns]
        }

        Object.assign(this, settings)

        // @ts-ignore
        window.settings = this
    }

    public getPossibleSettings(): Array<IPossibleBoardSettings> {
        const vw = window.innerWidth, vh = window.innerHeight
        const result = []
        const modes = Object.keys(fillModes) as Array<keyof IPossibleBoardSettings['mines']>
        for (let columns = 100; columns >= 2; columns--)
            for (let rows = 100; rows >= 2; rows--) {
                const found = result.find(result => result.columns === columns || result.rows === rows)
                // console.log({columns, rows, found})
                if (found) continue;

                const size = Math.min(vh / rows, vw / columns)
                const width = columns * size
                const height = rows * size
                if (vw - width < 10 && vh - height < 10) {
                    const area = columns * rows
                    const settings = {columns, rows, mines: {}} as IPossibleBoardSettings
                    modes.forEach(mode => settings.mines[mode] = Math.floor(fillModes[mode].mines * area))
                    result.push(settings)
                }
            }

        return result.reverse()
    }

    static getInitialSettings(): IBoardSettings & {orientation?: string} {
        let hash = window.location.hash.replace('#', '').toLowerCase()

        if (!hash) return modes.default
        if (hash in synonyms) hash = synonyms[hash]
        if (hash in modes) return modes[hash as Difficulty]

        if (/^fill:?(\w+)?$/.test(hash)) {
            const calcSettings = fillModes[RegExp.$1 as Difficulty] || fillModes[synonyms[RegExp.$1] as Difficulty] || fillModes.default
            const {innerWidth, innerHeight} = window
            const maxSize = Math.max(innerWidth, innerHeight)
            const minSize = Math.min(innerWidth, innerHeight)

            const fieldSize = Math.floor(minSize / calcSettings.min)
            const fieldsMaxSide = Math.floor(maxSize / fieldSize)

            const mines = Math.floor(calcSettings.min * fieldsMaxSide * calcSettings.mines)

            return innerWidth > innerHeight
                ? {
                    mines,
                    columns: fieldsMaxSide,
                    rows: calcSettings.min
                }
                : {
                    mines,
                    columns: calcSettings.min,
                    rows: fieldsMaxSide
                }
        }

        if (/^custom:/.test(hash)) {
            const groups = hash.match(/^custom:(?<columns>\d+)\D(?<rows>\d+)\D(?<mines>\d+)/)?.groups as {[key in TSettings]: string}
            let customSettings = {} as (IBoardSettings & {orientation?: string})
            for (let key in groups) customSettings[key as keyof IBoardSettings] = +groups[key as TSettings]
            
            const orientation = hash.match(/(portrait|landscape)/)?.[0]
            if (orientation) customSettings.orientation = orientation

            return customSettings
        }

        return modes.default
    }
}
