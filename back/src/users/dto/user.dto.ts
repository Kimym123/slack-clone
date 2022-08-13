import { JoinRequestDto } from './join.request.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto extends JoinRequestDto {
  @ApiProperty({
    example: `1`,
    description: '아이디',
    required: true,
  })
  id: number;
}
