import { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { motion } from 'framer-motion';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="pt-16"
      >
        {children}
      </motion.main>
    </div>
  );
};