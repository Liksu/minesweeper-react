import {BoardState} from "./board-state";
import {Field} from "./field/field";

export enum ClickValues {
    Open = 1,
    Mark = 2,
    Lookup = 3,
    Suggest
}

export abstract class ClickTarget {
    public abstract onClick(action: ClickValues): void
    public abstract onPress(state: boolean, action: ClickValues): void
}

export class DebouncedClicks {
    timerId = 0
    values: Array<number> = []
    value: ClickValues = 0
    duration = 64
    phase: boolean | null = null // false = touchstart / mousedown, true = touchend / mouseup, null - nothing
    target: Field | null = null

    private boardState: BoardState;
    private logging = true
    private resultsValues: {[type: string]: ClickValues} = {
        contextmenu: ClickValues.Mark,
        dblclick: ClickValues.Lookup,
        click: ClickValues.Open
    }

    private buttonsMapping: {[buttons: number]: number} = {
        0: 1, // left button
        1: 4, // middle/wheel button
        2: 2, // right button
        3: 8, // back button
        4: 16, // forward button
    }

    constructor(boardState: BoardState) {
        this.boardState = boardState
    }

    get listeners() {
        return {
            onMouseDownCapture: this.goDown,
            onMouseUpCapture: this.goUp,
            onContextMenuCapture: this.catchResult,
            onDoubleClickCapture: this.catchResult
        }
    }

    goDown = (event: any): void => {
        this.log('down', event)
        if (this.phase === null) {
            this.target = this.boardState.elements.get(event.target) as Field
        }

        this.phase = false
        this.values.push(this.buttonsMapping[event.button])

        this.startTimer(() => {
            this.value = this.values[0]
            if (this.values.length > 1) {
                this.value = this.values.reduce((a, b) => a | b)
            }

            this.log('pre flush')
            this.reset(true)
            this.flush()
        })
    }

    goUp = (event: any): void => {
        this.log('up', event)
        this.phase = true
        this.startTimer(this.flush)
    }

    catchResult = (event: any): void => {
        this.log('catch', event)

        if (!this.target) this.target = this.boardState.elements.get(event.target) as Field
        if (!this.value) this.value = this.resultsValues[event.type]
        this.phase = true
        this.flush()

        this.reset()
        event.stopPropagation();
        event.preventDefault();
    }

    private startTimer = (cb: Function) => {
        if (!this.timerId) {
            this.timerId = window.setTimeout(cb, this.duration)
        }
    }

    private reset = (saveState = false) => {
        this.values = []

        if (this.timerId) clearTimeout(this.timerId)
        this.timerId = 0

        if (!saveState) {
            this.value = 0
            this.phase = null
            this.target = null
        }
    }

    private flush = () => {
        this.log('flush')
        this.target?.onPress(!!this.phase, this.value)

        if (this.phase) {
            this.target?.onClick(this.value)
            this.reset()
        }
    }

    private log = (name: string, event?: any) => {
        if (!this.logging) return
        if (event === false) return console.log(name)

        const {button, buttons, type} = event ?? {}
        const {value, phase} = this
        const valueStr = {1: 'Open', 2: 'Mark', 3: 'Lookup', 4: 'Suggest'}[value]

        console.log(name,
            {value, valueStr, phase, values: [...this.values]},
            event ? {button, buttons, type, event} : new (class NoEvent {})
        )
    }
}