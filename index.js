let  todos =getSavedTodo();

const filter ={
    searchText:'',
    sortedBy:'byEditing',
    hideCompleted:false
}

renderTodo(todos,filter)
document.querySelector('#search').addEventListener('input',function(e){
    filter.searchText = e.target.value
    renderTodo(todos,filter)

})
const timeStmap = moment().valueOf()
document.querySelector('#form-name').addEventListener('submit',function(e){
    e.preventDefault()
    let id=todos[0]?todos[todos.length -1 ].id+(Math.random()*100):0
    todos.push({
        id:id,
        text:e.target.elements.firstName.value,
        completed:false,
        createdAt:timeStmap,
        updatedAt:timeStmap

    })
    saveTodo(todos)
    e.target.elements.firstName.value = ''
    document.location.assign(`./edit.html#${id}`)
})
document.querySelector('#hide-completed').addEventListener('change',function(e){
    filter.hideCompleted=e.target.checked
    renderTodo(todos,filter)
})
document.querySelector('#selectSort').addEventListener('change',function(e){
    filter.sortedBy=e.target.value;
    renderTodo(todos,filter)

})
// document.querySelector('.todo').addEventListener('click',function(e){
//     removeTodo(e)
//     saveTodo(todos)
//     renderTodo(todos,filter)
// })
window.addEventListener('storage',function(e){
    if(e.key === 'todos'){
        todos=JSON.parse(e.newValue)
        renderTodo(todos,filter)
    }
})
// const now = moment()
// console.log(now.toString())
// now.add(7,'year').subtract(1,'month')
// console.log(now.format('MMMM Do Y'))
// console.log(now.valueOf())
// console.log(now.fromNow())
// const birthday = moment()
// // birthday.subtract(28,'year').subtract(8,'day')
// birthday.year('1994')
// birthday.month(2)
// birthday.date(6)
// console.log(birthday.format('MMMM Do, yyy'))
// console.log(birthday.fromNow())
