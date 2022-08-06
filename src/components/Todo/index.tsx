import React, {FC} from 'react';
import styled from "styled-components";

const TodoEl = styled.div`
  display: flex;
  gap: 15px;
`
const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;

  border-radius: 12px;
  border: 1px solid ${props => props.theme.QUATERNARY_BACKGROUND_COLOR};
`
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`
const Title = styled.span`
  margin: 0 0 4px 0;

  font-weight: 500;
  font-size: 12px;
  color: ${props => props.theme.THEME_SWITCHER_BACKGROUND};
  letter-spacing: .2px;
`
const Text = styled.span`
  font-size: 10px;
  color: ${props => props.theme.QUATERNARY_BACKGROUND_COLOR};
  letter-spacing: .35px;
`

type TodoPropsType = {
  completed: string;
  title: string;
  text: string;
}

export const Todo: FC<TodoPropsType> = ({completed, title, text}) => {
  return (
    <TodoEl>
      <IconWrapper>
        <i className="fal fa-times" aria-hidden="true"></i>
      </IconWrapper>
      <Wrapper>
        <Title>
          {title}
        </Title>
        <Text>
          {text}
        </Text>
      </Wrapper>
    </TodoEl>
  );
};
