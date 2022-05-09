


/*
 // The Store should have four parts
  // 1. The state
  // 2. Get the state.
  // 3. Listen to changes on the state.
  // 4. Update the state

*/
///////////////////////////////////////////////////////
// Create Store is a library code not application code
const CreateStore = (reducer) => {

    // Store current state 
    let state
    // subscribed listeners array
    let listners = []

    // function to return the Store state
    const getState = () => {
        return state
    }

    // function to subscribe a listener 
    const subscribe = (listner) => {
        listners.push(listner)
        return () => {
            listners = listners.filter((l) => l !== listner);
        }


    }

    // dispatch to update Store-state 
    const dispatch = (action) => {
        state = reducer(state, action);
        listners.forEach((listner) => listner());
    }

    // return the functions can be invoked from the createstore
    return {
        getState,
        subscribe,
        dispatch,
    }




}
///////////////////////////////////////////////





//********/ application code can be anything -/******** */



// define the const for action types instead of strings to avoid typing mistakes
const ADD_TODO='ADD_TODO';
const REMOVE_TODO='REMOVE_TODO';
const TOGGLE_TODO ='TOGGLE_TODO';
////////////////////////////////////////


//reducer function
// decided how will the state be changed 
// also called a reducer function - pure function to change the state due to its paramaters
function todos(state = [], action) {
    // console.log(action);
    switch (action.type) {
        case ADD_TODO:
            return state.concat([action.todo])
        case REMOVE_TODO:
            return state.filter((td) => { td.id !== action.id });
        case TOGGLE_TODO:
            return state.map((td) => {
                (td.id !== action.todo.id) ?
                    td
                    :
                    Object.assign({}, td, { complete: !td.complete })


            });
        default : return state
    }
}

//help functions -Action Creators
function addTodoAction (todo) {
    return {
      type: ADD_TODO,
      todo,
    }
  }
  
  function removeTodoAction (id) {
    return {
      type: REMOVE_TODO,
      id,
    }
  }
  
  function toggleTodoAction (id) {
    return {
      type: TOGGLE_TODO,
      id,
    }
  }
  


// define the const for action types instead of strings to avoid typing mistakes
const ADD_GOAL='ADD_GOAL';
const REMOVE_GOAL='REMOVE_GOAL';
////////////////////////////////////////

// create a new reducer function to my application
function lifegoals(state=[],action){
    switch (action.type) {
        case ADD_GOAL:
            return state.concat([action.goal])
        case REMOVE_GOAL:
            return state.filter((g) => { g.id !== action.id });
        default : return state
    }
}

//help functions - Action Creators
  function addGoalAction (goal) {
    return {
      type: ADD_GOAL,
      goal,
    }
  }
  
  function removeGoalAction (id) {
    return {
      type: REMOVE_GOAL,
      id,
    }
  }




//create the root reducer function 
function app (state = {}, action) {
    return {
      todos: todos(state.todos, action),
      lifegoals: lifegoals(state.goals, action),
    }
  }

/*
the reducer that was passed to createStore() is called with the current state tree and the action...this updates the state tree
passing the todos function as reducer function -- now pass the root reducer function to be responsible of the which reducer function will be called 
*/
const Store = CreateStore(app);

// calling the Store sunscribe method to decide what to do when the Store state change 
Store.subscribe(() => {
    console.log('the new state is ', Store.getState());
})

// calling the Store dispatch function to update the Store state

Store.dispatch({
    type: ADD_TODO,
    todo: {
        id: 0,
        name: 'Learning Redux',
        complete: false
    }


});




const unsubscribe = Store.subscribe(() => {
    console.log('changed again ! ', Store.getState());
})




//test the app
Store.dispatch(addTodoAction({
    id: 0,
    name: 'Walk the dog',
    complete: false,
  }))
  
  Store.dispatch(addTodoAction({
    id: 1,
    name: 'Wash the car',
    complete: false,
  }))
  
  Store.dispatch(addTodoAction({
    id: 2,
    name: 'Go to the gym',
    complete: true,
  }))
  
  Store.dispatch(removeTodoAction(1))
  
  Store.dispatch(toggleTodoAction(0))
  
  Store.dispatch(addGoalAction({
    id: 0,
    name: 'Learn Redux'
  }))
  
  Store.dispatch(addGoalAction({
    id: 1,
    name: 'Lose 20 pounds'
  }))
  
  Store.dispatch(removeGoalAction(0))
