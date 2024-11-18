import './App.css'
import Layout from './Layout'
import { CvProvider } from './contexts/CvContext';

function App() {
  return (
    <CvProvider>
      <div className="h-screen w-screen">
        <Layout />
      </div>
    </CvProvider>
  );
}

export default App
