import React, {FC} from 'react';
import {useAppDispatch} from "../../app/store";
import {setQuery, todosSelector} from "../../features/todoSlice/todoSlice";
import {Search} from "../Search";
import {useSelector} from "react-redux";

export const TodosSearch: FC = () => {
  const dispatch = useAppDispatch();
  const {searchQuery} = useSelector(todosSelector)

  const onSearchChange = (e: any) => {
    dispatch(setQuery({query: e.target.value}));
  };

  return (
    <Search data-testid={'search-todo-input'} searchQuery={searchQuery} onSearchChange={(e) => onSearchChange(e)} />
  );
};

