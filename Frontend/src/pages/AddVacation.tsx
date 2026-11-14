import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createVacation } from '../services/vacationService';

export function AddVacation() {
  const [destination, setDestination] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [error, setError] = useState<string>('');

  const navigate = useNavigate();

  const handleFileChange = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError('');

    if (!destination || !description || !startDate || !endDate || !price || !imageFile) {
      setError('All fields including an image are required.');
      return;
    }

    const priceNum = parseFloat(price);
    if (isNaN(priceNum) || priceNum < 0 || priceNum > 10000) {
      setError('Price must be between $0 and $10,000.');
      return;
    }

    const todayStr = new Date().toISOString().split('T')[0];
    if (startDate < todayStr) {
      setError('Start date cannot be in the past.');
      return;
    }

    if (endDate < startDate) {
      setError('End date cannot be earlier than start date.');
      return;
    }

    const formData = new FormData();
    formData.append('destination', destination);
    formData.append('description', description);
    formData.append('start_date', startDate);
    formData.append('end_date', endDate);
    formData.append('price', price);
    formData.append('image', imageFile);

    try {
      await createVacation(formData);
      navigate('/admin');
    } catch (err: any) {
      setError(err.message || 'Failed to add vacation');
    }
  };

  return (
    <div>
      <h1>Add New Vacation</h1>
      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Destination:</label>
          <input
            type="text"
            value={destination}
            onChange={(e: any) => setDestination(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e: any) => setDescription(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e: any) => setStartDate(e.target.value)}
            required
          />
        </div>

        <div>
          <label>End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e: any) => setEndDate(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Price ($):</label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e: any) => setPrice(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </div>

        <button type="submit">Add Vacation</button>
        <button type="button" onClick={() => navigate('/admin')}>Cancel</button>
      </form>
    </div>
  );
}