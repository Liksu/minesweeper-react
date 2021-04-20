import React, {} from "react";
import './field.scss'
import {classes, DebouncedClick} from "../utils";
import {IFieldSettings} from "../board-state";

interface IFieldProps {
    move?: Function;
    lookup?: Function;
    field: IFieldSettings;
}

export class Field extends React.Component<IFieldProps>{
    state = {
        content: '',
        enabled: true
    }

    click: DebouncedClick
    settings: IFieldSettings

    constructor(props: IFieldProps) {
        super(props);
        this.click = new DebouncedClick(this.onClick)
        this.settings = props.field
        this.settings.component = this
        // this.content = `${this.settings.x}.${this.settings.y}`
    }

    render() {
        return <div className={classes('field', {open: this.settings.isOpen as boolean}, `around${this.settings.value}`)}
                    onContextMenuCapture={this.mouseCapture}
                    onMouseDown={this.click.next}
        >{this.state.content}</div>
    }

    mouseCapture(event: any) {
        event.preventDefault()
        event.nativeEvent.preventDefault()
    }

    open = () => {
        this.settings.isOpen = true
        this.setState({content: this.settings.isMine ? '💣' : (this.settings.value || '').toString()})
    }

    mark = (state?: boolean) => {
        if (this.settings.isOpen) return;
        this.settings.isMarked = state ?? !this.settings.isMarked
        this.setState({content: this.settings.isMarked ? '🚩' : ''})
    }

    lookup = () => {
        if (!this.settings.isOpen || !this.settings.value) return;
        // const checker = (field: IFieldSettings) => field;

        const around = this.settings.board?.getAround(this.settings)
        const marked = around?.reduce((n: number, field: IFieldSettings) => n + Number(field.isMarked), 0) ?? 0

        if (this.props.lookup && this.settings.value === marked) {
            this.props.lookup(this.settings)
        }
    }

    onClick = (button: any) => {
        // console.log({button})
        if (!this.state.enabled) return;

        switch (button) {
            case 1:
                if (!this.settings.isMarked) {
                    if (this.props.move) this.props.move(this.settings)
                    this.open()
                }
                break
            case 2:
                this.mark()
                break
            case 3:
                this.lookup()
                break
        }
    }

    disable = () => {
        this.setState({enabled: false})
    }
}