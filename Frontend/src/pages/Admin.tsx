import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Vacation } from '../types/Vacation';
import { fetchVacations, deleteVacation } from '../services/vacationService';
import { VacationCard } from '../components/VacationsCard';

export function Admin() {
  const navigate = useNavigate();
  const [vacations, setVacations] = useState<Vacation[]>([]);
  const [error, setError] = useState('');
  const [vacationToDelete, setVacationToDelete] = useState<Vacation | null>(null);

  const loadVacations = async () => {
    try {
      const data = await fetchVacations();
      setVacations(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load vacations');
    }
  };

  useEffect(() => {
    loadVacations();
  }, []);

  const handleDeleteRequest = (id: number) => {
    const selected = vacations.find((v) => v.vacation_id === id) || null;
    setVacationToDelete(selected);
  };

  const confirmDelete = async () => {
    if (!vacationToDelete) return;
    try {
      await deleteVacation(vacationToDelete.vacation_id);
      setVacations((prev) =>
        prev.filter((v) => v.vacation_id !== vacationToDelete.vacation_id)
      );
      setVacationToDelete(null);
    } catch (err: any) {
      setError(err.message || 'Failed to delete vacation');
      setVacationToDelete(null);
    }
  };

  return (
    <div>
      <h1>Manage Vacations (Admin)</h1>
      {error && <p>{error}</p>}

      {vacationToDelete && (
        <div className="confirm-overlay">
          <div className="confirm-box">
            <h3>Delete Vacation</h3>
            <p>
              Are you sure you want to delete <strong>{vacationToDelete.destination}</strong>?
            </p>
            <div>
              <button onClick={confirmDelete}>Yes, Delete</button>
              <button type="button" onClick={() => setVacationToDelete(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div>
        {vacations.map((vacation) => (
          <VacationCard
            key={vacation.vacation_id}
            vacation={vacation}
            isAdmin={true}
            onEdit={(id) => navigate(`/admin/edit/${id}`)}
            onDelete={handleDeleteRequest}
          />
        ))}
      </div>
    </div>
  );
}