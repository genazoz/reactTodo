import React, {FC} from 'react';
import styled from "styled-components";
import {Link, useLocation} from "react-router-dom";
import {ThemeSwitch} from "../ThemeSwitch";

const HeaderEl = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 var(--unit) 0 var(--unit);
`
const Wrapper = styled.div`
  display: flex;
  gap: 40px;
  align-items: center;
  justify-content: space-between;
  width: max-content;
  height: 80px;
  padding: 0 20px 0 40px;

  border-radius: 0 0 30px 30px;
  background: ${props => props.theme.SECONDARY_BACKGROUND_COLOR};
`
const Nav = styled.nav`
  display: flex;
  gap: 20px;
`
const LinkItem = styled.a<{isActive?: boolean}>`
  font-size: 20px;
  font-weight: 500;
  
  ${props => props.isActive && `
    color: ${props.theme.LINK_COLOR_A};
    border-bottom: 2px solid ${props.theme.LINK_COLOR_A};
  `}
`

export const Header: FC = () => {
  const location = useLocation();

  return (
    <HeaderEl>
      <Wrapper>
        <Nav>
          <LinkItem as={Link} to={'/'} isActive={location.pathname === `/`}>Home</LinkItem>
          <LinkItem as={Link} to={'/todo'} isActive={location.pathname === `/todo`}>Todo</LinkItem>
        </Nav>
        <ThemeSwitch/>
      </Wrapper>
    </HeaderEl>
  );
};
