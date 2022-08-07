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
  color: #FFFFFF;

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
