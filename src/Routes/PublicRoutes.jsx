import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from '../Components/Layout';
import TaskList from '../Pages/TaskList';

const PublicRoutes = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<TaskList />} />
      </Routes>
    </Layout>
  );
};

export default PublicRoutes;
