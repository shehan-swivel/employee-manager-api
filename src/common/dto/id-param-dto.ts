import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class IdParamDto {
  @ApiProperty({
    required: true,
    type: String,
    example: '64414e7c936f6fcb10f38453',
  })
  @IsMongoId()
  id: string;
}
