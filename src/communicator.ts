import App from './App'

export class Communicator {
    parent: MessageEventSource | null = window.parent
    private app: App

    constructor(app: App) {
        this.app = app
        this.startListening()
    }

    public notifyParent(addon?: object) {
        // @ts-ignore
        this.parent?.postMessage({
            source: 'minesweeper',
            state: this.app.state,
            settings: this.app.settings,
            ...addon,
        }, '*')
    }

    private startListening() {
        window.addEventListener('message', this.processMessage.bind(this))
    }
    
    private processMessage = (event: MessageEvent) => {
        if (event.source === window) return
        
        const action = typeof event.data === 'string' ? event.data : event.data?.action
        switch (action) {
            case 'subscribe_me': return this.subscribeParent(event.source)
            case 'unsubscribe_me': return this.unsubscribeParent()
            case 'restart': return this.app.restart()
            case 'get_state': return this.notifyParent()
        }
    }
    
    private subscribeParent(parentWindow: MessageEventSource | null) {
        this.parent = parentWindow
        this.notifyParent({ subscribed: true })
    }
    
    private unsubscribeParent() {
        this.parent = null
    }
}