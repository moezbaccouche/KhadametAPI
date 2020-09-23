export class SearchedProfessionalDto {
  constructor(
    public id: string,
    public name: string,
    public picture: string,
    public rating: number,
    public salary: number,
    public age: number,
    public playerId: string,
  ) {}
}
