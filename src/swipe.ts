type Direction = 'up' | 'down' | 'left' | 'right'
type Handler = (event: TouchEvent) => void
type Handlers = {[direction in Direction]?: Handler}

export class Swipe {
    private startX: number | null = null
    private startY: number | null = null
    private readonly element: HTMLElement | null = null
    private handlers: Handlers = {}

    constructor(element: HTMLElement | string = document.body, addImmediately = false) {
        this.element = typeof element === 'string' ? document.querySelector(element) ?? null : (element as HTMLElement)
        if (addImmediately) this.attach()
    }

    public attach() {
        if (!this.element) return;
        this.element.addEventListener('touchstart', this.handleTouchStart, false);
        this.element.addEventListener('touchend', this.handleTouchEnd, false);
    }

    public detach() {
        if (!this.element) return;
        this.element.removeEventListener('touchstart', this.handleTouchStart, false);
        this.element.removeEventListener('touchend', this.handleTouchEnd, false);
    }

    public on(direction: Direction, handler: Handler): Swipe
    public on(handlers: Handlers): Swipe

    public on(some: Direction | Handlers, handler?: Handler): Swipe {
        if (some && handler) this.handlers[some as Direction] = handler
        else Object.assign(this.handlers, some as Handlers)

        return this
    }

    private handleTouchStart = (event: TouchEvent) => {
        const {clientX: startX, clientY: startY} = event.touches[0]
        Object.assign(this, {startX, startY})
    }

    private handleTouchEnd = (event: TouchEvent) => {
        if (this.startX == null || this.startY == null) return;

        const {clientX: endX, clientY: endY} = event.changedTouches[0]
        
        const diffX = this.startX - endX
        const diffY = this.startY - endY
        const isHorizontal = Math.abs(diffX) > Math.abs(diffY)

        const direction: Direction = isHorizontal
            ? diffX > 0 ? 'left' : 'right'
            : diffY > 0 ? 'up' : 'down'

        this.startX = null;
        this.startY = null;

        return this.handlers[direction]?.(event)
    }
}
