import React from 'react';
import styled from 'styled-components';
import RegionGraph from 'components/RegionGraph.jsx';
import data from 'data/data.json';
import GlobalStyle from 'globalStyle';
import RegionSelector from 'components/RegionSelector';

function App() {
  const [selectedRegion, setSelectedRegion] = React.useState('London');
  const [isDecorativeGraph] = React.useState(true);
  const selectedRegionData = data.knifeCrimeDataPointsByRegion.find(({ name }) => (
    name === selectedRegion
  ));
  const onRegionChange = (name) => setSelectedRegion(name);
  return (
    <AppWrap>
      <Header>
        <Titling>
          <Title>{selectedRegion}</Title>
          <Subtitle>Knife crime over time</Subtitle>
        </Titling>
        <RegionSelectorWrap>
          <RegionSelector
            names={data.knifeCrimeDataPointsByRegion.map(({ name }) => name)}
            onChange={onRegionChange}
            selectedRegion={selectedRegion}
          />
        </RegionSelectorWrap>
      </Header>
      <GraphWrap>
        <RegionGraph
          data={selectedRegionData}
          decoratve={isDecorativeGraph}
        />
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
const Header = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 10px;
`;
const Titling = styled.div``;
const Title = styled.h1`
  margin: 0;
  font-size: 3rem;
  font-weight: 900;
  line-height: 1.2em;
`;
const Subtitle = styled.h2`
  margin: 0;
  font-size: 2rem;
  font-weight: 400;
  line-height: 1.2em;
`;
const RegionSelectorWrap = styled.div`
  width: 10em;
  max-width: 100%;
`;
const GraphWrap = styled.div`
  max-width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  align-items: center;
`;
