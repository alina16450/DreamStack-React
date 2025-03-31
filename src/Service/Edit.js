import React, { useState, useEffect } from 'react';
import { useNavigate , useLocation } from "react-router-dom";
import { useBucket } from '../Repository/BucketContext';
import './Repo.css'
import "bootstrap-icons/font/bootstrap-icons.css";

//contains all of the logic for editing/deleting an item.
export default function Edit () {
    //call bucketRepo to use the function from Repository. useState hooks to handle the selected item, existing data, and the input labels.
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

    //when bucketRepo is called (functions such as edit or delete), the table is refreshed. used useEffect for efficiency.
      useEffect(() => {
        setItems(bucketRepo.getItems());
      }, [bucketRepo]);

    //when an item is selected, its data is automatically used to fill the input labels, for convenience and better user experience.
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

    //logic for the submit edit process.
    const handleUpdate = () => {
        if (!selectedItem) return;

        //again checking that only letters are inputted for all except description.
        const textOnlyPattern = /^[A-Za-z\s]+$/;

        //ensure no fields are left empty.
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
        //calls on our repository function that edits an item's data with the values entered.
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

      //handles logic for deleting item, by getting id of item on row selected and calling on function from repository.
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
        //initialize the table.
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
              //use .map to add each item attribute to its respective collumn. Also implement logic to detect selected item by linking onClick with a hook.
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
        //temporarily create input fields for each attribute, which only appears when an item is clicked. Will soon update to allow editing directly on the table.
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
