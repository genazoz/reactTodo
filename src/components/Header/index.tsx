import React, {FC} from 'react';
import styled from "styled-components";
import {Link, useLocation} from "react-router-dom";
import {ThemeSwitch} from "../ThemeSwitch";
import {commonTheme} from "../../themes";

const HeaderEl = styled.header`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 0 var(--unit) 0 var(--unit);
`
const Wrapper = styled.div`
  display: flex;
  gap: 40px;
  align-items: center;
  justify-content: space-between;
  width: max-content;
  height: 100px;
  //padding: 0 20px 0 40px;
  padding: 0 20px;
  
  border-radius: 0 0 30px 30px;
  // background: ${props => props.theme.SECONDARY_BACKGROUND_COLOR};

  @media (max-width: ${commonTheme.media.tab}) {
    width: 100%;
    padding: 0 15px;
    
    background: transparent;
  }
`
const Nav = styled.nav`
  display: flex;
  gap: 20px;
`
const LinkItem = styled.span<{isActive?: boolean}>`
  font-family: ${commonTheme.fonts.Inter};
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
          <Link to={'/'}>
            <LinkItem isActive={location.pathname === `/`}>
              Главная
            </LinkItem>
          </Link>
          <Link to={'/todo'}>
            <LinkItem isActive={location.pathname === `/todo`}>
              Todo
            </LinkItem>
          </Link>
        </Nav>
        <ThemeSwitch/>
      </Wrapper>
    </HeaderEl>
  );
};
