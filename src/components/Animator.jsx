import React from 'react';
import PT from 'prop-types';
import styled from 'styled-components/macro';
import { interpolate as flubber } from 'flubber';
import { useSpring, animated } from 'react-spring';

const propTypes = {
  className: PT.string,
  path: PT.string.isRequired,
};
const defaultProps = {
  className: '',
};

const Animator = ({ className, path }) => {
  const [flubberPaths, setFlubberPaths] = React.useState([path, path]);

  React.useEffect(() => {
    setFlubberPaths((oldFlubberPaths) => [
      oldFlubberPaths[1], path,
    ]);
  }, [path]);

  const spring1 = useSpring({
    t: 1,
    from: { t: 0 },
    reset: true,
  });
  const flubberPath = flubber(...flubberPaths);
  return (
    <>
      <animated.path
        className={className}
        d={spring1.t.interpolate((t) => flubberPath(t))}
      />
    </>
  );
};
Animator.propTypes = propTypes;
Animator.defaultProps = defaultProps;

export default Animator;

// const AnimatorWrap = styled.div``;
