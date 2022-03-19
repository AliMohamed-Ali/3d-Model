//Read existing todos from localStorage
function getSavedTodo(){
    const todosJson = localStorage.getItem('todos')
    if(todosJson){
        return JSON.parse(todosJson);
    }else {
        return [];
    }
}

//save todos to localstorge 
function saveTodo(note){
    localStorage.setItem('todos',JSON.stringify(note))
}
//sort todo itme
const sortTodo = function(notes , sortBy){
    if(sortBy==='byEditing'){
        return notes.sort(function(a,b){
            if(b.updatedAt > a.updatedAt){
                return 1
            }else if(a.updatedAt >b.updatedAt){
                return -1
            }else{
                return 0 
            }
            // return b.updatedAt-a.updatedAt
        })
    }else if(sortBy === 'alphabtical'){
        return notes.sort(function(a,b){
            if(b.text.toLowerCase() > a.text.toLowerCase()){
                return -1
            }else if(a.text.toLowerCase() > b.text.toLowerCase()){
                return 1
            }else{
                return 0 
            } 
            // return b.text - a.text
        })
    }else if(sortBy === 'byCreating'){
        return notes.sort(function(a,b){
            if(b.createdAt > a.createdAt){
                return 1
            }else if(a.createdAt >b.createdAt){
                return -1
            }else{
                return 0 
            }
            // return b.createdAt - a.createdAt 
        })
    }else{
        return notes
    }

}
//render app 
function renderTodo(notes,filter){
    notes = sortTodo(notes,filter.sortedBy)
    const filterNotes = notes.filter(el=>{
        const searchTextMatch = el.text.toLowerCase().includes(filter.searchText.toLowerCase());
        const hideCompletedMatch = !filter.hideCompleted || !el.completed

        return searchTextMatch && hideCompletedMatch
    })
    // debugger
    const notesNotCompleted = filterNotes.filter(el=>!el.completed)
    document.querySelector('.todo').innerHTML='';
   
    document.querySelector('.todo').appendChild(getSummary(notesNotCompleted)) 

    filterNotes.forEach(el=>{
        const p = generateDom(el);
        document.querySelector('.todo').appendChild(p)

    })
};

//Generate dom eelment 
function generateDom(el){
    const element = document.createElement('div')
    // element.setAttribute('id',el.id)
   
    // button.setAttribute('class','remove-task')

    //Setup checkbox
    const checkbox = document.createElement('input')
    checkbox.setAttribute('type','checkbox')
    checkbox.checked = el.completed 
    checkbox.addEventListener('change',function(){
        toggelCompleted(el.id)
        saveTodo(todos)
        renderTodo(todos,filter)
    })
    element.appendChild(checkbox)
    //setup TextElment
    const textEl = document.createElement('a')
    textEl.href = `./edit.html#${el.id}`
    if(el.text.length >0 ){
        textEl.textContent = el.text
    }else{
        textEl.textContent = "UnNamed Task"
    }
    element.appendChild(textEl)
     //Setup button
    const button  = document.createElement('button')
    button.textContent = 'x'
    button.addEventListener('click',function(){
        removeTodo(el.id)
        saveTodo(todos)
        renderTodo(todos,filter)
        // console.log(el.id)

    })
    element.appendChild(button)
    
    return element
}
//Generate a summary 
const getSummary = function(incomplete){
    const summary = document.createElement('h2')
    summary.textContent = `You have ${incomplete.length} todo leaft`
    return summary
}
//remove an todo by id 
const removeTodo =function(id){
        let indexTodo  = todos.findIndex(el=>el.id === id)
        todos.splice(indexTodo,1)
        
}
//change completed by id
const toggelCompleted = function(id){
    let todo  = todos.find(el=>el.id === id)
    todo.completed  = !todo.completed 
}
//updated time 
const generateTime = function(timeStamp){
    return `Last updated ${moment(timeStamp).fromNow()}`
}