import React, {useState} from 'react';
import styled from "styled-components";
import {commonTheme} from "../../themes";
import avatarSrc from "../../images/avatar.jpeg";
import {addTodo, TodoStatusEnum} from "../../features/todoSlice";
import {useAppDispatch} from "../../app/store";

const Textarea = styled.textarea`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 40px 50px;

  font-family: ${commonTheme.fonts.Inter};
  font-size: 25px;
  color: ${(props: any) => props.theme.QUATERNARY_BACKGROUND_COLOR};

  resize: none;
  outline: none;
  background-color: ${(props: any) => props.theme.SECONDARY_BACKGROUND_COLOR};
  border-radius: 40px;
  border: unset;

  &::placeholder {
    color: ${(props: any) => props.theme.TERTIARY_BACKGROUND_COLOR};
  }

  @media (max-width: ${commonTheme.media.tab}) {
    height: 400px;
    padding: 25px;

    font-size: 25px;
    
    border-radius: 25px;
  }
`
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
const Button = styled.button<{ isDisabled: boolean }>`
  display: flex;
  align-items: center;
  padding: 12px 17px 12px 20px;

  font-family: ${commonTheme.fonts.Inter};
  font-size: 13px;
  font-weight: 500;
  letter-spacing: .3px;
  color: ${props => props.theme.THEME_BUTTON_COLOR_A};

  border-radius: 14px;
  cursor: pointer;
  background: ${props => props.theme.THEME_BUTTON_BACKGROUND_A};

  i {
    margin: 1px 10px 0 0;

    font-size: 16px;
  }

  ${(props) => props.isDisabled && `
    pointer-events: none;
    background: ${props.theme.SECONDARY_BACKGROUND_COLOR};
  `}
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

const TodoEditor = () => {
  const dispatch = useAppDispatch();
  const [inputValue, setInputValue] = useState('');

  const onTextareaInput = (e: any) => {
    setInputValue(e.target.value);
  }
  const onClickAddTodo = () => {
    const todo = {
      id: new Date().getTime().toString(),
      status: TodoStatusEnum.WAITING,
      title: inputValue,
      text: 'Frontend Todo'
    }

    dispatch(addTodo({todo: todo}))
    setInputValue('');
  }

  return (
    <>
      <Header>
        <Title>Frontend Todos</Title>
        <Buttons>
          <Button isDisabled={inputValue.length < 4} onClick={onClickAddTodo}>
            <i className="far fa-plus" aria-hidden="true"></i>
            Добавить
          </Button>
          <BellButton>
            <i className="fal fa-bell" aria-hidden="true"></i>
          </BellButton>
          <Avatar/>
        </Buttons>
      </Header>
      <Textarea placeholder={'Введите текст todo'} value={inputValue} onChange={(e) => onTextareaInput(e)}/>
    </>
  );
};

export default TodoEditor;