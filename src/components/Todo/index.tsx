import React, {FC} from 'react';
import styled from "styled-components";
import {useAppDispatch} from "../../app/store";
import {removeTodo, setStatus, TodoStatusEnum} from "../../features/todoSlice";
import {commonTheme} from "../../themes";

type TodoPropsType = {
  id: string;
  status: string;
  title: string;
  text: string;
}

const TodoEl = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  gap: 15px;

  cursor: pointer;

  transition: .05s opacity;

  &:nth-last-child(1) div {
    border: unset;
  }

  &:hover button {
    display: flex;
  }
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
`
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: calc(100% - 70px);
  margin: 0 auto 0 0;
  padding: 10px 0;
`
const Title = styled.span<{ status: string }>`
  overflow: hidden;
  margin: 0 0 4px 0;

  font-family: ${commonTheme.fonts.Inter};
  text-overflow: ellipsis;
  text-transform: capitalize;
  white-space: nowrap;
  font-weight: 500;
  font-size: 13px;
  color: ${props => props.theme.SENARY_BACKGROUND_COLOR};
  letter-spacing: .2px;

  .todo:hover & {
    opacity: .3;
  }

  @media (max-width: ${commonTheme.media.tab}) {
    font-size: 16px;
    letter-spacing: 0;
  }

  ${props => props.status === TodoStatusEnum.FINISHED && `
    text-decoration: line-through ;
    color: ${props.theme.SUCCESS_TODO_COLOR2};
  `}
`
const Text = styled.span`
  font-size: 11px;
  color: ${props => props.theme.QUATERNARY_BACKGROUND_COLOR};
  letter-spacing: .35px;

  .todo:hover & {
    opacity: .3;
  }
`
const Button = styled.button`
  align-items: center;  
  justify-content: center;
  width: 40px;
  height: auto;
`
const Remove = styled(Button)`
  display: none;
  color: #ff0026;
`
const Edit = styled(Button)`
  display: none;
  color: ${props => props.theme.SUCCESS_TODO_COLOR2};
`

export const Todo: FC<TodoPropsType> = ({id, status, title, text}) => {
  const dispatch = useAppDispatch();

  let statusList: TodoStatusEnum[] = [
    TodoStatusEnum.WAITING,
    TodoStatusEnum.PROGRESS,
    TodoStatusEnum.FINISHED
  ];

  const onClickTodo = () => {
    const currentStatus = statusList.findIndex(x => x === status);
    const newStatus = currentStatus === statusList.length - 1 ? statusList[0] : statusList[currentStatus + 1]
    dispatch(setStatus({id: id, status: newStatus}))
  }
  const onClickRemoveTodo = (e: any) => {
    e.stopPropagation();

    dispatch(removeTodo({id: id}))
  }
  const onClickEditTodo = (e: any) => {
    e.stopPropagation();
  }

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
    <TodoEl className={'todo'} onClick={() => onClickTodo()}>
      <IconWrapper status={status}>
        {getIcon()}
      </IconWrapper>
      <Container>
        <Wrapper>
          <Title status={status}>
            {title}
          </Title>
          <Text>
            {text}
          </Text>
        </Wrapper>
        <Edit onClick={(e) => onClickEditTodo(e)}>
          <i className="fal fa-pen" aria-hidden="true"></i>
        </Edit>
        <Remove onClick={(e) => onClickRemoveTodo(e)}>
          <i className="fal fa-minus" aria-hidden="true"></i>
        </Remove>
      </Container>
    </TodoEl>
  );
};
