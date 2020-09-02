export interface Request {
  id?: string;
  category: string;
  date: Date;
  time: Date;
  address: string;
  description?: string;
  status: number;
  creationTime: Date;
}
