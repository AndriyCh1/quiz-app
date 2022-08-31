import React from 'react';

import Helmet from '../components/helmet';
import Container from '../components/container';
import Wrapper from '../components/wrapper';

const InDevelopment = () => {
  return (
    <Helmet title="This feature is not yet implemented...">
      <Container className="in-development">
        <Wrapper className="in-development-wrapper">
          <strong>This feature is not yet implemented...</strong>
        </Wrapper>
      </Container>
    </Helmet>
  );
};

export default InDevelopment;
