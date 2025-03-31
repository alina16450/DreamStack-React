import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Service/Home';
import Add from './Service/Add';
import Edit from './Service/Edit';
import NoPage from './Service/NoPage';
import { BucketProvider } from './Repository/BucketContext';

function App() {
  return (
    <BucketProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/add' element={<Add />} />
          <Route path='/edit' element={<Edit />} />
          <Route path='*' element={<NoPage />} />
        </Routes>
      </Router>
    </BucketProvider>
  );
}

export default App;