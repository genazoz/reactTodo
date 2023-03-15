import { combineReducers } from 'redux';
import todoReducer from '../features/todoSlice/todoSlice'
import themeReducer from '../features/themeSlice/themeSlice'

export default combineReducers({
	todo: todoReducer,
	theme: themeReducer,
});
