import React, {useState} from 'react';
import styled from "styled-components";
import {commonTheme} from "../themes";
import {Sidebar, TodoList} from "../components/";
import TodoEditor from "../components/TodoEditor";

const Section = styled.section`
  display: flex;
  flex-direction: row;
  height: 100%;
  max-height: 800px;
  flex: 1;
  margin: auto 0;
  padding: 0 0 0 var(--unit);

  @media (max-width: ${commonTheme.media.tab}) {
    flex-direction: column;
    padding: 0 var(--unit);
  }
`
const Content = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  flex: 1;

  padding: 30px var(--unit) 60px 35px;

  @media (max-width: ${commonTheme.media.tab}) {
    padding: 0;
    margin: 0 0 24px 0;
  }
`
const BackdropBlur = styled.div<{ isResizing: boolean }>`
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  opacity: 0;
  pointer-events: none;
  backdrop-filter: blur(20px);

  transition: .2s all;

  ${(props) => props.isResizing && `
    opacity: 1;
    
    pointer-events: all;
  `}
`

function Todo() {
  const [isResizing, setIsResizing] = useState(false);

  return (
    <Section>
      <Sidebar setIsResizing={setIsResizing} resizable>
        <TodoList/>
      </Sidebar>
      <Content>
        <BackdropBlur isResizing={isResizing}/>
        <TodoEditor/>
      </Content>
    </Section>
  );
}

export default Todo;