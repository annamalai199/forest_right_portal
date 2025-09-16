import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { UserDashboard } from '@/components/dashboards/UserDashboard';
import { OfficerDashboard } from '@/components/dashboards/OfficerDashboard';
import { AdminDashboard } from '@/components/dashboards/AdminDashboard';

export const Dashboard = () => {
  const { user } = useAuth();

  if (!user) return null;

  const renderDashboard = () => {
    switch (user.role) {
      case 'user':
        return <UserDashboard />;
      case 'officer':
        return <OfficerDashboard />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <UserDashboard />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="container mx-auto px-4 py-8"
    >
      {renderDashboard()}
    </motion.div>
  );
};