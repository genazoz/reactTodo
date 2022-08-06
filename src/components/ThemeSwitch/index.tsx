import React, {FC} from 'react';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';

import {darkTheme, lightTheme, partyTheme} from '../../themes';
import {setTheme, themeSelector} from '../../features/themeSlice';

let activeTheme = 0;
const themes = [
  darkTheme,
  lightTheme,
]

const StyledButton = styled.button`
  position: relative;

  width: 40px;
  height: 40px;
  padding: 1px 0 0 0;

  font-size: 21px;
  color: ${props => props.theme.THEME_SWITCHER_COLOR};

  cursor: pointer;
  border: 0px;
  border-radius: 50%;
  background: ${props => props.theme.THEME_SWITCHER_BACKGROUND};
  box-shadow: none;
`;

export const ThemeSwitch: FC = () => {
  const dispatch = useDispatch();
  const {theme} = useSelector(themeSelector);

  const toggleTheme = () => {
    activeTheme = !themes[activeTheme + 1] ? 0 : ++activeTheme;
    dispatch(setTheme(themes[activeTheme]));
  }

  return <StyledButton onClick={() => toggleTheme()}>
    {theme.name === 'dark' ? (<i className="fa fa-sun"></i>) : (<i className="fa fa-moon"></i>)}
  </StyledButton>
}
