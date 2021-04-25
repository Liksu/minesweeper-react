export function classes(...classes: Array<string | Array<string> | {[className: string]: boolean}>): string {
    return classes.flatMap(item => {
        if (String(item) === item || item instanceof Array) return item;
        return Object.entries(item).filter(([name, value]) => value).map(([name, flag]) => name)
    }).join(' ')
}

export class DebouncedClick {
    timerId = 0
    values: Array<number> = []
    duration = 100
    cb?: Function

    constructor(cb: Function) {
        this.cb = cb
    }

    next = (event: any): void => {
        if (this.timerId) clearTimeout(this.timerId)
        const buttons = isNaN(Number(event)) ? event.buttons : event
        // console.log('next', {buttons})
        this.timerId = window.setTimeout(this.flush, this.duration)
        this.values.push(buttons)
    }

    private flush = () => {
        const value = this.values.includes(1) && this.values.includes(2) ? 3 : Math.max(...this.values)
        if (this.cb) this.cb(value)
        this.values = []
        this.timerId = 0
    }
}

export function range(a: number, b?: number) {
    if (a < 0 && b == null) b = -1
    if (b == null) [a, b] = [1, a]

    const result = []
    for (let i = a; i <= b; i++) result.push(i)
    return result
}

export function rand(min: number, max?: number) {
    if (min < 0 && max == null) max = -1
    if (max == null) [min, max] = [1, min]

    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

export function arand(min: number, max?: number) {
    if (max == null) [min, max] = [0, min]

    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min
}
