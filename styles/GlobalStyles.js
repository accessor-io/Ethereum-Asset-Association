import React from 'react';
import { Global } from '@emotion/react';

const GlobalStyles = () => (
  <Global
    styles={{
      'html, body': {
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
      },
    }}
  />
);

export default GlobalStyles; 