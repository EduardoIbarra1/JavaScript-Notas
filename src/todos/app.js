import html from './app.html?raw';
import todoStore,{Filters} from '../store/todo-store'
import { renderTodos, renderPending } from './use-cases';


const ElementIDs = {
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
    ClearCompleted: '.clear-completed',
    todoFilters: '.filtro',
    pendingCountLabel: '#pending-count',
}

/**
 * Para mostrar en pantalla
 * 
 * @param {String} elementId Elemento is 
 */
export const App = (elementId) =>{

    const displayTodos = () =>{
        const todos = todoStore.getTodos(todoStore.getCurrentFilter());
        //console.log(todos);
        renderTodos(ElementIDs.TodoList, todos);
        updatePendingCount();
    }

    const updatePendingCount = () =>{
        renderPending(ElementIDs.pendingCountLabel);
    }


    //Cuando se llama la funcion App()
    (()=>{
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        displayTodos();
    })();


    //Referencias html
    const newDescriptionInput = document.querySelector(ElementIDs.NewTodoInput);
    const todoListUL = document.querySelector(ElementIDs.TodoList);
    const deleteCompletedButton = document.querySelector(ElementIDs.ClearCompleted);
    const filtersListItem = document.querySelectorAll (ElementIDs.todoFilters);
    
    
    
    //Listeners
    newDescriptionInput.addEventListener('keyup', ( event ) => {
        //console.log(event);
        if(event.keyCode !== 13) {
            return;
        }
        if(event.target.value.trim().length === 0){
            return;
        } 
        todoStore.addTodo(event.target.value);
        displayTodos();
        event.target.value = '';
    });


    /**
     * Método para modificar el todo
     */
    todoListUL.addEventListener('click', (event)=>{
        //console.log(event.target);
        const element = event.target.closest('[data-id]');
        todoStore.toggleTodo(element.getAttribute('data-id'));
        displayTodos();
    });


    /**
     * Elimina todo
     */
    todoListUL.addEventListener('click', (event)=>{
        const eliminarTodo = event.target.className === 'destroy';
        const element = event.target.closest('[data-id]');
        
        if (!element || !eliminarTodo){
            return;
        }
        
        todoStore.deleteTodo (element.getAttribute('data-id'));
        displayTodos();
    });


    deleteCompletedButton.addEventListener('click', () =>{
        //console.log(event.target);
        todoStore.deleteCompleted();
        displayTodos();
    })



    /**
     * Cambia el filtro
     */
    filtersListItem.forEach(element =>{
        element.addEventListener('click', (element) =>{
            filtersListItem.forEach (el => el.classList.remove('selected') );
            element.target.classList.add('selected');

            
            switch(element.target.text){
                case 'Todos':
                    todoStore.setFilter(Filters.All);
                    break;
                case 'Pendientes':
                    todoStore.setFilter(Filters.Pending);
                    break;
                case 'Completados':
                    todoStore.setFilter(Filters.Completed);
                    break;
            }
            displayTodos();
        });
    });
}


