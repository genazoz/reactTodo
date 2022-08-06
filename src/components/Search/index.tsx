import React, {FC} from 'react';
import styled from "styled-components";
import {commonTheme} from "../../themes";

const Wrapper = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  height: 45px;
  margin: 0 0 20px 0;
  padding: 0 15px 0 10px;

  border-radius: 13px;
  background: ${props => props.theme.TERTIARY_BACKGROUND_COLOR};

  i {
    padding: 7px;

    border-radius: 7px;
    font-size: 12px;
    color: ${props => props.theme.THEME_BUTTON_COLOR_A};
    background: ${props => props.theme.THEME_BUTTON_BACKGROUND_A};
  }
`
const SearchEl = styled.input`
  display: flex;
  width: 100%;

  color: #FFFFFF;

  font-family: ${commonTheme.fonts.Inter};

  &::placeholder {
    color: rgba(255, 255, 255, .6);
  }
`

type SearchPropsType = {
  searchQuery: string,
  onSearchChange: (e: any) => void;
}

export const Search: FC<SearchPropsType> = ({searchQuery, onSearchChange}) => {
  return (
    <Wrapper>
      <i className="far fa-search" aria-hidden="true"></i>
      <SearchEl placeholder={'Фильтр todo...'} value={searchQuery} onChange={(e) => onSearchChange(e)}>
      </SearchEl>
    </Wrapper>
  );
};
