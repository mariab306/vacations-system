import type { Vacation } from '../types/Vacation';
import { UPLOADS_URL } from '../config';

type Props = {
  vacation: Vacation;
  isAdmin?: boolean;
  onToggleLike?: (vacationId: number, isLiked: boolean) => void;
  onEdit?: (vacationId: number) => void;
  onDelete?: (vacationId: number) => void;
};

export function VacationCard({ vacation, isAdmin, onToggleLike, onEdit, onDelete }: Props) {
  return (
    <div>
      <img src={`${UPLOADS_URL}/${vacation.image_filename}`} alt={vacation.destination} />
      <h3>{vacation.destination}</h3>
      <p>{vacation.description}</p>
      <p>Dates: {vacation.start_date.split('T')[0]} - {vacation.end_date.split('T')[0]}</p>
      <p>Price: ${vacation.price}</p>
      
      {!isAdmin && onToggleLike && (
        <div>
          <button onClick={() => onToggleLike(vacation.vacation_id, vacation.is_liked)}>
            {vacation.is_liked ? 'Unlike ❤️' : 'Like 🤍'}
          </button>
        </div>
      )}

      {isAdmin && (
        <div>
          <button onClick={() => onEdit && onEdit(vacation.vacation_id)}>Edit</button>
          <button onClick={() => onDelete && onDelete(vacation.vacation_id)}>Delete</button>
        </div>
      )}
    </div>
  );
}