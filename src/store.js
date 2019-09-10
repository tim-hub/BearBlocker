const {createStore, combineReducers} = require('redux');

const CONSTANTS = {
  TOGGLE_LOADING: 'TOGGLE_LOADING',
};

const defaultState ={
  isLoading: false,
};
const ui = (state = defaultState, action)=> {
  switch (action.type) {
    case CONSTANTS.TOGGLE_LOADING:
      console.log('change loading status'+action.isLoading + action.type);
      return Object.assign({}, state, {isLoading: !action.isLoading});
    case 'DECREMENT':
      return state;
    default:
      return state;
  }
};

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
const store = createStore( combineReducers({
  ui: ui,
}));

const toggleLoading = ()=>{
  store.dispatch({
    type: CONSTANTS.TOGGLE_LOADING,
    isLoading: store.getState().ui.isLoading,
  });
};

module.exports={
  store,
  CONSTANTS,
  toggleLoading,
};
