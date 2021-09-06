// uses window.board that contains BoardState

// open all fields except one to test game ending
board.fields.filter(field => !field.isOpen && !field.isMine).slice(0, -1).forEach(field => field.component.open())

// select all zero fields to open clusters
board.fields.filter(field => !field.value && !field.isOpen && !field.isMine).forEach(field => field.component.select())

// solver
// TODO: make repeat, but how to stop?

board.fields.filter(field => field.value > 0 && field.isOpen).forEach(field => {
    around = board.getAround(field)
    if (around.filter(tile => !tile.isOpen).length === field.value)
        around.filter(tile => !tile.isMarked).forEach(tile => tile.component.mark())
})

board.fields.filter(field => field.value > 0 && field.isOpen).forEach(field => {
    field.component.lookup()
})
