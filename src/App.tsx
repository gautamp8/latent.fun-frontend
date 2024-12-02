import React from 'react';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { SubmissionForm } from './components/SubmissionForm';
import { PerformanceList } from './components/PerformanceList';
import { EarningsTab } from './components/EarningsTab';
import { PerformanceDetail } from './components/PerformanceDetail';
import { useStore } from './store/useStore';

function App() {
  const { activeTab, selectedPerformanceId } = useStore();

  return (
    <div className="min-h-screen bg-gray-950">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-24">
        {selectedPerformanceId ? (
          <PerformanceDetail />
        ) : (
          <>
            {activeTab === 'home' && <PerformanceList />}
            {activeTab === 'upload' && <SubmissionForm />}
            {activeTab === 'earnings' && <EarningsTab />}
          </>
        )}
      </main>
      <Navigation />
    </div>
  );
}

export default App;