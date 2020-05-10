import React from 'react';
import PT from 'prop-types';
import styled from 'styled-components/macro';
import Select from 'react-select';

const propTypes = {
  names: PT.arrayOf(PT.string).isRequired,
  onChange: PT.func.isRequired,
  selectedRegion: PT.string.isRequired,
};

const RegionSelector = ({ names, onChange, selectedRegion }) => {
  const options = names.map((name) => ({ value: name, label: name })).reverse();
  const handleChange = ({ value }) => onChange(value);
  return (
    <RegionSelectorWrap>
      <Select
        options={options}
        onChange={handleChange}
        isSearchable={false}
        value={{
          label: selectedRegion,
          value: selectedRegion,
        }}
      />
    </RegionSelectorWrap>
  );
};
RegionSelector.propTypes = propTypes;

export default RegionSelector;

const RegionSelectorWrap = styled.div``;
