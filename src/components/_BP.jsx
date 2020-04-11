import React from 'react';
import PT from 'prop-types';
import styled from 'styled-components';

const propTypes = {};

const Boilerplate = () => {
  return (
    <BoilerplateWrap>
      <p>Hi i&apos;m Boilerplate!</p>
    </BoilerplateWrap>
  );
};
Boilerplate.propTypes = propTypes;

export default Boilerplate;

const BoilerplateWrap = styled.div``;
