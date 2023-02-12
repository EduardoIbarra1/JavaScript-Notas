import { Todo } from "../todos/models/todo-model";

export const Filters = {
    All: 'all',
    Completed: 'Completed',
    Pending: 'Pending'
}

const state = {
    todos: [
        new Todo('Tarea pendiente 1'),
        new Todo('Tarea pendiente 2'),
        new Todo('Tarea pendiente 3'),
    ],
    filter: Filters.All,
}

const initStore = () =>{
    loadStore();
    //console.log(state);
}



/**
 * Cargar storage
 */
const loadStore = () =>{
    //throw new Error('Not implement'); 
    if(localStorage.getItem('state')){
        const {todos = [], filter = Filters.All} = JSON.parse(localStorage.getItem('state'));
        state.todos = todos
        state.filter = filter
    }
}

/**
 * Guardar storage
 */
const saveStateStorage = () => {
    //console.log(JSON.stringify(state));
    localStorage.setItem('state', JSON.stringify(state));
}

const getTodos = (filter = Filters.All)=>{
    switch (filter) {
        case Filters.All:
            return [...state.todos];

        case Filters.Completed:
            return state.todos.filter(todo => todo.done)
        
        case Filters.Pending:
            return state.todos.filter(todo => !todo.done)

        default:
            throw new Error(`Option ${filter} is not valid.`);
    }
}

const addTodo = (description) =>{
    if(!description) throw new Error('Not implement');
    state.todos.push(new Todo(description));
    saveStateStorage();
}

const toggleTodo = (todoId)=> {
    state.todos = state.todos.map(todo => {
        if(todo.id === todoId){
            todo.done = !todo.done;
        }
        return todo;
    });   
    saveStateStorage();
}

const deleteTodo = (todoId)=>{
    state.todos = state.todos.filter(todo => todo.id !== todoId)
    saveStateStorage();
}

const deleteCompleted = () =>{
    state.todos = state.todos.filter(todo => !todo.done)
    saveStateStorage();
}

const setFilter = (newFilter = Filters.All) =>{
    state.filter = newFilter;
    saveStateStorage();
}

const getCurrentFilter = () =>{
    return state.filter;
}

export default{
    deleteCompleted,
    deleteTodo,
    getCurrentFilter,
    initStore,
    loadStore,
    setFilter,
    toggleTodo,
    getTodos,
    addTodo
}