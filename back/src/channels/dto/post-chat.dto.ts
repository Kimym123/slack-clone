import { PickType } from '@nestjs/mapped-types';
import { ChannelChats } from '../../entities/ChannelChats';
import { ApiProperty } from '@nestjs/swagger';

// export class PostChatDto extends PickType(ChannelChats, ['content']) {}

export class PostChatDto {
  @ApiProperty({
    example: '안녕하세요 만나서 반가워요 : )',
    description: '채팅내용',
  })
  public content;
}
