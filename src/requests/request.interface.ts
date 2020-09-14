export interface Request {
  id?: string;
  clientId: string;
  skillId: string;
  professionalId: string;
  date: Date;
  address: string;
  status: number;
  createdAt: Date;
  description?: string;
}
