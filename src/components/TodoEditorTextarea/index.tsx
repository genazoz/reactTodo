import React, {FC} from 'react';
import {useAppDispatch} from "../../app/store";
import {useSelector} from "react-redux";
import {setEditQuery, todosSelector} from "../../features/todoSlice/todoSlice";
import styled from "styled-components";
import {commonTheme} from "../../themes";

export const TodoEditorTextarea: FC = () => {
  const dispatch = useAppDispatch();
  const {editorQuery} = useSelector(todosSelector);

  const onTextareaInput = (e: any) => {
    dispatch(setEditQuery({query: e.target.value}))
  }

  return (
    <Wrapper>
      <i className="fa fa-pen" aria-hidden="true"></i>
      <Textarea
        data-testid={'todo-editor-textarea'}
        placeholder={'Введите текст...'}
        value={editorQuery}
        onChange={(e) => onTextareaInput(e)}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
  height: 100%;
  padding: 53px 60px;

  background-color: ${(props: any) => props.theme.SECONDARY_BACKGROUND_COLOR};
  border-radius: 40px;
  
  i {
    margin: 6px 0 0 0;
    
    color:  ${props => props.theme.BACKGROUND_COLOR};
  }

  @media (max-width: ${commonTheme.media.tab}) {
    gap: 15px;
    padding: 0 20px;

    background-color: ${(props: any) => props.theme.TERTIARY_BACKGROUND_COLOR};
    border-radius: 18px;

    i {
      margin: auto;
      color: ${(props: any) => props.theme.QUATERNARY_BACKGROUND_COLOR};
    }
  }
`
const Textarea = styled.textarea`
  display: flex;
  width: 100%;
  height: 100%;

  font-family: ${commonTheme.fonts.Inter};
  font-size: 25px;
  font-weight: 600;
  color: #FFFFFF;

  resize: none;
  outline: none;
  border: unset;
  background-color: transparent;

  &::placeholder {
    color: ${(props: any) => props.theme.TERTIARY_BACKGROUND_COLOR};
  }

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: ${commonTheme.media.tab}) {
    overflow-x: scroll; 
    height: 50px;
    padding: 16px 0 0 0 ;

    font-size: 15px;
    font-weight: 500;

    resize: none;
    white-space: nowrap;

    &::placeholder {
      color: ${(props: any) => props.theme.QUATERNARY_BACKGROUND_COLOR};
    }
  }
`
