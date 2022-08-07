import React, {FC} from 'react';
import {useAppDispatch} from "../../app/store";
import {useSelector} from "react-redux";
import {setEditQuery, todosSelector} from "../../features/todoSlice";
import styled from "styled-components";
import {commonTheme} from "../../themes";

const Textarea = styled.textarea`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 53px 60px;

  font-family: ${commonTheme.fonts.Inter};
  font-size: 25px;
  font-weight: 600;
  color: #FFFFFF;

  resize: none;
  outline: none;
  background-color: ${(props: any) => props.theme.SECONDARY_BACKGROUND_COLOR};
  border-radius: 40px;
  border: unset;

  &::placeholder {
    color: ${(props: any) => props.theme.TERTIARY_BACKGROUND_COLOR};
  }

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: ${commonTheme.media.tab}) {
    overflow-x: scroll; 
    height: 70px;
    padding: 25px 30px;

    font-size: 16px;

    resize: none;
    white-space: nowrap;
    border-radius: 25px;
  }
`

export const TodoEditorTextarea: FC = () => {
  const dispatch = useAppDispatch();
  const {editorQuery} = useSelector(todosSelector);

  const onTextareaInput = (e: any) => {
    dispatch(setEditQuery({query: e.target.value}))
  }

  return (
    <Textarea placeholder={'Введите текст'} value={editorQuery} onChange={(e) => onTextareaInput(e)}/>
  );
};
