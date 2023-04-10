import { IsEmail, IsNotEmpty, MaxLength, MinLength, IsAlpha, IsEnum, IsMobilePhone } from 'class-validator';
import { SortOrder } from 'mongoose';
import { Gender } from 'src/constants/enums';

export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsAlpha()
  @MaxLength(10)
  @MinLength(3)
  firstName: string;

  @IsNotEmpty()
  @IsAlpha()
  @MaxLength(10)
  @MinLength(3)
  lastName: string;

  @IsEmail()
  email: string;

  @IsMobilePhone('si-LK', { strictMode: true })
  phoneNumber: string;

  @IsEnum(Gender)
  gender: string;

  photo: string;
}

export class UpdateEmployeeDto extends CreateEmployeeDto {}

export class EmployeeQuery {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  orderBy: string;
  order: SortOrder;
}
