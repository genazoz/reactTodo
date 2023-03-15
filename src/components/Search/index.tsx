import React, {FC} from 'react';
import styled from "styled-components";
import {commonTheme} from "../../themes";


type SearchPropsType = {
  searchQuery: string,
  onSearchChange: (e: any) => void;
  "data-testid"?: string
}

export const Search: FC<SearchPropsType> = ({searchQuery, onSearchChange, ...rest}) => {
  return (
    <Wrapper>
      <i className="far fa-search" aria-hidden="true"></i>
      <SearchEl {...rest} placeholder={'Поиск...'} value={searchQuery} onChange={(e) => onSearchChange(e)}>
      </SearchEl>
    </Wrapper>
  );
};

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

  @media (max-width: ${commonTheme.media.tab}) {
    height: 50px;
  }

  i {
    padding: 7px 3px 7px 7px;

    font-size: 13px;
    color: ${props => props.theme.QUATERNARY_BACKGROUND_COLOR};

    @media (max-width: ${commonTheme.media.tab}) {
      font-size: ${commonTheme.fontSizes.s};
    }
  }
`
const SearchEl = styled.input`
  display: flex;
  width: 100%;

  color: #FFFFFF;

  font-family: ${commonTheme.fonts.Inter};
  font-size: 13px;
  font-weight: 600;

  &::placeholder {
    color: ${props => props.theme.QUATERNARY_BACKGROUND_COLOR};
  }

  @media (max-width: ${commonTheme.media.tab}) {
    font-size: ${commonTheme.fontSizes.r};
    font-weight: 500;
  }
`