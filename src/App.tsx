import React from 'react';
import './App.css';

import {Board} from "./board/board";
import {Settings} from "./settings";
import {SettingsSelector} from "./settings-selector/settings-selector";
import {Swipe} from "./swipe";

class App extends React.Component {
    settings = new Settings()
    state = {
        showSettings: false
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
                <Board columns={this.settings.columns} rows={this.settings.rows} mines={this.settings.mines}/>
                {this.state.showSettings &&
                    <SettingsSelector settings={this.settings}/>
                }
            </div>
        )
    }

    toggleSettings = (event: KeyboardEvent | TouchEvent, value: boolean = !this.state.showSettings) => {
        if (event.type === 'keyup' && (event as KeyboardEvent).key !== 'Escape') return
        this.setState({showSettings: value})
    }
}

export default App;
