import React from 'react'
import './wrapper.scss'

interface IWrapperProps {
    onClose: Function
}

export class Wrapper extends React.Component<IWrapperProps> {
    render() {
        return <div className="wrapper" onClick={this.close} onKeyUp={this.catchEsc}>
            {this.props.children}
        </div>;
    }

    close = () => {
        this.props.onClose?.()
    }

    catchEsc = (event: any) => {
        if ((event as KeyboardEvent).key === 'Escape') this.close()
    }
}