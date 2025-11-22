import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { DashboardHome } from './components/DashboardHome';
import { EssayEditor } from './components/EssayEditor';
import { FeedbackDisplay } from './components/FeedbackDisplay';
import { LandingPage } from './components/LandingPage';
import { ViewState, CompetencyScore } from './types';

function App() {
  // Simple state-based router to avoid external dependencies for this task
  const [currentView, setCurrentView] = useState<ViewState>('landing');
  
  // State for passing data between Editor and Feedback
  const [correctionData, setCorrectionData] = useState<{
    score: CompetencyScore;
    feedback: string;
    content: string;
    title: string;
  } | null>(null);

  const handleLogin = () => {
    // Simulate auth flow
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setCurrentView('landing');
    setCorrectionData(null);
  };

  const handleCorrectionComplete = (data: any) => {
    setCorrectionData(data);
    setCurrentView('correction');
  };

  if (currentView === 'landing') {
    return <LandingPage onLogin={handleLogin} />;
  }

  return (
    <Layout 
      currentView={currentView} 
      onChangeView={setCurrentView}
      onLogout={handleLogout}
    >
      {currentView === 'dashboard' && (
        <DashboardHome onNewEssay={() => setCurrentView('editor')} />
      )}

      {currentView === 'editor' && (
        <EssayEditor onCorrectionComplete={handleCorrectionComplete} />
      )}

      {currentView === 'correction' && correctionData && (
        <FeedbackDisplay 
          score={correctionData.score}
          feedback={correctionData.feedback}
          content={correctionData.content}
          title={correctionData.title}
          onBack={() => setCurrentView('dashboard')}
        />
      )}

      {(currentView === 'themes' || currentView === 'plans') && (
        <div className="flex flex-col items-center justify-center h-[50vh] text-slate-500">
          <h2 className="text-2xl font-bold text-slate-300 mb-2">Em Breve</h2>
          <p>Esta funcionalidade estará disponível na próxima atualização.</p>
          <button 
             onClick={() => setCurrentView('dashboard')}
             className="mt-4 text-brand-600 hover:underline"
          >
            Voltar ao início
          </button>
        </div>
      )}
    </Layout>
  );
}

export default App;