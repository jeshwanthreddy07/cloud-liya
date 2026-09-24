import React, { useState } from 'react';
import { useScholar } from './context/ScholarContext';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { Toast } from './components/common/Toast';
import { LoginPage } from './components/auth/LoginPage';

// Pages
import { DashboardPage } from './components/pages/DashboardPage';
import { MarksPage } from './components/pages/MarksPage';
import { LeavePage } from './components/pages/LeavePage';
import { EnrollmentPage } from './components/pages/EnrollmentPage';
import { StudentInfoPage } from './components/pages/StudentInfoPage';
import { ExamSchedulePage } from './components/pages/ExamSchedulePage';
import { FeePage } from './components/pages/FeePage';
import { CurriculumPage } from './components/pages/CurriculumPage';
import { SettingsPage } from './components/pages/SettingsPage';

// Mobile bottom bar icons
import { LayoutDashboard, Award, CalendarDays, BookOpenCheck, UserCircle2 } from 'lucide-react';

export const AppContent: React.FC = () => {
  const { isAuthenticated, activePage, setActivePage } = useScholar();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  if (!isAuthenticated) {
    return (
      <>
        <LoginPage />
        <Toast />
      </>
    );
  }

  const renderActivePage = () => {
    switch (activePage) {
      case 'dashboard':
        return <DashboardPage />;
      case 'marks':
        return <MarksPage />;
      case 'leaves':
        return <LeavePage />;
      case 'enrollment':
        return <EnrollmentPage />;
      case 'info':
        return <StudentInfoPage />;
      case 'exams':
      case 'hall-tickets':
        return <ExamSchedulePage />;
      case 'fees':
        return <FeePage />;
      case 'curriculum':
        return <CurriculumPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] dark:bg-slate-950 text-[#1F2937] dark:text-slate-100 flex flex-col antialiased transition-colors duration-200">
      
      <div className="flex flex-1">
        {/* Sidebar (Desktop Persistent & Mobile Drawer) */}
        <Sidebar 
          isMobileOpen={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          
          {/* Top Header */}
          <Header 
            onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)} 
          />

          {/* Dynamic Page Content */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto pb-24 lg:pb-8">
            {renderActivePage()}
          </main>

        </div>
      </div>

      {/* Mobile Bottom Navigation Bar (replicates Scholar Mobile App feel) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-gray-200 dark:border-slate-800 px-3 py-2 flex items-center justify-around no-print shadow-lg">
        <button
          onClick={() => setActivePage('dashboard')}
          className={`flex flex-col items-center py-1 px-2 rounded-xl text-[10px] font-semibold transition-colors ${
            activePage === 'dashboard' 
              ? 'text-primary-600 dark:text-primary-400 font-bold' 
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-900'
          }`}
        >
          <LayoutDashboard className="w-5 h-5 mb-0.5" />
          <span>Home</span>
        </button>

        <button
          onClick={() => setActivePage('marks')}
          className={`flex flex-col items-center py-1 px-2 rounded-xl text-[10px] font-semibold transition-colors ${
            activePage === 'marks' 
              ? 'text-primary-600 dark:text-primary-400 font-bold' 
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-900'
          }`}
        >
          <Award className="w-5 h-5 mb-0.5" />
          <span>Marks</span>
        </button>

        <button
          onClick={() => setActivePage('leaves')}
          className={`flex flex-col items-center py-1 px-2 rounded-xl text-[10px] font-semibold transition-colors ${
            activePage === 'leaves' 
              ? 'text-primary-600 dark:text-primary-400 font-bold' 
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-900'
          }`}
        >
          <CalendarDays className="w-5 h-5 mb-0.5" />
          <span>Leaves</span>
        </button>

        <button
          onClick={() => setActivePage('enrollment')}
          className={`flex flex-col items-center py-1 px-2 rounded-xl text-[10px] font-semibold transition-colors ${
            activePage === 'enrollment' 
              ? 'text-primary-600 dark:text-primary-400 font-bold' 
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-900'
          }`}
        >
          <BookOpenCheck className="w-5 h-5 mb-0.5" />
          <span>Courses</span>
        </button>

        <button
          onClick={() => setActivePage('info')}
          className={`flex flex-col items-center py-1 px-2 rounded-xl text-[10px] font-semibold transition-colors ${
            activePage === 'info' 
              ? 'text-primary-600 dark:text-primary-400 font-bold' 
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-900'
          }`}
        >
          <UserCircle2 className="w-5 h-5 mb-0.5" />
          <span>Profile</span>
        </button>
      </nav>

      {/* Floating Toast Notification */}
      <Toast />

    </div>
  );
};

export default AppContent;
