import  type { Vacation, VacationReport } from '../types/Vacation';
import { apiFetch } from '../config';

export const fetchVacations = async (): Promise<Vacation[]> =>
  (await apiFetch('/vacations')).json();

export const fetchVacationById = async (id: number): Promise<Vacation> =>
  (await apiFetch(`/vacations/${id}`)).json();

export const fetchVacationReports = async (): Promise<VacationReport[]> =>
  (await apiFetch('/vacations/reports')).json();

export const createVacation = async (formData: FormData): Promise<Vacation> =>
  (await apiFetch('/vacations', { method: 'POST', body: formData })).json();

export const updateVacation = async (id: number, formData: FormData): Promise<Vacation> =>
  (await apiFetch(`/vacations/${id}`, { method: 'PUT', body: formData })).json();

export const likeVacation = async (id: number): Promise<void> => {
  await apiFetch(`/likes/${id}`, { method: 'POST' });
};

export const unlikeVacation = async (id: number): Promise<void> => {
  await apiFetch(`/likes/${id}`, { method: 'DELETE' });
};

export const deleteVacation = async (id: number): Promise<void> => {
  await apiFetch(`/vacations/${id}`, { method: 'DELETE' });
};

export const downloadReportsCsv = async (): Promise<void> => {
  const res = await apiFetch('/vacations/reports/csv');
  const url = URL.createObjectURL(await res.blob());
  const link = document.createElement('a');
  link.href = url;
  link.download = 'vacations_likes_report.csv';
  link.click();
  URL.revokeObjectURL(url);
};