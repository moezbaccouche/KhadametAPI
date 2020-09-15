export class UserDto {
  constructor(
    public id: string,
    public name: string,
    public picture: string,
    public address: string,
    public dob: Date,
    public phone: string,
    public role: number,
  ) {}
}
