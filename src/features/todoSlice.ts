import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../app/store";

export enum TodoStatusEnum {
  WAITING = 'waiting',
  PROGRESS = 'progress',
  FINISHED = 'finished',
}

export type TodoType = {
  id: string;
  status: TodoStatusEnum;
  title: string;
  text: string;
  isEdited: boolean;
}

interface TodoSliceState {
  todos: TodoType[],
  searchQuery: string,
  editorQuery: string,
}

const initialState: TodoSliceState = {
  todos: [],
  searchQuery: '',
  editorQuery: ''
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<{ todo: TodoType }>) {
      state.todos = [...state.todos, {...action.payload.todo}]
    },
    updateTodo(state, action: PayloadAction<{ todo: TodoType }>) {
      state.todos = state.todos
        .map(todo => todo.id === action.payload.todo.id
          ? {... action.payload.todo, isEdited: false}
          : todo)
    },
    removeTodo(state, action: PayloadAction<{ id: string }>) {
      state.todos = state.todos.filter(todo => todo.id !== action.payload.id)
    },
    setStatus(state, action: PayloadAction<{ id: string, status: TodoStatusEnum }>) {
      state.todos = state.todos
        .map(todo => todo.id === action.payload.id
          ? {...todo, status: action.payload.status}
          : todo)
    },
    setQuery(state, action: PayloadAction<{ query: string }>) {
      state.searchQuery = action.payload.query;
    },
    setEditingTodo(state, action: PayloadAction<{ id: string }>) {
      state.todos = state.todos.map(todo =>
        todo.id === action.payload.id
          ? {...todo, isEdited: todo.isEdited ? false : true}
          : {
            ...todo,
            isEdited: false
          });
    },
    setEditQuery(state, action: PayloadAction<{ query: string }>) {
      state.editorQuery= action.payload.query;
    },
  },
})
export const todosSelector = (state: RootState) => state.todo;

export const {addTodo, setStatus, removeTodo, setQuery, setEditingTodo, updateTodo, setEditQuery} = todoSlice.actions

export default todoSlice.reducer
