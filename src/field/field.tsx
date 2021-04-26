import React from "react";
import './field.scss'
import {classes} from "../utils";
import {IFieldSettings} from "../board-state";
import {ClickValues, DebouncedClicks} from "../debounced-clicks";

interface IFieldProps {
    move?: Function;
    lookup?: Function;
    field: IFieldSettings;
}

export class Field extends React.Component<IFieldProps> {
    state = {
        content: '',
        isSuggested: false,
        count: 0
    }

    enabled = true;
    click: DebouncedClicks
    settings: IFieldSettings
    private readonly element: React.RefObject<HTMLDivElement>;

    constructor(props: IFieldProps) {
        super(props);
        this.click = new DebouncedClicks(this.onClick, this.onPress)
        this.settings = props.field
        this.settings.component = this
        this.element = React.createRef();
    }

    render() {
        const cssSettings = {
            '--count': this.state.count,
            '--direction': this.settings.y < 2 ? 1 : -1
        } as React.CSSProperties;

        return <div
            {...this.click.listeners}
            className={classes(
                'field',
                `around${this.settings.isMine ? 0 : this.settings.value}`,
                {
                    open: this.settings.isOpen as boolean,
                    marked: this.settings.isMarked as boolean,
                    suggested: this.state.isSuggested
                },
            )}
            style={cssSettings}
            ref={this.element}
        >{this.state.content}</div>
    }

    open = () => {
        this.settings.isOpen = true
        this.setState({
            content: this.settings.isMine ? '💣' : (this.settings.value || '').toString(),
            isSuggested: false,
        })
    }

    mark = (state?: boolean) => {
        if (this.settings.isOpen) return
        this.settings.isMarked = state ?? !this.settings.isMarked
        const count = this.settings.board?.minesCount ?? 0

        this.setState({
            count,
            isSuggested: false,
            content: this.settings.isMarked ? '🚩' : ''
        })
        if (state == null) setTimeout(this.resetAnimation, 0)
    }

    lookup = () => {
        if (!this.settings.isOpen || !this.settings.value) return

        const around = this.settings.board?.getAround(this.settings)
        const marked = around?.reduce((n: number, field: IFieldSettings) => n + Number(field.isMarked), 0) ?? 0

        if (this.props.lookup && this.settings.value === marked) {
            this.props.lookup(this.settings)
        }
    }

    suggest = () => {
        if (this.settings.isOpen || this.settings.isMarked) return
        this.setState({isSuggested: !this.state.isSuggested})
    }

    onClick = (action: ClickValues) => {
        // console.log('onClick', {1: 'Open', 2: 'Mark', 3: 'Lookup', 4: 'Suggest'}[action])
        // console.log({button})
        if (!this.enabled) return;

        switch (action) {
            case ClickValues.Open:
                if (!this.settings.isMarked) {
                    if (this.props.move) this.props.move(this.settings)
                    this.open()
                }
                break
            case ClickValues.Mark:
                this.mark()
                break
            case ClickValues.Lookup:
                this.lookup()
                break
            case ClickValues.Suggest:
                this.suggest()
                break
        }
    }

    disable = () => {
        this.enabled = false;
    }

    private resetAnimation = () => {
        this.element.current?.classList.remove('animate')
        void this.element.current?.offsetWidth
        this.element.current?.classList.add('animate')
    }

    private onPress = (state: boolean, action: ClickValues) => {
        if (action !== ClickValues.Lookup) return
        // console.log('onPress', {state, action}, state ? 'release' : 'press', {1: 'Open', 2: 'Mark', 3: 'Lookup', 4: 'Suggest'}[action])

        this.settings.board
            ?.getAround(this.settings)
            .filter(field => !field.isOpen && !field.isMarked)
            .forEach(field => {
                field.component?.element.current?.classList.toggle('pressed', !state)
            })
    }
}