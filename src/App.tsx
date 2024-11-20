import './App.css'
import Layout from './Layout'
import { CvProvider } from './lib/hooks/CvContext';
import { LocalizationProvider } from './lib/hooks/LocalizationContext';

function App() {
  return (
    <LocalizationProvider>
      <CvProvider>
        <div className="h-screen w-screen">
          <Layout />
        </div>
      </CvProvider>
    </LocalizationProvider>
  );
}

export default App
