import React from 'react';
import styled from "styled-components";
import {commonTheme} from "../themes";
import {Link} from "react-router-dom";

const Section = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100%;
  flex: 1;
  padding: 110px var(--unit);
`
const Title = styled.h1`
  margin: 0 0 15px 0;
    
  font-size: 80px;
  font-weight: 500;
  letter-spacing: 1px;
  text-align: center;

  @media (max-width: ${commonTheme.media.tab}) {
    font-size: 60px;
  }
`
const Button = styled.button`
  display: flex;
  align-items: center;
  width: max-content;
  padding: 12px 20px;
  
  font-size: ${commonTheme.fontSizes.s};
  font-weight: 500;
  letter-spacing: .3px;
  color: ${props => props.theme.THEME_BUTTON_COLOR_A};
  
  border-radius: 13px;
  cursor: pointer;
  background: ${props => props.theme.THEME_BUTTON_BACKGROUND_A};
  
  i {
    margin: 0 0 0 10px;

    font-size: 14px;
  }
`
const EmptyBlock = styled.div`
  width: 100%;
  height: 1000px;
  margin: 60px 0 0 0;

  border-radius: 70px;
  background: ${props => props.theme.SECONDARY_BACKGROUND_COLOR};

  @media (max-width: ${commonTheme.media.tab}) {
    border-radius: 40px;
  }
`

function Home() {
  return (
    <Section>
      <Title>React Todo</Title>
      <Button as={Link} to={'/todo'}>
        Enter
        <i className="far fa-arrow-right" aria-hidden="true"></i>
      </Button>
      <EmptyBlock />
    </Section>
  );
}

export default Home;