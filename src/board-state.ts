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

export class BoardState extends Array {
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
}