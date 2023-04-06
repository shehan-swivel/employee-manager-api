import { SortOrder } from 'mongoose';

export class CreateEmployeeDto {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
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
