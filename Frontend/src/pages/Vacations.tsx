import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Vacation } from '../types/Vacation';
import type { User } from '../types/User';
import { fetchVacations, likeVacation, unlikeVacation, deleteVacation } from '../services/vacationService';
import { VacationCard } from '../components/VacationsCard';

type FilterType = 'all' | 'active' | 'future' | 'liked';

export function Vacations() {
  const [vacations, setVacations] = useState<Vacation[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const userJson = localStorage.getItem('user');
  const user: User | null = userJson ? JSON.parse(userJson) : null;
  const isAdmin = user?.role === 'Admin';

  const ITEMS_PER_PAGE = 9;

  useEffect(() => {
    loadVacations();
  }, []);

  const loadVacations = async () => {
    try {
      const data = await fetchVacations();
      setVacations(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load vacations');
    }
  };

  const handleToggleLike = async (vacationId: number, isLiked: boolean) => {
    if (isAdmin) return;
    try {
      if (isLiked) {
        await unlikeVacation(vacationId);
      } else {
        await likeVacation(vacationId);
      }
      setVacations((prev) =>
        prev.map((v) =>
          v.vacation_id === vacationId
            ? { ...v, is_liked: !isLiked, likes_count: isLiked ? v.likes_count - 1 : v.likes_count + 1 }
            : v
        )
      );
    } catch {
      setError('Could not update like status');
    }
  };

  const handleDelete = async (vacationId: number) => {
    if (!window.confirm('Are you sure you want to delete this vacation?')) return;
    try {
      await deleteVacation(vacationId);
      setVacations((prev) => prev.filter((v) => v.vacation_id !== vacationId));
    } catch (err: any) {
      setError(err.message || 'Failed to delete vacation');
    }
  };

  const today = new Date().toISOString().split('T')[0];

  const filteredVacations = vacations
    .sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime())
    .filter((v) => {
      const start = v.start_date.split('T')[0];
      const end = v.end_date.split('T')[0];

      if (filter === 'liked') return v.is_liked;
      if (filter === 'active') return start <= today && end >= today;
      if (filter === 'future') return start > today;
      return true;
    });

  const totalPages = Math.ceil(filteredVacations.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentVacations = filteredVacations.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleFilterChange = (newFilter: FilterType) => {
    setFilter(newFilter);
    setCurrentPage(1);
  };

  return (
    <div>
      <h1>Vacations</h1>
      {error && <p>{error}</p>}

      <div>
        <button onClick={() => handleFilterChange('all')}>All Vacations</button>
        <button onClick={() => handleFilterChange('active')}>Active Vacations</button>
        <button onClick={() => handleFilterChange('future')}>Future Vacations</button>
        {!isAdmin && <button onClick={() => handleFilterChange('liked')}>Liked by Me</button>}
      </div>

      <div>
        {currentVacations.map((vacation) => (
          <VacationCard
            key={vacation.vacation_id}
            vacation={vacation}
            isAdmin={isAdmin}
            onToggleLike={!isAdmin ? handleToggleLike : undefined}
            onEdit={isAdmin ? (id) => navigate(`/admin/edit/${id}`) : undefined}
            onDelete={isAdmin ? handleDelete : undefined}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div>
          <button disabled={currentPage === 1} onClick={() => setCurrentPage((prev) => prev - 1)}>
            Previous
          </button>
          <span> Page {currentPage} of {totalPages} </span>
          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage((prev) => prev + 1)}>
            Next
          </button>
        </div>
      )}
    </div>
  );
}