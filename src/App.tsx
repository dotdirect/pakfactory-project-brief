import { BriefProvider } from './contexts/BriefContext';
import DashboardLayout from './components/DashboardLayout';

function App() {
  return (
    <BriefProvider>
      <DashboardLayout>
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-elite-text-primary mb-4">
            Welcome to PakFactory
          </h1>
          <p className="text-elite-text-secondary mb-8">
            Elite Design System - Dark Mode Dashboard
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-elite-surface elite-border rounded-lg p-6">
              <h2 className="text-lg font-semibold text-elite-text-primary mb-2">
                Brief Context
              </h2>
              <p className="text-sm text-elite-text-secondary">
                Context API is set up and ready to use.
              </p>
            </div>
            
            <div className="bg-elite-surface elite-border rounded-lg p-6">
              <h2 className="text-lg font-semibold text-elite-text-primary mb-2">
                Components
              </h2>
              <p className="text-sm text-elite-text-secondary">
                Sidebar and Header components are ready.
              </p>
            </div>
            
            <div className="bg-elite-surface elite-border rounded-lg p-6">
              <h2 className="text-lg font-semibold text-elite-text-primary mb-2">
                Design System
              </h2>
              <p className="text-sm text-elite-text-secondary">
                Elite dark theme configured.
              </p>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </BriefProvider>
  );
}

export default App;

