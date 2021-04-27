import React from "react";
import './board.scss'
import {Field} from "../field/field";
import {BoardState, IBoardSettings, IFieldSettings} from "../board-state";
import {classes} from "../utils";
import {DebouncedClicks} from "../debounced-clicks";

interface IBoardProps extends IBoardSettings {
}

export class Board extends React.Component<IBoardProps> {
    board = new BoardState()
    click = new DebouncedClicks(this.board)
    timer = 0
    timerId = 0

    state = {
        won: null
    }

    constructor(props: IBoardProps) {
        super(props);
        this.board.createBoard(this.props);
        // @ts-ignore
        window.board = this.board
    }

    render() {
        // console.log('Board.render', this.board)
        const settings = {
            '--columns': this.props.width,
            '--rows': this.props.height,
            '--count': this.board.minesCount
        } as React.CSSProperties;

        return <div
            {...this.click.listeners}
            className={classes('board', {win: this.state.won === true, loose: this.state.won === false})}
            style={settings}
        >
            {this.board.fields.map(field => (
                <Field field={field} key={`${field.x}.${field.y}`} move={this.move} lookup={this.lookup}/>
            ))}
        </div>;
    }

    tick = () => {
        this.timer++
        // console.log('Seconds', this.timer)
    }

    checkWin(clickedField?: IFieldSettings) {
        const closedFound = this.board.fields.find(field => !field.isMine && (!field.isOpen && clickedField !== field))
        if (!closedFound) {
            console.log('Win!', this.timer, 'seconds')
            this.stop()
            this.setState({won: true})
            this.board.minesFields.forEach(field => field.component?.mark(true))
            return true
        }
    }

    move = (field: IFieldSettings) => {
        if (!this.timer) {
            this.board.fillBoard(field)
            this.timer = 1
            this.timerId = window.setInterval(this.tick, 1000)
        }

        if (field.isMine) return this.gameOver()

        if (!this.checkWin(field)) {
            if (!field.value) this.lookup(field)
        }
    }

    lookup = (field: IFieldSettings) => {
        if (field.isMarked) return;

        const found = this.board.lookup(field)
        found.forEach(field => !field.isOpen && field.component?.open())

        const hasMine = found.find((field: IFieldSettings) => field.isMine)
        if (hasMine) this.gameOver()
        else this.checkWin()

        return found
    }

    private stop() {
        clearInterval(this.timerId)
        this.board.fields.forEach(field => field.component?.disable())
    }

    private gameOver() {
        this.setState({won: false})
        console.log('game over')
        this.board.minesFields.forEach(field => field.component?.open())
        this.stop()
    }
}
