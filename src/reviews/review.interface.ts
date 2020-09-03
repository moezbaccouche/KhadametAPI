export interface Review {
  id?: string;
  generalRating: number;
  comment: string;
  postedAt: Date;
  clientId: string;
  professionalId: string;
}
