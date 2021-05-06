import {arand} from "./utils";
import {Field} from "./field/field";
import React from "react";

export type TSettings = 'columns' | 'rows' | 'mines'
export enum GameState {
    Pending = 'Pending',
    InProgress = 'In Progress',
    Win = 'You Win! 😎',
    Loose = 'You Loose 🙁'
}

export interface IBoardSettings {
    columns: number;
    rows: number;
    mines: number;
}

export class IFieldSettings {
    value: number = 0 // 0 - empty, 1..8 - mines are near
    x: number = 0
    y: number = 0
    isOpen?: boolean = false
    isMine?: boolean = false
    isMarked?: boolean = false

    component?: Field
    board?: BoardState

    constructor(values: IFieldSettings) {
        Object.assign(this, values);
    }
}

// TODO: tick cause re-render board
// TODO: each updateInfo cause global re-render

export class BoardState {
    fields: Array<IFieldSettings> = []
    board: Array<Array<IFieldSettings>> = []
    minesFields: Array<IFieldSettings> = []
    elements: Map<HTMLDivElement, React.Component> = new Map()

    columns = 8
    rows = 8
    mines = 8


    createBoard(settings: IBoardSettings, empty = false) {
        Object.assign(this, settings);

        // reset properties
        this.fields = [];
        this.minesFields = [];
        this.board = [];
        for (let x = 0; x < this.columns; x++) {
            this.board[x] = []
        }

        // create fields
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.columns; x++) {
                this.board[x][y] = new IFieldSettings({x, y, value: 0, board: this})
                this.fields.push(this.board[x][y])
            }
        }
    }

    fillBoard(starter: IFieldSettings) {
        // set mines
        let n = this.mines;
        while (n) {
            const x = arand(this.columns)
            const y = arand(this.rows)

            if (!this.board[x][y].isMine && x !== starter.x && y !== starter.y) {
                this.minesFields.push(this.board[x][y])
                this.board[x][y].isMine = true;
                n--;
            }
        }

        // set values
        this.minesFields.forEach(field => {
            this.getAround(field).forEach(field => field.value++)
        })
    }

    getAround = (field: IFieldSettings): Array<IFieldSettings> => {
        const {x, y} = field;
        return [
            [x - 1, y - 1], [x, y - 1], [x + 1, y - 1],
            [x - 1, y], /*  ;)  */  [x + 1, y],
            [x - 1, y + 1], [x, y + 1], [x + 1, y + 1],
        ].filter(([x, y]) => x >= 0 && x < this.columns && y >= 0 && y < this.rows)
            .map(([x, y]) => this.board[x][y])
    }

    lookup = (field: IFieldSettings) => {
        const found: Array<IFieldSettings> = []
        const runner = (field: IFieldSettings) => {
            const around = this.getAround(field).filter(neighbour => !found.includes(neighbour) && !neighbour.isMarked);
            found.push(...around)
            around.filter(neighbour => !neighbour.value).forEach(runner)
        }

        runner(field)
        return found
    }

    get minesCount() {
        return this.mines - this.fields.filter(field => field.isMarked).length
    }

    help() {
        const unopenedEmpties = this.fields.filter(field => !field.isMine && !field.isOpen && !field.isMarked)
        const unmarkedMines = this.minesFields.filter(field => !field.isMarked)
        let unopenedMines = unmarkedMines.filter(field => this.getAround(field).filter(field => field.isOpen))
        if (!unopenedMines.length) unopenedMines = unmarkedMines

        const mine = unopenedMines[arand(unopenedMines.length)]
        const target = unopenedEmpties[arand(unopenedEmpties.length)]

        mine.isMine = false
        target.isMine = true

        this.getAround(mine).forEach(field => {
            field.value--;
            if (field.isOpen) field.component?.setState({content: field.value || ''})
        })
        this.getAround(target).forEach(field => {
            field.value++;
            if (field.isOpen) field.component?.setState({content: field.value || ''})
        })

        const mineIndex = this.minesFields.findIndex(field => field === mine)
        this.minesFields.splice(mineIndex, 1, target)

        this.getAround(mine)
            .filter(field => !field.value && field.isOpen)
            .forEach(empty => {
                empty.component?.open(true)
            })
    }

    checkWin(clickedField?: IFieldSettings): boolean {
        const closedFound = this.fields.find(field => !field.isMine && (!field.isOpen && clickedField !== field))
        if (!closedFound) {
            this.minesFields.forEach(field => field.component?.mark(true))
            return true
        }

        return false
    }
}