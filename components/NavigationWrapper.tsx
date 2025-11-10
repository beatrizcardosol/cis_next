import React, { useState } from 'react';
import { LoginPage } from './LoginPage';
import { Dashboard } from './Dashboard';
import { Questionnaire } from './Questionnaire';
import { ReportPage } from './ReportPage';
import { Toaster } from './ui/sonner';

export function NavigationWrapper() {
  const [currentPage, setCurrentPage] = useState<'login' | 'dashboard' | 'questionnaire' | 'report'>('login');

  const handleNavigation = (page: string) => {
    setCurrentPage(page as any);
  };

  const handleLogin = () => {
    setCurrentPage('dashboard');
  };

  return (
    <>
      {currentPage === 'login' && <LoginPage onLogin={handleLogin} />}
      {currentPage === 'dashboard' && <Dashboard onNavigate={handleNavigation} />}
      {currentPage === 'questionnaire' && <Questionnaire onNavigate={handleNavigation} />}
      {currentPage === 'report' && <ReportPage onNavigate={handleNavigation} />}
      <Toaster />
    </>
  );
}