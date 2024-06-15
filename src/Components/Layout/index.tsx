import React, { FunctionComponent, ReactElement } from 'react';
import Container from '@mui/material/Container';
import Header from './Header';
import { FooProps } from '../../Shared/Interfaces/taskList.interface';

const Layout: FunctionComponent<FooProps> = ({ children }) => {
  return (
    <div>
      <Header />
      <Container maxWidth="lg">
        <div>{children}</div>
      </Container>
    </div>
  );
};

export default Layout;
