import React from 'react';
import './App.css';

import {Board} from "./board/board";
import {Settings} from "./settings";
import {IInfo, SettingsSelector} from "./settings-selector/settings-selector";
import {Swipe} from "./swipe";
import {Wrapper} from "./wrapper/wrapper";
import {GameState} from "./board-state";

class App extends React.Component {
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
                <Board columns={this.settings.columns} rows={this.settings.rows} mines={this.settings.mines} updateInfo={this.updateInfo}/>
                {this.state.showSettings &&
                    <Wrapper onClose={this.closeSettings}>
                        <SettingsSelector settings={this.settings} info={this.state}/>
                    </Wrapper>
                }
            </div>
        )
    }

    closeSettings = () => {
        this.setState({showSettings: false})
    }

    toggleSettings = (event: KeyboardEvent | TouchEvent, value: boolean = !this.state.showSettings) => {
        if (event.type === 'keyup' && (event as KeyboardEvent).key !== 'Escape') return
        this.setState({showSettings: value})
    }

    updateInfo = (info: IInfo) => {
        this.setState(info)
    }
}

export default App;
