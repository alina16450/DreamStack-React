import React, { useState, useEffect } from 'react';
import { useNavigate , useLocation } from "react-router-dom";
import { useBucket } from '../Repository/BucketContext';
import './Repo.css'
import "bootstrap-icons/font/bootstrap-icons.css";


export default function Edit () {
    
    const bucketRepo = useBucket();
    const [items, setItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [formData, setFormData] = useState({
      name: '',
      country: '',
      city: '',
      category: '',
      description: ''
    });
    const [error, setError] = useState();

      useEffect(() => {
        setItems(bucketRepo.getItems());
      }, [bucketRepo]);

    const handleSelectItem = (item) => {
        setSelectedItem(item);
        setFormData({
          name: item.name,
          country: item.country,
          city: item.city,
          category: item.category,
          description: item.description
        });
    };

    const handleUpdate = () => {
        if (!selectedItem) return;
        const textOnlyPattern = /^[A-Za-z\s]+$/;
    
        if (!formData.name || !formData.country || !formData.city || !formData.category || !formData.description) {
        setError('All fields are required');
        return;
        }
        if (!textOnlyPattern.test(formData.name)) {
        setError('Location name must contain only letters and spaces');
        return;
        }
    
        if (!textOnlyPattern.test(formData.country)) {
        setError('Country must contain only letters and spaces');
        return;
        }
    
        if (!textOnlyPattern.test(formData.city)) {
        setError('City must contain only letters and spaces');
        return;
        }
    
        if (!textOnlyPattern.test(formData.description)) {
        setError('Description must contain only letters and spaces');
        return;
        }
        bucketRepo.updateItem(
          selectedItem.id,
          formData.name,
          formData.country,
          formData.city,
          formData.category,
          formData.description
        );
        
        setItems([...bucketRepo.getItems()]);
        setError('');
      };

      const handleDelete = (id, e) => {
        if (e) e.stopPropagation();
        bucketRepo.deleteItem(id);
        setItems([...bucketRepo.getItems()]);
        
        if (selectedItem && selectedItem.id === id) {
          setSelectedItem(null);
        }
    }
    let navigate = useNavigate();
    const location = useLocation();

    return(
        <div className = "edit">
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

      <div className="edit-container">
        <h2 className="edit-title">Edit mode</h2>
        <h3 className="edit-subtitle">Click on the entry to modify:</h3>
          <div className="body">
        <table>
          <thead>
            <tr>
              <th>Place</th>
              <th>Country</th>
              <th>City</th>
              <th>Category</th>
              <th>Description</th>
              <th>Visited</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
                <tr key={item.id} onClick={() => handleSelectItem(item)}
                className={selectedItem?.id === item.id ? 'selected-row' : ''}>
                <td>{item.name}</td>
                <td>{item.country}</td>
                <td>{item.city}</td>
                <td>{item.category}</td>
                <td>{item.description}</td>
                <td>{item.visited ? 'Yes' : 'No'}</td>
                <td className="last"> 
                    <button type="button" className="delete-btn" onClick={(e) => {e.stopPropagation(); handleDelete(item.id);}}><i class="bi bi-trash3-fill"></i></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {selectedItem && (
      <div className="edit-form">
        <h3>Editing: {selectedItem.name}</h3>
        <form>
          <label> Name: <input type="text" value={formData.name} 
              onChange={(e) => setFormData({...formData, name: e.target.value})}/>
          </label>
          <label> Country: <input type = "text" value={formData.country}
              onChange = {(e) => setFormData({...formData, country: e.target.value})}/>
          </label>
          <label> City: <input type = "text" value={formData.city}
              onChange = {(e) => setFormData({...formData, city: e.target.value})}/>
          </label>
          <label>Category:</label>
          <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} >
            <option value="">Select Category</option>
            <option value="Historical">Historical</option>
            <option value="Natural">Natural</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Religious">Religious</option>
            <option value="Educational">Educational</option>
            <option value="Other">Other</option>
          </select>
          <label> Description: <input type = "text" value={formData.description}
              onChange = {(e) => setFormData({...formData, description: e.target.value})}/>
          </label>



          <button type="button" onClick={handleUpdate}>Update</button>
          {error && <div className="error">{error}</div>}
        </form>
      </div>
    )}
        </div>
        </div>
        </div>
        </div>
    )
}