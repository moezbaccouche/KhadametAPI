export class SearchedProfessionalDto {
  constructor(
    public id: string,
    public name: string,
    public picture: string,
    public generalRating: number,
    public salary: number,
  ) {}
}
