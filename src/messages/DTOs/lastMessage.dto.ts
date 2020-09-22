export class LastMessageDto {
  constructor(
    public senderId: string,
    public msg: string,
    public msgTime: Date,
  ) {}
}
