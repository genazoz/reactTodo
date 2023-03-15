import React, {useState} from 'react';
import styled from "styled-components";
import {commonTheme} from "../../themes";
import {Sidebar, TodosList} from "../../components";
import TodoEditor from "../../components/TodoEditor";

const mobGap = 30;
const paddingYTop = 50;
const paddingYBottom = 30;

function Todo() {
  const [isResizing, setIsResizing] = useState(false);

  return (
    <Section data-testid={'main-page'}>
      <Aside isResizing={isResizing}>
        <Sidebar isResizing={isResizing} setIsResizing={setIsResizing} resizable>
          <TodosList/>
        </Sidebar>
      </Aside>
      <Content isResizing={isResizing}>
        <BackdropBlur isResizing={isResizing}/>
        <TodoEditor/>
      </Content>
    </Section>
  );
}

export default Todo;

const Section = styled.section`
  display: flex;
  flex-direction: row;
  height: 100%;
  max-height: 900px;
  flex: 1;
  margin: auto 0;
  padding: 0 0 1px var(--unit);

  @media (max-width: ${commonTheme.media.tab}) {
    flex-direction: column-reverse;
    justify-content: flex-end;
    gap: 30px;
    height: 100vh;
    max-height: unset;
    padding: ${paddingYTop}px var(--unit) ${paddingYBottom}px var(--unit)
  }
`
const Aside = styled.div<{ isResizing: boolean }>`
  transition: .3s transform;

  @media(max-width: ${commonTheme.media.tab}) {
    display: flex;
    height: inherit;
    max-height: calc(100vh - ${(paddingYTop + paddingYBottom)}px - ${mobGap}px - 133px);
    min-height: 250px;
  }
  
  ${(props) => props.isResizing && `
    transform: scale(.97);
  `} 
`
const Content = styled.div<{ isResizing: boolean }>`
  position: relative;

  display: flex;
  flex-direction: column;
  flex: 1;

  padding: 30px var(--unit) 60px 40px;

  transition: .3s transform;

  @media (max-width: ${commonTheme.media.tab}) {
    flex: unset;
    height: 50%;
    padding: 0;
    margin: 0;
  }

  ${(props) => props.isResizing && `
    cursor: col-resize;
    transform: scale(.97);
  `}
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
  backdrop-filter: blur(17px);

  transition: .3s all;

  ${(props) => props.isResizing && `
    opacity: 1;
    
    pointer-events: all;
  `}
`
