import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import ResponseDto from 'src/utils/response.dto';
import { CreateEmployeeDto, EmployeeQuery, UpdateEmployeeDto } from './employees.dto';
import { EmployeesService } from './employees.service';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  async create(@Body() createEmployeeDto: CreateEmployeeDto): Promise<ResponseDto> {
    const data = await this.employeesService.create(createEmployeeDto);
    return new ResponseDto(data, 'Employee created successfully');
  }

  @Get()
  async findAll(@Query() query: EmployeeQuery): Promise<ResponseDto> {
    const data = await this.employeesService.findAll(query);
    return new ResponseDto(data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto): Promise<ResponseDto> {
    const data = await this.employeesService.update(id, updateEmployeeDto);
    return new ResponseDto(data, 'Employee updated successfully');
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<ResponseDto> {
    await this.employeesService.delete(id);
    return new ResponseDto(null, 'Employee deleted successfully');
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<ResponseDto> {
    const data = await this.employeesService.findById(id);
    return new ResponseDto(data);
  }
}
