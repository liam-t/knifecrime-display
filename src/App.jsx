import React from 'react';
import styled from 'styled-components';
import RegionGraph from 'components/RegionGraph.jsx';
import data from 'data/data.json';
import GlobalStyle from 'globalStyle';

function App() {
  const [selectedRegion] = React.useState('London');
  const selectedRegionData = data.knifeCrimeDataPointsByRegion.find(({ name }) => (
    name === selectedRegion
  ));
  return (
    <AppWrap>
      <Title>{selectedRegion}</Title>
      <Subtitle>Knife crime over time</Subtitle>
      <GraphWrap>
        <RegionGraph data={selectedRegionData} />
      </GraphWrap>
      <GlobalStyle />
    </AppWrap>
  );
}

export default App;

const AppWrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1 1 auto;
  background-color: #ffd;
  padding: 20px;
  @media screen and (min-width: 768px) {
    padding: 40px;
  }
`;

const Title = styled.h1`
  margin: 0;
  font-size: 3rem;
  font-weight: 900;
`;

const Subtitle = styled.h2`
  margin: 0;
  font-size: 2rem;
  font-weight: 400;
`;

const GraphWrap = styled.div`
  max-width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  align-items: center;
`;
