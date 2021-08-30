import React from 'react';
import './App.css';

import {Board} from "./board/board";
import {Settings} from "./settings";
import {IInfo, SettingsSelector} from "./settings-selector/settings-selector";
import {Swipe} from "./swipe";
import {Wrapper} from "./wrapper/wrapper";
import {BoardState, GameState} from "./board-state";

class App extends React.Component {
    board = new BoardState()
    settings = new Settings()
    state = {
        showSettings: false,
        timer: 0,
        minesLeft: this.settings.mines,
        state: GameState.Pending
    }
    swipe = new Swipe().on({
        left: event => this.toggleSettings(event, false),
        right: event => this.toggleSettings(event, true),
    })
    isCheatOn = false

    componentDidMount() {
        document.body.addEventListener('keyup', this.toggleSettings)
        this.swipe.attach()
    }

    componentWillUnmount() {
        document.body.removeEventListener('keyup', this.toggleSettings)
        this.swipe.detach()
    }

    render() {
        return (
            <div className="App">
                <Board board={this.board}
                       columns={this.settings.columns}
                       rows={this.settings.rows}
                       mines={this.settings.mines}
                       updateInfo={this.updateInfo}
                />
                {this.state.showSettings &&
                    <Wrapper onClose={this.closeSettings}>
                        <SettingsSelector settings={this.settings} info={this.state} board={this.board} onClose={this.closeSettings}/>
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

    toggleSettings = (event: KeyboardEvent | TouchEvent, value: boolean = !this.state.showSettings) => {
        if (event.type === 'keyup') {
            const {key} = event as KeyboardEvent
            if (key.toLowerCase() === 'h' && this.state.state === GameState.InProgress) {
                if (event.ctrlKey && event.shiftKey) {
                    this.isCheatOn = !this.isCheatOn
                    this.toggleCheat()
                } else {
                    if (this.isCheatOn) this.toggleCheat()
                    this.board.help()
                    if (this.isCheatOn) this.toggleCheat()
                }
                return
            }
            if (key !== 'Escape') return
        }
        this.setState({showSettings: value})
    }

    updateInfo = (info: IInfo) => {
        this.setState(info)
    }
}

export default App;
