export type Vacation = {
  vacation_id: number;
  destination: string;
  description: string;
  start_date: string;
  end_date: string;
  price: number;
  image_filename: string;
  likes_count: number;
  is_liked: boolean;
};

export type AddVacationData = {
  destination: string;
  description: string;
  start_date: string;
  end_date: string;
  price: number;
  image: File | null;
};

export type VacationReport = {
  destination: string;
  likes_count: number;
};