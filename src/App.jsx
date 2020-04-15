import React from 'react';
import styled from 'styled-components/macro';
import KnifeGraph from 'components/KnifeGraph';
import data from 'data/data.json';
import GlobalStyle from 'globalStyle';
import RegionSelector from 'components/RegionSelector';

function App() {
  const [selectedRegion, setSelectedRegion] = React.useState('London');
  const selectedRegionData = data.knifeCrimeDataPointsByRegion.find(({ name }) => (
    name === selectedRegion
  ));
  const onRegionChange = (name) => setSelectedRegion(name);
  return (
    <AppWrap>
      <Header>
        <Titling>
          <Title>{selectedRegion}</Title>
          <Subtitle>Knife crime incidents over time</Subtitle>
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
        <Decoration />
        <KnifeGraph
          activeData={selectedRegionData}
          allData={data.knifeCrimeDataPointsByRegion}
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
  background-color: #222;
  color: white;
  padding: 20px;
  overflow: hidden;
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
  color: black;
`;
const GraphWrap = styled.div`
  position: relative;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  align-items: center;
`;
const Decoration = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 40%;
  height: 0;
  padding-bottom: 40%;
  border-radius: 50%;
  background-color: #2b2b2b;
  transform: translate(-50%, -50%);
`;
