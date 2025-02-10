import { PipelineToolbar } from './components/ToolBar/toolbar';
import { PipelineUI } from './components/Pipeline/ui';
import { TopBar } from './components/TopBar/topbar';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <TopBar />
      <PipelineToolbar />
      <PipelineUI />
    </div>
  );
}

export default App;
