export class SkillRatingDto {
  constructor(
    public id: string,
    public clientName: string,
    public clientPicture: string,
    public comment: string,
    public rating: number,
    public postedAt: Date,
    public skillId?: string,
  ) {}
}
