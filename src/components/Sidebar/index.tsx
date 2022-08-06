import React, {FC, useRef} from 'react';
import styled from "styled-components";
import {commonTheme} from "../../themes";

const SidebarWrapper = styled.div`
  position: relative;

  display: flex;
  width: 300px;
  min-width: 300px;
  max-width: 450px;
  height: auto;
  padding: 30px 35px 60px 0;

  cursor: auto;

  @media (max-width: ${commonTheme.media.tab}) {
    width: 100% !important;
    max-width: 100%;
    padding: 0;
    margin: 0px 0 50px 0;
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

type SidebarPropsType = {
  children: React.ReactNode;
  setIsResizing: (param: boolean) => void;
  resizable?: boolean;
}

export const Sidebar: FC<SidebarPropsType> = ({children, setIsResizing, resizable = false}) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

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
  const onMouseDownDivider = (e: any) => {
    e.preventDefault();

    setIsResizing(true);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', endDrag);
  }

  return (
    <>
      {
        resizable
          ? (
            <SidebarWrapper ref={sidebarRef} onMouseDown={(e) => e.stopPropagation()}>
              {children}
              <Divider ref={dividerRef} onMouseDown={(e) => onMouseDownDivider(e)}/>
            </SidebarWrapper>
          )
          : (
            <SidebarWrapper>
              {children}
            </SidebarWrapper>
          )
      }
    </>
  );
};
