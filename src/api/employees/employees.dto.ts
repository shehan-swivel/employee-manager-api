import { ApiProperty } from '@nestjs/swagger';
import { IsAlpha, IsEmail, IsEnum, IsMobilePhone, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
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
  @ApiProperty({ example: 'testuser@example.com' })
  email?: string;

  @IsMobilePhone('si-LK', { strictMode: true })
  @ApiProperty({ example: '+94791234567' })
  phoneNumber?: string;

  @IsEnum(Gender)
  @ApiProperty({ example: 'M' })
  gender?: string;

  @ApiProperty({ example: 'https://randomuser.me/api/portraits/men/32.jpg' })
  photo?: string;
}

export class UpdateEmployeeDto extends CreateEmployeeDto {}

export class EmployeeQuery {
  @ApiProperty({ example: 'Test', description: 'Filter by first name' })
  firstName?: string;

  @ApiProperty({ example: 'User', description: 'Filter by last name' })
  lastName?: string;

  @ApiProperty({ example: 'testuser@example.com', description: 'Filter by email' })
  email?: string;

  @ApiProperty({ example: '+94791234567', description: 'Filter by phone number' })
  phoneNumber?: string;

  @ApiProperty({ example: 'F', enum: ['M', 'F'], description: 'Filter by gender' })
  gender?: string;

  @ApiProperty({ example: 'firstName', description: 'Sorting property' })
  orderBy?: string;

  @ApiProperty({ example: 'desc', enum: ['asc', 'desc'], description: 'Sorting order' })
  order?: string;
}
