import React, {FC, useLayoutEffect, useState} from 'react';
import styled from "styled-components";
import {useAppDispatch} from "../../app/store";
import {
  removeTodo,
  setEditingTodo,
  setEditQuery,
  setStatus,
  todosSelector,
  TodoStatusEnum,
  TodoType
} from "../../features/todoSlice/todoSlice";
import {commonTheme} from "../../themes";
import {useSelector} from "react-redux";

export const Todo: FC<TodoType> = ({id, status, title, text, isEdited}) => {
  const dispatch = useAppDispatch();
  const {searchQuery, editorQuery} = useSelector(todosSelector)
  const [searchedTitle, setSearchedTitle] = useState<string | React.ReactNode[]>(title);

  let statusList: TodoStatusEnum[] = [
    TodoStatusEnum.WAITING,
    TodoStatusEnum.PROGRESS,
    TodoStatusEnum.FINISHED
  ];

  const onClickTodo = () => {
    const currentStatus = statusList.findIndex(x => x === status);
    const newStatus = currentStatus === statusList.length - 1 ? statusList[0] : statusList[currentStatus + 1];
    dispatch(setStatus({id: id, status: newStatus}));

    if (isEdited && status === TodoStatusEnum.FINISHED) {
      dispatch(setEditingTodo({id: id}));
    }
  }
  const onRemoveTodo = (e: any) => {
    e.stopPropagation();

    dispatch(removeTodo({id: id}));
  }
  const onEditTodo = (e: any) => {
    e.stopPropagation();

    dispatch(setEditingTodo({id: id}));
    dispatch(setEditQuery({query: title}));
  }

  useLayoutEffect(() => {
    if (!searchQuery) {
      setSearchedTitle(title);
      return;
    }

    const idx = title.toLowerCase().indexOf(searchQuery.toLowerCase());

    if (idx < 0) return;

    setSearchedTitle(
      [title.substring(0, idx),
        <span>{title.substring(idx, idx + searchQuery.length)}</span>,
        title.substring(idx + searchQuery.length)])
  }, [searchQuery, editorQuery])

  const getIcon = () => {
    switch (status) {
      case TodoStatusEnum.WAITING:
        return <i className="fal fa-hourglass-start" aria-hidden="true"></i>;
        break;
      case TodoStatusEnum.PROGRESS:
        return <i className="far fa-spinner" aria-hidden="true"></i>;
        break;
      case TodoStatusEnum.FINISHED:
        return <i className="far fa-check" aria-hidden="true"></i>;
        break;
    }
  }

  return (
    <TodoEl data-testid={'todo'} className={'todo'} isEdited={isEdited} onClick={() => onClickTodo()}>
      <IconWrapper status={status}>
        {getIcon()}
      </IconWrapper>
      <Container>
        <Wrapper isEdited={isEdited}>
          <Title status={status} data-testid={'todo-title'}>
            {Array.isArray(searchedTitle)
              ? searchedTitle.map((txt, i) => <React.Fragment key={i}>{txt}</React.Fragment>)
              : searchedTitle
            }
          </Title>
          <Text>
            {text}
          </Text>
        </Wrapper>
        {status !== TodoStatusEnum.FINISHED
          && <Edit data-testid={'todo-edit-btn'} onClick={(e) => onEditTodo(e)} isEdited={isEdited}>
            {isEdited
              ? <i className="fal fa-times" aria-hidden="true"></i>
              : <i className="fal fa-pen" aria-hidden="true"></i>}
          </Edit>}
        <Remove data-testid={'todo-remove-btn'} onClick={(e) => onRemoveTodo(e)}>
          <i className="fal fa-minus" aria-hidden="true"></i>
        </Remove>
      </Container>
    </TodoEl>
  );
};

const TodoEl = styled.div<{ isEdited: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  gap: 15px;

  cursor: pointer;

  &:nth-last-child(1):not(:nth-child(1)) div {
  }

  &:nth-last-child(1) div {
    border: unset;
  }

  &:hover button {
    display: flex;
  }

  ${props => props.isEdited && `
    button {
      display: flex;
    }
  `}
`
const IconWrapper = styled.div<{ status: string }>`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;

  border-radius: 12px;
  border: 1px solid ${props => props.theme.QUATERNARY_BACKGROUND_COLOR};

  i {
    font-size: 14px;
  }

  @media (max-width: ${commonTheme.media.tab}) {
    width: 45px;
    height: 45px;
    
    i {
      font-size: 17px;
    }
  }

  ${props => props.status === TodoStatusEnum.WAITING && `
    border: 1px solid ${props.theme.WAITING_TODO_COLOR};
    background: ${props.theme.WAITING_TODO_COLOR};
     
    i {
    color: ${props.theme.WAITING_TODO_COLOR2};
    }
  `}

  ${props => props.status === TodoStatusEnum.PROGRESS && `
    border: 1px solid ${props.theme.PROGRESS_TODO_COLOR};
    background: ${props.theme.PROGRESS_TODO_COLOR};
     
    i {
      color: ${props.theme.PROGRESS_TODO_COLOR2};
    }
  `}

  ${props => props.status === TodoStatusEnum.FINISHED && `
    border: 1px solid ${props.theme.SUCCESS_TODO_COLOR};
    background: ${props.theme.SUCCESS_TODO_COLOR};
     
    i {
      color: ${props.theme.SUCCESS_TODO_COLOR2};
    }
  `}
`
const Container = styled.div`
  display: flex;
  align-items: stretch;
  width: calc(100% - 35px - 15px);

  border-bottom: 1px solid ${props => props.theme.TERTIARY_BACKGROUND_COLOR};

  @media (max-width: ${commonTheme.media.tab}) {
    width: calc(100% - 45px - 15px);
  }
`
const Wrapper = styled.div<{ isEdited: boolean }>`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: calc(100%);
  margin: 0 auto 0 0;
  padding: 10px 0;

  .todo:hover & {
    width: calc(100% - 70px);

    @media (max-width: ${commonTheme.media.tab}) {
      width: calc(100% - 90px);
    }
  }

  @media (max-width: ${commonTheme.media.tab}) {
    width: calc(100% - 90px);
    padding: 15px 0;
  }

  ${props => props.isEdited && `
    width: calc(100% - 70px);
  `}
`
const Title = styled.span<{ status: string }>`
  overflow: hidden;
  margin: 0 0 4px 0;

  font-family: ${commonTheme.fonts.Inter};
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 600;
  font-size: 12.5px;
  color: ${props => props.theme.SENARY_BACKGROUND_COLOR};

  span {
    color: ${props => props.theme.SUCCESS_TODO_COLOR};
  }

  .todo:hover & {
    opacity: .3;
  }

  @media (max-width: ${commonTheme.media.tab}) {
    font-size: ${commonTheme.fontSizes.r};
  }

  ${props => props.status === TodoStatusEnum.FINISHED && `
    text-decoration: line-through ;
    color: ${props.theme.SUCCESS_TODO_COLOR2};
  `}
`
const Text = styled.span`
  font-size: 10px;
  font-weight: 500;
  color: ${props => props.theme.QUATERNARY_BACKGROUND_COLOR};

  .todo:hover & {
    opacity: .3;
  }

  @media (max-width: ${commonTheme.media.tab}) {
    font-size: 12px;
  }
`
const Button = styled.button`
  align-items: center;
  justify-content: center;
  width: 40px;
  height: auto;

  @media (max-width: ${commonTheme.media.tab}) {
    font-size: 16px;
  }
`
const Remove = styled(Button)`
  display: none;
  color: #ff0026;

  @media (max-width: ${commonTheme.media.tab}) {
    display: flex;
  }
`
const Edit = styled(Button)<{ isEdited: boolean }>`
  display: none;
  color: ${props => props.theme.SUCCESS_TODO_COLOR2};

  @media (max-width: ${commonTheme.media.tab}) {
    display: flex;
  }

  ${props => props.isEdited && `
    color: red;
  `}
`
