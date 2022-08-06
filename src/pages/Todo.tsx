import React, {useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import {commonTheme} from "../themes";
import avatarSrc from "../images/avatar.jpeg"
import {TodoList} from "../components/";

const Section = styled.section`
  display: flex;
  flex-direction: row;
  height: 100%;
  flex: 1;
  padding: 0 0 0 var(--unit);

  @media (max-width: ${commonTheme.media.tab}) {
    flex-direction: column;
    padding: 0 var(--unit);
  }
`
const Sidebar = styled.div`
  position: relative;

  display: flex;
  width: 300px;
  min-width: 300px;
  max-width: 450px;
  height: auto;
  padding: 60px 35px 60px 0;

  cursor: auto;

  @media (max-width: ${commonTheme.media.tab}) {
    width: 100%;
    max-width: 100%;
    padding: 0;
    margin: 40px 0 50px 0;
  }
`
const Divider = styled.div`
  position: absolute;
  z-index: 2;
  top: 0;
  right: -20px;

  display: flex;
  width: 40px;
  height: 100%;
  cursor: col-resize;

  opacity: .5;

  &::before {
    content: '';

    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    width: 7px;
    height: 30px;
    margin: auto;

    background: ${props => props.theme.SECONDARY_BACKGROUND_COLOR};
    border-radius: 10px;
  }

  @media (max-width: ${commonTheme.media.tab}) {
    display: none;
  }
`
const Content = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  flex: 1;

  padding: 60px var(--unit) 60px 35px;

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
const Textarea = styled.input`
  display: flex;
  width: 100%;
  height: 100%;

  background-color: ${(props: any) => props.theme.SECONDARY_BACKGROUND_COLOR};
  border-radius: 40px;
  border: unset;

  @media (max-width: ${commonTheme.media.tab}) {
    height: 500px;
  }
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px 0;

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
const Button = styled.button`
  display: flex;
  align-items: center;
  padding: 12px 17px 12px 20px;

  font-size: ${commonTheme.fontSizes.s};
  font-weight: 500;
  letter-spacing: .3px;
  color: ${props => props.theme.THEME_BUTTON_COLOR_A};

  border-radius: 14px;
  cursor: pointer;
  background: ${props => props.theme.THEME_BUTTON_BACKGROUND_A};

  i {
    margin: 0 10px 0 0;

    font-size: 17.5px;
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

function Todo() {
  const [isResizing, setIsResizing] = useState(false);

  const dividerRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const onMouseDownDivider = (e: any) => {
    e.preventDefault();

    setIsResizing(true);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', endDrag);
  }
  const drag = (event: any) => {
    const sidebar = sidebarRef.current;

    if (!sidebar)
      return;

    const mouseX = event.clientX;
    const sidebarLeft = sidebar.getBoundingClientRect().left;
    sidebar.style.width = `${mouseX - sidebarLeft}px`;
  };
  const endDrag = () => {
    setIsResizing(false);
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', endDrag);
  };

  return (
    <Section>
      <Sidebar ref={sidebarRef} onMouseDown={(e) => e.stopPropagation()}>
        <TodoList/>
        <Divider ref={dividerRef} onMouseDown={(e) => onMouseDownDivider(e)}/>
      </Sidebar>
      <Content>
        <BackdropBlur isResizing={isResizing}/>
        <Header>
          <Title>React Todo</Title>
          <Buttons>
            <Button>
              <i className="far fa-plus" aria-hidden="true"></i>
              New Task
            </Button>
            <BellButton>
              <i className="fal fa-bell" aria-hidden="true"></i>
            </BellButton>
            <Avatar/>
          </Buttons>
        </Header>
        <Textarea/>
      </Content>
    </Section>
  );
}

export default Todo;