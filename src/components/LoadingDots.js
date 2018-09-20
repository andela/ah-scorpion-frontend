import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';

const BounceAnimation = keyframes`
  0% { margin-bottom: 0; }
  50% { margin-bottom: 15px }
  100% { margin-bottom: 0 }
`;

const Dot = styled.div`
  background-color: black;
  border-radius: 50%;
  width: 6px;
  height: 6px;
  margin: 0 5px;

  /* Animation */
  animation: ${BounceAnimation} 1s linear infinite;
  animation-delay: ${props => props.delay};
`;

const DotWrapper = styled.div`
  display: flex;
  align-items: flex-end;
`;

class LoadingDots extends Component {
  render() {
    return (
      <DotWrapper>
        <span className="comment-loader">Loading Comments</span>
        <Dot delay="0s" />
        <Dot delay=".1s" />
        <Dot delay=".2s" />
      </DotWrapper>
    );
  }
}

export default LoadingDots;
