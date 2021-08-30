import React from "react";
import './settings-selector.scss'
import {Difficulty, IPossibleBoardSettings, Settings} from "../settings";
import {BoardState, GameState} from "../board-state";

export interface IInfo {
    timer: number
    minesLeft: number
    state: GameState
}

interface ISettingsSelectorProps {
    settings: Settings
    info: IInfo
    board: BoardState
    onClose: Function
}

interface IState {
    board: string | null
    mines: Difficulty | null
}

export class SettingsSelector extends React.Component<ISettingsSelectorProps> {
    joiner = 'x'
    possible: Array<IPossibleBoardSettings> = []
    state: IState

    constructor(props: ISettingsSelectorProps) {
        super(props);

        this.possible = this.props.settings.getPossibleSettings()
        let board: string | null = [this.props.settings.columns, this.props.settings.rows].join(this.joiner)
        if (!this.getVariantByBoard(board)) board = null

        const difficulty: {[mines: string]: Difficulty} = {
            [this.getMinesCount('beginner', board)]: 'beginner',
            [this.getMinesCount('intermediate', board)]: 'intermediate',
            [this.getMinesCount('expert', board)]: 'expert',
        }
        const mines = difficulty[this.props.settings.mines]

        this.state = {board, mines}
    }

    render() {
        return <div className="settings-selector" onClick={event => event.stopPropagation()}>
            {this.props.info.state !== GameState.Pending &&
                <div>
                    <h3>Game State: {this.props.info?.state !== GameState.InProgress ? this.props.info?.state : ''}</h3>
                    <h4 className="sub">Seconds from start: {this.props.info?.timer ?? '--'}</h4>
                    {this.props.info?.state === GameState.InProgress &&
                        <h4 className="sub">Mines left: {this.props.board.minesCount}</h4>
                    }
                    {this.props.info?.state === GameState.InProgress &&
                        <button className="button small" onClick={this.getHelp}>Get Help</button>
                    }
                </div>
            }

            <h3>Standard difficulty levels:</h3>
            <p className="link" onClick={() => this.changeSettings('fill')}>Default</p>
            <p className="link" onClick={() => this.changeSettings('fill:beginner')}>Beginner</p>
            <p className="link" onClick={() => this.changeSettings('fill:intermediate')}>Intermediate</p>
            <p className="link" onClick={() => this.changeSettings('fill:expert')}>Expert</p>

            <h3>Current board:</h3>
            <p>{this.props.settings.columns}x{this.props.settings.rows} with {this.props.settings.mines} mines.</p>
            <button className="button sup" onClick={() => this.restart()}>Restart</button>

            <h3>Custom board:</h3>
            <label>
                <h4>Board size:</h4>
                <select onChange={this.changeCustom} name="board" defaultValue={this.state.board as string}>
                    {!this.state.board &&
                        <option className="default">-- Select Board --</option>
                    }
                    {this.possible.map(variant => {
                        const name = [variant.columns, variant.rows].join(this.joiner)
                        return <option key={name} value={name}>{name}</option>
                    })}
                </select>
            </label>

            <label>
                <h4>Mines count:</h4>
                <select onChange={this.changeCustom} name="mines" defaultValue={this.state.mines as string}>
                    {!this.state.mines &&
                        <option className="default">-- Select Mines --</option>
                    }
                    <option value="beginner">
                        Beginner {this.state.board && `(${this.getMinesCount('beginner')})`}
                    </option>
                    <option value="intermediate">
                        Intermediate {this.state.board && `(${this.getMinesCount('intermediate')})`}
                    </option>
                    <option value="expert">
                        Expert {this.state.board && `(${this.getMinesCount('expert')})`}
                    </option>
                </select>
            </label>

            <button className="button" onClick={() => this.changeSettings('')}
                    disabled={!this.state.board || !this.state.mines}>Apply Custom
            </button>
        </div>
    }

    changeCustom = (event: any) => {
        this.setState({[event.target.name]: event.target.value})
    }

    changeSettings = (hash: string = 'fill:default') => {
        if (!hash && this.state.board && this.state.mines) {
            const variant = this.getVariantByBoard(this.state.board)
            hash = 'custom:' + [variant?.columns, variant?.rows, variant?.mines[this.state.mines]].join(this.joiner)
        }

        window.history.pushState({}, 'Minesweeper', '#' + hash)
        window.location.reload()
    }

    private getMinesCount(mines: Difficulty, board: string | null = this.state.board): string {
        if (!board) return '--'
        const variant = this.getVariantByBoard(board)
        return variant?.mines[mines].toString() ?? '--'
    }

    getVariantByBoard(board: string): IPossibleBoardSettings | null {
        const [columns, rows] = board.split(this.joiner).map(string => Number(string))
        return this.possible.find(variant => variant.columns === columns && variant.rows === rows) ?? null
    }

    getHelp = () => {
        this.props.board.help()
        this.props.board.checkWin()
        this.props.onClose()
    }

    private restart() {
        window.location.reload()
    }
}