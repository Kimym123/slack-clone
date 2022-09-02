import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Column } from 'typeorm';

// export class JoinRequestDto extends PickType(Users, [
//   'email',
//   'nickname',
//   'password',
// ] as const) {}
export class JoinRequestDto {
  @IsEmail()
  @ApiProperty({
    example: 'aaa123@kakao.com',
    description: 'email',
    required: true,
  })
  public email: string;

  @ApiProperty({
    example: `홍길동`,
    description: '닉네임',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Column('varchar', { name: 'nickname', length: 30 })
  nickname: string;

  @ApiProperty({
    example: `123123`,
    description: '비밀번호',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Column('varchar', { name: 'password', length: 100, select: false })
  password: string;
}
