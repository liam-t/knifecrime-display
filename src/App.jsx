import React from 'react';
import styled from 'styled-components';
import 'index.css';
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
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  justify-content: center;
  align-items: center;
`;
