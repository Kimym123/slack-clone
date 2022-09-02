import { IsNotEmpty, IsString } from 'class-validator';
import { PickType } from '@nestjs/mapped-types';
import { Workspaces } from '../../entities/Workspaces';
import { ApiProperty } from '@nestjs/swagger';

// export class CreateWorkspaceDto extends PickType(Workspaces, [
//   'name',
//   'url',
// ] as const) {}

export class CreateWorkspaceDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Sleact',
    description: '워크스페이스명',
  })
  public name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'sleact',
    description: 'url 주소',
  })
  public url: string;
}
