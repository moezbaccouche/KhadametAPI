export class SearchedProfessionalDto {
  constructor(
    public name: string,
    public picture: string,
    public fields: string[],
    public generalRating: number,
  ) {}
}
