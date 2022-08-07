import React, {FC, memo} from 'react';
import styled from "styled-components";
import {Todo, TodosSearch} from "../";
import {commonTheme} from "../../themes";
import {useSelector} from "react-redux";
import {todosSelector} from "../../features/todoSlice";

const Container = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 22px;

  background-color: ${(props: any) => props.theme.SECONDARY_BACKGROUND_COLOR};
  border-radius: 30px;
  border: unset;

  @media (max-width: ${commonTheme.media.tab}) {
    padding: 20px;

    border-radius: 25px;
  }
`
const TodosListEl = styled.div`
  overflow: auto;
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 0 -22px -22px 0;
  padding: 12px 22px 17px 0;

  &::-webkit-scrollbar {
    width: 5px;
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, .15);
    border-radius: 10px;
  }

  @media (max-width: ${commonTheme.media.tab}) {
    max-height: unset;
    margin: 0 -20px -20px 0;
    padding: 10px 20px 20px 0;
  }
`
const NotFound = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  margin: auto;

  font-size: ${commonTheme.fontSizes.s};
  font-family: ${commonTheme.fonts.Inter};
  color: ${props => props.theme.QUATERNARY_BACKGROUND_COLOR};
  
  pointer-events: none;
`
const TodosSearchWrapper = styled.div`
  margin: -7px -6px 0 -6px;
`

enum searchStatus {
  NOT_FOUNDED = 'Не найдено',
  ADD_TODO = 'Добавьте todo'
}

export const TodosList: FC = memo(() => {
  const {todos, searchQuery} = useSelector(todosSelector)

  const filteredTodos = !searchQuery
    ? todos
    : todos.filter((todo) =>
      todo.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <Container>
      <TodosSearchWrapper>
        <TodosSearch/>
      </TodosSearchWrapper>
      {filteredTodos.length > 0
        ?
        <TodosListEl>
          {filteredTodos.map((todo) => <Todo {...todo} key={todo.id}/>).reverse()}
        </TodosListEl>
        :
        <NotFound>
          {searchQuery
            ? searchStatus.NOT_FOUNDED
            : searchStatus.ADD_TODO}
        </NotFound>
      }
    </Container>
  );
});
