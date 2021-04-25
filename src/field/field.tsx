import React, {} from "react";
import './field.scss'
import {classes, DebouncedClick} from "../utils";
import {IFieldSettings} from "../board-state";

interface IFieldProps {
    move?: Function;
    lookup?: Function;
    field: IFieldSettings;
}

export class Field extends React.Component<IFieldProps> {
    state = {
        content: '',
        enabled: true,
        count: 0
    }

    click: DebouncedClick
    settings: IFieldSettings
    private readonly element: React.RefObject<HTMLDivElement>;

    constructor(props: IFieldProps) {
        super(props);
        this.click = new DebouncedClick(this.onClick)
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
            className={classes(
                'field',
                `around${this.settings.isMine ? 0 : this.settings.value}`,
                {
                    open: this.settings.isOpen as boolean,
                    marked: this.settings.isMarked as boolean,
                },
            )}
            style={cssSettings}
            onContextMenuCapture={this.mouseCapture}
            // onMouseDown={this.click.next}
            // onMouseDown={e => console.log('down', e.buttons)}
            onContextMenu={() => this.click.next(2)}
            onDoubleClick={() => this.click.next(3)}
            onClick={() => this.click.next(1)}
            ref={this.element}
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
        const count = this.settings.board?.minesCount ?? 0

        this.setState({count, content: this.settings.isMarked ? '🚩' : ''})
        if (state == null) this.resetAnimation()
    }

    lookup = () => {
        if (!this.settings.isOpen || !this.settings.value) return;

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

    private resetAnimation = () => {
        this.element.current?.classList.remove('animate')
        void this.element.current?.offsetWidth
        this.element.current?.classList.add('animate')
    }
}