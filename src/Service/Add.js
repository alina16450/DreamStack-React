import { useState } from "react";
import { useNavigate, useLocation  } from 'react-router-dom';
import { useBucket } from '../Repository/BucketContext';
import './Repo.css'

export default function Add() {
  const bucketRepo = useBucket();
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const textOnlyPattern = /^[A-Za-z\s]+$/;
    
    if (!name || !country || !city || !category || !description) {
      setError('All fields are required');
      return;
    }
    if (!textOnlyPattern.test(name)) {
      setError('Location name must contain only letters and spaces');
      return;
    }
  
    if (!textOnlyPattern.test(country)) {
      setError('Country must contain only letters and spaces');
      return;
    }
  
    if (!textOnlyPattern.test(city)) {
      setError('City must contain only letters and spaces');
      return;
    }

    try {
      bucketRepo.addItem(name, country, city, category, description);
      setName('');
      setCountry('');
      setCity('');
      setCategory('');
      setDescription('');
      setError('');
    } catch (e) {
      setError(e.toString());
    }
  }

  let navigate = useNavigate();
  const location = useLocation();
  return (
    <div className="add">
      <div className="page-container">
      <header className="header">
        <h1>DreamStack</h1>
        <nav className='nav'>
        <button 
            className={`b1 ${location.pathname === '/' ? 'active-nav' : ''}`}
            onClick={() => navigate('/')}
          >
            <i className="bi bi-house-door"></i>
          </button>
          <button 
            className={`b2 ${location.pathname === '/add' ? 'active-nav' : ''}`}
            onClick={() => navigate('/add')}
          >
            <i className="bi bi-plus-lg"></i>
          </button>
          <button 
            className={`b3 ${location.pathname === '/edit' ? 'active-nav' : ''}`}
            onClick={() => navigate('/edit')}
          >
            <i className="bi bi-pencil-square"></i>
          </button>
        </nav>
      </header>
      <h5 className="tagline">Save it. Plan it. Live it.</h5>

      <h2 className="instructionAdd">Add bucket list item</h2>

      <div className="add-form">
  <form className="form-grid" onSubmit={handleSubmit}>
    {error && <div className="error-message">{error}</div>}
    
    <div className="form-group">
      <label>Location name:</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
    </div>
    
    <div className="form-group">
      <label>Country:</label>
      <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} required />
    </div>
    
    <div className="form-group">
      <label>City:</label>
      <input type="text" value={city} onChange={(e) => setCity(e.target.value)} required />
    </div>
    
    <div className="form-group">
      <label>Category:</label>
      <select value={category} onChange={(e) => setCategory(e.target.value)} required>
        <option value="">Select Category</option>
        <option value="Historical">Historical</option>
        <option value="Natural">Natural</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Religious">Religious</option>
        <option value="Educational">Educational</option>
        <option value="Other">Other</option>
      </select>
    </div>
    
    <div className="form-group full-width">
      <label>Description:</label>
      <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
    </div>
    
    <button type="submit" className="submit-btn">Add +</button>
  </form>
</div>
    </div>
    </div>

  );
}