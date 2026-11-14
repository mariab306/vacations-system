import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchVacationById, updateVacation } from '../services/vacationService';
import { UPLOADS_URL } from '../config';

export function EditVacation() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [destination, setDestination] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [price, setPrice] = useState('');
  const [currentImage, setCurrentImage] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    fetchVacationById(Number(id))
      .then((v) => {
        setDestination(v.destination);
        setDescription(v.description);
        setStartDate(v.start_date.split('T')[0]);
        setEndDate(v.end_date.split('T')[0]);
        setPrice(String(v.price));
        setCurrentImage(v.image_filename);
      })
      .catch((err: any) => setError(err.message || 'Failed to load vacation'));
  }, [id]);

  const handleFileChange = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError('');

    if (!destination || !description || !startDate || !endDate || !price) {
      setError('All fields except image are required.');
      return;
    }

    const priceNum = parseFloat(price);
    if (isNaN(priceNum) || priceNum < 0 || priceNum > 10000) {
      setError('Price must be between $0 and $10,000.');
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
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      await updateVacation(Number(id), formData);
      navigate('/admin');
    } catch (err: any) {
      setError(err.message || 'Failed to update vacation');
    }
  };

  return (
    <div>
      <h1>Edit Vacation</h1>
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

        {currentImage && (
          <div>
            <p>Current Image:</p>
            <img
              src={`${UPLOADS_URL}/${currentImage}`}
              alt={destination}
              width="200"
            />
          </div>
        )}

        <div>
          <label>Change Image (Optional):</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        <button type="submit">Update Vacation</button>
        <button type="button" onClick={() => navigate('/admin')}>Cancel</button>
      </form>
    </div>
  );
}