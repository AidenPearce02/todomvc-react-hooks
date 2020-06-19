import { v4 as uuidv4 } from 'uuid';
import { ACTION_TYPES } from '../../constants/action-type';
import { selectCompleted } from '../selectors/todo';

const areAllCompleted = state => state.length && selectCompleted(state).length === state.length;

export const todosReducer = (state = [], action) => {
  switch (action.type) {
    case ACTION_TYPES.load:
      return [...action.todos];
    case ACTION_TYPES.create:
      return [...state, { id: uuidv4(),
        name: action.name,
        finishTo: action.finishTo,
        createdOn: new Date(),
        solved: new Date(),
        completed: false }];
    case ACTION_TYPES.update:
      return state.map(todo => (todo.id === action.values.id ? { ...todo, ...action.values } : todo));
    case ACTION_TYPES.remove:
      return state.filter(todo => todo.id !== action.id);
    case ACTION_TYPES.completeAll:
      return state.map(todo => ({ ...todo,
        ...{ completed: !areAllCompleted(state),
          solved: (!areAllCompleted(state)) ? new Date() : todo.solved } }));
    default:
      return state;
  }
};
