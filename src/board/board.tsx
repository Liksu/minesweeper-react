import React from "react";
import './board.scss'
import {Field} from "../field/field";
import {BoardState, GameState, IBoardSettings, IFieldSettings} from "../board-state";
import {classes} from "../utils";
import {DebouncedClicks} from "../debounced-clicks";

interface IBoardProps extends IBoardSettings {
    board: BoardState
    updateInfo: Function
}

export class Board extends React.Component<IBoardProps> {
    click: DebouncedClicks
    timer = 0
    timerId = 0

    state = {
        won: null
    }

    constructor(props: IBoardProps) {
        super(props);
        this.props.board.createBoard(this.props);
        this.click = new DebouncedClicks(this.props.board)
        this.props.updateInfo?.({
            state: GameState.Pending,
            minesLeft: this.props.mines
        })
        // @ts-ignore
        window.board = this.props.board
    }

    render() {
        // console.log('Board.render', this.props.board)
        const settings = {
            '--columns': this.props.columns,
            '--rows': this.props.rows,
            '--count': this.props.board.minesCount
        } as React.CSSProperties;

        return <div
            {...this.click.listeners}
            className={classes('board', {win: this.state.won === true, loose: this.state.won === false})}
            style={settings}
        >
            {this.props.board.fields.map(field => (
                <Field field={field} key={`${field.x}.${field.y}`} move={this.move} lookup={this.lookup} mark={this.mark}/>
            ))}
        </div>;
    }

    tick = () => {
        this.timer++
        this.props.updateInfo?.({timer: this.timer})
        // console.log('Seconds', this.timer)
    }

    mark = (minesLeft: number) => {
        this.props.updateInfo?.({minesLeft})
    }

    checkWin(clickedField?: IFieldSettings) {
        const isWin = this.props.board.checkWin(clickedField)
        if (isWin) {
            console.log('Win!', this.timer, 'seconds')
            this.props.updateInfo?.({state: GameState.Win})
            this.stop()
            this.setState({won: true})
            return true
        }
    }

    move = (field: IFieldSettings) => {
        if (!this.timer) {
            this.props.board.fillBoard(field)
            this.timer = 1
            this.timerId = window.setInterval(this.tick, 1000)
            this.props.updateInfo?.({state: GameState.InProgress})
        }

        if (field.isMine) return this.gameOver()

        if (!this.checkWin(field)) {
            if (!field.value) this.lookup(field)
        }
    }

    lookup = (field: IFieldSettings) => {
        if (field.isMarked) return;

        const found = this.props.board.lookup(field)
        found.forEach(field => !field.isOpen && field.component?.open())

        const hasMine = found.find((field: IFieldSettings) => field.isMine)
        if (hasMine) this.gameOver()
        else this.checkWin()

        return found
    }

    private stop() {
        clearInterval(this.timerId)
        this.props.board.fields.forEach(field => field.component?.disable())
    }

    private gameOver() {
        this.setState({won: false})
        this.props.updateInfo?.({state: GameState.Loose})
        console.log('game over')
        this.props.board.minesFields.forEach(field => field.component?.open())
        this.stop()
    }
}
