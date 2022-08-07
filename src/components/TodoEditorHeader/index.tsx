import React, {FC, useLayoutEffect, useState} from 'react';
import styled from "styled-components";
import {Button} from "../Button";
import {commonTheme} from "../../themes";
import avatarSrc from "../../images/avatar.jpeg";
import {addTodo, setEditQuery, todosSelector, TodoStatusEnum, TodoType, updateTodo} from "../../features/todoSlice";
import {useSelector} from "react-redux";
import {useAppDispatch} from "../../app/store";

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0 30px 0;

  @media (max-width: ${commonTheme.media.tab}) {
    align-items: flex-end;
    padding: 0 0 20px 0;
  }
`
const Title = styled.h1`
  font-size: 34px;
  font-weight: 500;

  @media (max-width: ${commonTheme.media.tab}) {
    font-size: 28px;
  }
`
const Buttons = styled.div`
  display: flex;
  align-items: center;
  gap: 24px`
const BellButton = styled.button`
  width: 45px;
  height: 45px;

  border-radius: 50%;
  border: 1.5px solid ${props => props.theme.SECONDARY_BACKGROUND_COLOR};

  pointer-events: none;

  i {
    font-size: 19px;
    color: #EEEEEE;
  }

  @media (max-width: ${commonTheme.media.tab}) {
    display: none;
  }
`
const Avatar = styled.div`
  width: 45px;
  height: 45px;

  border-radius: 50%;

  background-image: url(${avatarSrc});
  background-size: cover;

  @media (max-width: ${commonTheme.media.tab}) {
    display: none;
  }
`

export const TodoEditorHeader: FC = () => {
  const dispatch = useAppDispatch();
  const {todos, editorQuery} = useSelector(todosSelector);
  const [isEdit, setIsEdit] = useState(false);
  const [editingTodo, setEditingTodo] = useState<TodoType | undefined>(undefined);

  const onClickAddTodo = () => {
    const todo = {
      id: new Date().getTime().toString(),
      status: TodoStatusEnum.WAITING,
      title: editorQuery,
      text: 'Frontend Todo',
      isEdited: false,
    }

    dispatch(addTodo({todo: todo}))
  }
  const onClickUpdateTodo = () => {
    if (editingTodo) {
      const updatedTodo = {...editingTodo, title: editorQuery}
      dispatch(updateTodo({todo: updatedTodo}))
    } else {
      throw 'Ошибка при обновлении todo';
    }
  }

  useLayoutEffect(() => {
    const editingTodo = todos.find(todo => todo.isEdited);

    if (editingTodo && editingTodo.status !== TodoStatusEnum.FINISHED) {
      setEditingTodo(editingTodo);
      setIsEdit(true);
    } else {
      setEditingTodo(undefined);
      dispatch(setEditQuery({query: ''}))
      setIsEdit(false);
    }
  }, [todos])

  return (
    <Header>
      <Title>Frontend Todos</Title>
      <Buttons>
        {
          isEdit
            ? <Button isDisabled={editorQuery ? editorQuery.length < 3 : true} isEdit={isEdit} onClick={onClickUpdateTodo}>
              <i className="fal fa-check" aria-hidden="true"></i>
              Сохранить
            </Button>
            : <Button isDisabled={editorQuery ? editorQuery.length < 3 : true} onClick={onClickAddTodo}>
              <i className="fal fa-plus" aria-hidden="true"></i>
              Добавить
            </Button>
        }
        <BellButton>
          <i className="fal fa-bell" aria-hidden="true"></i>
        </BellButton>
        <Avatar/>
      </Buttons>
    </Header>
  );
};
