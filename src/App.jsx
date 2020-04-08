import React from 'react';
import styled from 'styled-components';
import RegionGraph from './components/RegionGraph.jsx';
import data from './data/data.json';

function App() {
  const londonRegion = data.knifeCrimeDataPointsByRegion.find(({ name }) => name === 'London');
  return (
    <AppWrap>
      <RegionGraph name="London" data={londonRegion} />
    </AppWrap>
  );
}

export default App;

const AppWrap = styled.div`
  background-color: #ffd;
`;
