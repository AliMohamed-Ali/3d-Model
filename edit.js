const todoId = (location.hash.replace('#', ''))
let todos = getSavedTodo()
let element = todos.find(el => el.id == todoId)
const title = document.querySelector('#title-id')
const status = document.querySelector('#status-id')
const updated = document.querySelector('#updated')
if (element === undefined) {
    location.assign('./index.html')
} else {
    console.log(element)
}
status.value = element.completed
title.value = element.text
updated.textContent = generateTime(element.updatedAt)
document.querySelector('#remove').addEventListener('click', function (e) {
    removeTodo(element.id)
    saveTodo(todos)
    location.assign('./index.html')
})
title.addEventListener('input', function (e) {
    element.text = e.target.value
    element.updatedAt = moment().valueOf()
    updated.textContent = generateTime(element.updatedAt)

    saveTodo(todos)
})
status.addEventListener('input', function (e) {
    element.completed = e.target.value
    element.updatedAt = moment().valueOf()
    updated.textContent = generateTime(element.updatedAt)

    saveTodo(todos)
})
window.addEventListener('storage', function (e) {
    if (e.key === 'todos') {
        todos = JSON.parse(e.newValue)
        let element = todos.find(el => el.id == todoId)
        if (element === undefined) {
            location.assign('./index.html')
        }
        status.value = element.completed
        title.value = element.text
        updated.textContent = generateTime(element.updatedAt)

    }
})
