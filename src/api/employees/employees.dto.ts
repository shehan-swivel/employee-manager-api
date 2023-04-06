export class CreateEmployeeDto {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  photo: string;
}

export class UpdateEmployeeDto extends CreateEmployeeDto {}
