import { UserForConversationDto } from 'src/users/DTOs/userForConversation.dto';
import { LastMessageDto } from './lastMessage.dto';

export class ConversationOverviewDto {
  constructor(
    public receiverUser: UserForConversationDto,
    public lastMessage: LastMessageDto,
    public conversationId: string,
  ) {}
}
