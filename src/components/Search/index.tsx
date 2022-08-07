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
  padding: 0 15px 0 10px;

  border-radius: 18px;
  background: ${props => props.theme.TERTIARY_BACKGROUND_COLOR};

  i {
    padding: 7px 3px 7px 7px;

    font-size: 12px;
    color: ${props => props.theme.QUINARY_BACKGROUND_COLOR};
  }
`
const SearchEl = styled.input`
  display: flex;
  width: 100%;

  color: #FFFFFF;

  font-family: ${commonTheme.fonts.Inter};

  &::placeholder {
    color: ${props => props.theme.QUINARY_BACKGROUND_COLOR};
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
      <SearchEl placeholder={'Поиск...'} value={searchQuery} onChange={(e) => onSearchChange(e)}>
      </SearchEl>
    </Wrapper>
  );
};
