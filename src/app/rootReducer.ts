import { combineReducers } from 'redux';
import todoReducer from '../features/todoSlice'
import themeReducer from '../features/themeSlice'

export default combineReducers({
	todo: todoReducer,
	theme: themeReducer,
});
