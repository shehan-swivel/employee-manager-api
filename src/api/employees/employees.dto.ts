import { ApiProperty } from '@nestjs/swagger';
import { IsAlpha, IsEmail, IsEnum, IsMobilePhone, IsNotEmpty, MaxLength, MinLength, ValidateIf } from 'class-validator';
import { Gender } from 'src/constants/enums';

export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsAlpha()
  @MaxLength(10)
  @MinLength(3)
  @ApiProperty({ example: 'Test' })
  firstName: string;

  @IsNotEmpty()
  @IsAlpha()
  @MaxLength(10)
  @MinLength(3)
  @ApiProperty({ example: 'User' })
  lastName: string;

  @IsEmail()
  @ValidateIf((_, value) => !!value)
  @ApiProperty({ example: 'testuser@example.com' })
  email?: string;

  @IsMobilePhone('si-LK', { strictMode: true }, { message: 'Phone number must be a valid phone number' })
  @ValidateIf((_, value) => !!value)
  @ApiProperty({ example: '+94701234567' })
  phoneNumber?: string;

  @IsEnum(Gender)
  @ApiProperty({ example: 'M' })
  gender?: string;

  @ApiProperty({ example: 'https://randomuser.me/api/portraits/men/32.jpg' })
  photo?: string;
}

export class UpdateEmployeeDto extends CreateEmployeeDto {}

export class EmployeeQuery {
  @ApiProperty({ description: 'Filter by first name' })
  firstName?: string;

  @ApiProperty({ description: 'Filter by last name' })
  lastName?: string;

  @ApiProperty({ description: 'Filter by email' })
  email?: string;

  @ApiProperty({ description: 'Filter by phone number' })
  phoneNumber?: string;

  @ApiProperty({ enum: ['M', 'F'], description: 'Filter by gender' })
  gender?: string;

  @ApiProperty({ description: 'Sorting property' })
  orderBy?: string;

  @ApiProperty({ enum: ['asc', 'desc'], description: 'Sorting order' })
  order?: string;
}
