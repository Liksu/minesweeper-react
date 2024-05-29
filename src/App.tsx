import React from 'react';
import './App.css';

import {Board} from "./board/board";
import {Settings} from "./settings";
import {IInfo, SettingsSelector} from "./settings-selector/settings-selector";
import {Swipe} from "./swipe";
import {Wrapper} from "./wrapper/wrapper";
import {BoardState, GameState} from "./board-state";
import {Keyboard} from "./keyboard";
import {Communicator} from './communicator';

class App extends React.Component {
    board = new BoardState()
    settings = new Settings()
    state = {
        showSettings: false,
        timer: 0,
        minesLeft: this.settings.mines,
        state: GameState.Pending,
        stateValue: null,
    }
    swipe = new Swipe().on({
        left: event => this.toggleSettings(event, false),
        right: event => this.toggleSettings(event, true),
    })
    isCheatOn = false
    keyboard = new Keyboard()
    communicator = new Communicator(this)
    gameId = 0

    componentDidMount() {
        document.body.addEventListener('keyup', this.toggleSettings)
        this.swipe.attach()
        this.keyboard.attach(this)
    }

    componentWillUnmount() {
        document.body.removeEventListener('keyup', this.toggleSettings)
        this.swipe.detach()
        this.keyboard.detach()
    }

    render() {
        return (
            <div className="App">
                <Board board={this.board}
                       columns={this.settings.columns}
                       rows={this.settings.rows}
                       mines={this.settings.mines}
                       updateInfo={this.updateInfo}
                       key={this.gameId}
                />
                {this.state.showSettings &&
                    <Wrapper onClose={this.closeSettings}>
                        <SettingsSelector settings={this.settings}
                                          info={this.state}
                                          board={this.board}
                                          onClose={this.closeSettings}
                                          onRestart={this.restart}
                        />
                    </Wrapper>
                }
            </div>
        )
    }

    closeSettings = () => {
        this.setState({showSettings: false})
    }

    toggleCheat = () => {
        this.board.minesFields.filter(mine => !mine.isMarked).forEach(mine => mine.component?.cheat())
    }

    toggleSettings = (event: KeyboardEvent | TouchEvent | null, value: boolean = !this.state.showSettings) => {
        if (event?.type === 'keyup') {
            const {key} = event as KeyboardEvent
            if (key.toLowerCase() === 'h' && this.state.state === GameState.InProgress) {
                if (event.ctrlKey && event.shiftKey) {
                    this.isCheatOn = !this.isCheatOn
                    this.toggleCheat()
                    this.updateInfo({cheated: true} as IInfo)
                } else {
                    if (this.isCheatOn) this.toggleCheat()
                    this.board.help()
                    if (this.isCheatOn) this.toggleCheat()
                    this.updateInfo({cheated: true} as IInfo)
                }
                return
            }
            if (key !== 'Escape') return
        }
        this.setState({showSettings: value})
    }

    updateInfo = (info: IInfo) => {
        if (info.state) info = {...info, stateValue: this.convertStateToValue(info.state)}
        this.setState(info, () => this.communicator.notifyParent())
    }
    
    private convertStateToValue(state: GameState): IInfo['stateValue'] {
        if (state === GameState.InProgress) return 0
        if (state === GameState.Win) return 1
        if (state === GameState.Loose) return -1
        return null
    }
    
    public restart = () => {
        this.updateInfo({
            timer: 0,
            minesLeft: this.settings.mines,
            state: GameState.Pending,
            stateValue: null,
        })
        this.isCheatOn = false
        this.toggleSettings(null, false)
        this.gameId++
    }
}

export default App;
