import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEmployeeDto, EmployeeQuery, UpdateEmployeeDto } from './employees.dto';
import { Employee } from './schemas/employee.schema';

@Injectable()
export class EmployeesService {
  constructor(@InjectModel(Employee.name) private employeeModel: Model<Employee>) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    if (createEmployeeDto.email) {
      const employee = await this.employeeModel.findOne({ email: createEmployeeDto.email });

      if (employee) {
        throw new HttpException('Email address is already in use', HttpStatus.CONFLICT);
      }
    }

    return await this.employeeModel.create(createEmployeeDto);
  }

  async findAll(query: EmployeeQuery): Promise<Employee[]> {
    const { orderBy, order, firstName, lastName, email, phoneNumber, gender } = query;

    // to avoid sort by not defined fields and control which fields can be used to sort
    const orderByValues = { firstName: true, lastName: true, email: true, phoneNumber: true, gender: true };
    // to avoid sort by not defined orders and control which order can be used to sort
    const orderValues = { asc: true, desc: true };

    const filter: any = {};
    const sort = {};

    if (firstName) filter.firstName = new RegExp(firstName, 'i');
    if (lastName) filter.lastName = new RegExp(lastName, 'i');
    if (email) filter.email = new RegExp(email, 'i');
    if (phoneNumber) filter.phoneNumber = new RegExp(phoneNumber.replace('+', ''));
    if (gender) filter.gender = gender;

    if (orderByValues[orderBy] && orderValues[order]) sort[orderBy] = order;

    return await this.employeeModel.find(filter).collation({ locale: 'en' }).sort(sort).exec();
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee> {
    const employee = await this.employeeModel.findById(id);

    if (!employee) {
      throw new HttpException('Employee not found', HttpStatus.NOT_FOUND);
    }

    const { firstName, lastName, email, phoneNumber, gender } = updateEmployeeDto;

    // If email is changed, check whether new email already is use
    if (email && email !== employee.email) {
      const prevEmployee = await this.employeeModel.findOne({ email });

      if (prevEmployee) {
        throw new HttpException('Email address is already in use', HttpStatus.CONFLICT);
      }
    }

    employee.firstName = firstName;
    employee.lastName = lastName;
    employee.email = email;
    employee.phoneNumber = phoneNumber;
    employee.gender = gender;

    return employee.save();
  }

  async delete(id: string): Promise<boolean> {
    const employee = await this.employeeModel.findById(id);

    if (!employee) {
      throw new HttpException('Employee not found', HttpStatus.NOT_FOUND);
    }

    const result = await this.employeeModel.deleteOne({ _id: id });
    return !!result.deletedCount;
  }

  async findById(id: string): Promise<Employee> {
    const employee = await this.employeeModel.findById(id);

    if (!employee) {
      throw new HttpException('Employee not found', HttpStatus.NOT_FOUND);
    }

    return employee;
  }
}
