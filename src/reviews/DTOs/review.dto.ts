export class ReviewDto {
  constructor(
    public id: string,
    public clientName: string,
    public clientPicture: string,
    public comment: string,
    public generalRating: number,
    public postedAt: Date,
  ) {}
}
