import React from "react";
import './settings-selector.scss'
import {config, Settings} from "../settings";

interface ISettingsSelectorProps {
    settings: Settings,
}

export class SettingsSelector extends React.Component<ISettingsSelectorProps> {
    // constructor(props: ISettingsSelectorProps) {
    //     super(props);
    // }

    render() {
        const cssSettings = {
            '--phone': config.screens.phone + 'px',
            '--tablet': config.screens.tablet + 'px',
        } as React.CSSProperties

        const possibleSettings = this.props.settings.getPossibleSettings()

        return <div className="settings-selector" style={cssSettings}>
        </div>
    }
}