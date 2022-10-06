import { BrowserRouter, Route, Routes } from 'react-router-dom';

// styles
import './App.css';

// pages
import Home from './pages/home/Home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;