import {BoardState} from "./board-state"
import {SelectionTypes} from "./field/field"

export class Keyboard {
    x = 0
    y = 0
    private readonly element: HTMLElement | null = null
    board!: BoardState

    actions: {[action: string]: Function | string} = {
        // movements: ← ↑ → ↓
        ArrowUp: () => this.move(0, -1),
        ArrowDown: () => this.move(0, 1),
        ArrowLeft: () => this.move(-1, 0),
        ArrowRight: () => this.move(1, 0),

        // movements: ↖ ↗ ↘ ↙
        Home: () => this.move(-1, -1),
        PageUp: () => this.move(1, -1),
        PageDown: () => this.move(1, 1),
        End: () => this.move(-1, 1),

        // movements: ⭰ ⭲ ⭱ ⭳
        CtrlHome: () => this.moveTo(0, null),
        CtrlEnd: () => this.moveTo(this.board.columns - 1, null),
        CtrlPageUp: () => this.moveTo(null, 0),
        CtrlPageDown: () => this.moveTo(null, this.board.rows - 1),

        // game:
        Enter: () => this.open(),
        CtrlEnter: () => this.lookup(),
        Space: () => this.mark(),
        
        // numpad game:
        Insert: 'Space',
        '+': 'CtrlEnter',
        0: 'Space',
        1: 'End',
        2: 'ArrowDown',
        3: 'PageDown',
        4: 'ArrowLeft',
        Clear: 'Enter',
        5: 'Enter',
        6: 'ArrowRight',
        7: 'Home',
        8: 'ArrowUp',
        9: 'PageUp',
        Ctrl1: () => this.moveTo(0, this.board.rows - 1),
        Ctrl2: 'CtrlPageDown',
        Ctrl3: () => this.moveTo(this.board.columns - 1, this.board.rows - 1),
        Ctrl4: 'CtrlHome',
        Ctrl5: () => this.moveTo(this.board.columns / 2 | 0, this.board.rows / 2 | 0),
        Ctrl6: 'CtrlEnd',
        Ctrl7: () => this.moveTo(0, 0),
        Ctrl8: 'CtrlPageUp',
        Ctrl9: () => this.moveTo(this.board.columns - 1, 0),
    }

    constructor(element: HTMLElement | string = document.body) {
        this.element = typeof element === 'string' ? document.querySelector(element) ?? null : (element as HTMLElement)
    }

    public attach(board: BoardState, andRun = false) {
        this.board = board
        if (!this.element) return;
        this.element.addEventListener('keydown', andRun ? this.handleKeyboard : this.init, false)
        if (andRun) this.select()
    }

    public detach() {
        if (!this.element) return;
        this.element.removeEventListener('keydown', this.handleKeyboard, false)
        this.element.removeEventListener('keydown', this.init, false)
    }

    private handleKeyboard = (event: KeyboardEvent) => {
        let action = this.actions[this.getActionName(event)]
        while (typeof action === 'string') action = this.actions[action]
        action?.()
        event.preventDefault()
    }

    private init = (event: KeyboardEvent) => {
        const actionName = this.getActionName(event)

        if (!Object.keys(this.actions).includes(actionName)) return;
        if (!this.element) return;

        this.element.addEventListener('keydown', this.handleKeyboard, false)
        this.element.removeEventListener('keydown', this.init, false)

        this.select()
    }

    public select(state = true) {
        this.board.board[this.x][this.y].component?.select(SelectionTypes.Active, state)
    }

    public moveTo(x: number | null, y: number | null) {
        this.select(false)

        if (x != null) this.x = x
        if (y != null) this.y = y

        this.select(true)
    }

    public move(dx: number, dy: number) {
        this.select(false)

        this.x += dx
        this.y += dy

        if (this.x < 0) this.x = 0
        if (this.x === this.board.columns) this.x = this.board.columns - 1
        if (this.y < 0) this.y = 0
        if (this.y === this.board.rows) this.y = this.board.rows - 1

        this.select(true)
    }

    private mark() {
        this.board.board[this.x][this.y].component?.mark()
        this.select()
    }

    private open() {
        this.board.board[this.x][this.y].component?.open(true)
        this.select()
    }

    private lookup() {
        this.board.board[this.x][this.y].component?.lookup()
    }

    private getActionName(event: KeyboardEvent): string {
        const ctrl = event.ctrlKey ? 'Ctrl' : ''
        const alt = event.altKey ? 'Alt' : ''
        const shift = event.shiftKey ? 'Shift' : ''
        const key = event.key === ' ' ? 'Space' : event.key
        return ctrl + alt + shift + key
    }
}