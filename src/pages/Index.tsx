// This page redirects to login since we have role-based authentication
import { Navigate } from 'react-router-dom';

const Index = () => {
  return <Navigate to="/login" replace />;
};

export default Index;
