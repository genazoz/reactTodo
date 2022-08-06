import React, {FC} from 'react';
import styled from "styled-components";
import {Todo} from "../";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 38px 25px;

  background-color: ${(props: any) => props.theme.SECONDARY_BACKGROUND_COLOR};
  border-radius: 30px;
  border: unset;
`
const Wrapper = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  gap: 10px;
  width:100%;
  height: 45px;
  margin: 0 0 20px 0;
  padding: 0 15px 0 10px;

  border-radius: 13px;
  background: ${props => props.theme.TERTIARY_BACKGROUND_COLOR};

  i {
    padding: 7px;

    border-radius: 7px;
    font-size: 12px;
    color: ${props => props.theme.THEME_BUTTON_COLOR_A};
    background: ${props => props.theme.THEME_BUTTON_BACKGROUND_A};
  }
`
const Title = styled.h2`
  margin: 0 0 15px 0;

  font-size: 18px;
  font-weight: 500;
  color: ${props => props.theme.THEME_BUTTON_BACKGROUND_A}
`
const Search = styled.input`
  display: flex;
  width: 100%;

  color: #FFFFFF;

  &::placeholder {
    color: rgba(255, 255, 255, .6);
  }
`
const TodosList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const todos = [
  {
    completed: '50%',
    title: 'Add new layer',
    text: 'Product Design'
  },
  {
    completed: '50%',
    title: 'Complete task',
    text: 'Product Design'
  },
  {
    completed: '50%',
    title: 'Team Meeting',
    text: 'Product Design'
  },
  {
    completed: '50%',
    title: 'Desktop App Redesign',
    text: 'Product Design'
  },
  {
    completed: '50%',
    title: 'Mobile App Redesign',
    text: 'Product Design'
  },
]

export const TodoList: FC = () => {
  return (
    <Container>
      <Title>
        Todo List
      </Title>
      <Wrapper>
        <i className="far fa-search" aria-hidden="true"></i>
        <Search placeholder={'Search todos...'}></Search>
      </Wrapper>
      <TodosList>
        {todos.map((todo) => <Todo {...todo} />)}
      </TodosList>
    </Container>
  );
};
