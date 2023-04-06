import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Employee } from './schemas/employee.schema';
import { Model } from 'mongoose';
import { CreateEmployeeDto, UpdateEmployeeDto } from './employees.dto';

@Injectable()
export class EmployeesService {
  constructor(@InjectModel(Employee.name) private employeeModel: Model<Employee>) {}

  create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const employee = new this.employeeModel(createEmployeeDto);
    return employee.save();
  }

  findAll(): Promise<Employee[]> {
    return this.employeeModel.find();
  }

  async update(id: string, data: UpdateEmployeeDto): Promise<Employee> {
    const employee = await this.employeeModel.findById(id);

    if (!employee) {
      throw new Error('Employee not found');
    }

    const { firstName, lastName, email, phoneNumber, gender } = data;

    // If email is changed, check whether new email already is use
    if (email && email !== employee.email) {
      const prevEmployee = await this.employeeModel.findOne({ email });

      if (prevEmployee) {
        throw new Error('Email address is already in use');
      }
    }

    employee.firstName = firstName;
    employee.lastName = lastName;
    employee.email = email;
    employee.phoneNumber = phoneNumber;
    employee.gender = gender;

    return employee.save();
  }

  async delete(id: string): Promise<any> {
    const employee = await this.employeeModel.findById(id);

    if (!employee) {
      throw new Error('Employee not found');
    }

    return this.employeeModel.deleteOne({ _id: id });
  }

  async findById(id: string): Promise<Employee> {
    const employee = await this.employeeModel.findById(id);

    if (!employee) {
      throw new Error('Employee not found');
    }

    return employee;
  }
}
