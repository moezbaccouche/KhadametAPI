export interface Notification {
  id?: string;
  senderId: string;
  receiverId: string;
  type: number;
  createdAt: Date;
  skillId?: string;
}
