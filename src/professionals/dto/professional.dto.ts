export class ProfessionalDto {
    constructor(
        public name: string,
        public picture: string,
        public fields: string[],
        public generalRating: number,
    ) { }
}
