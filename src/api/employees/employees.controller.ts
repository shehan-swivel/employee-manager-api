import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiConflictResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import ResponseDto from 'src/utils/response.dto';
import { CreateEmployeeDto, EmployeeQuery, UpdateEmployeeDto } from './employees.dto';
import { EmployeesService } from './employees.service';

@ApiTags('Employees')
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  /**
   * Create a new employee
   */
  @Post()
  @ApiCreatedResponse({ description: 'The record created successfully.' })
  @ApiConflictResponse({ description: 'Failed to create the record. Email address already in use.' })
  async create(@Body() createEmployeeDto: CreateEmployeeDto): Promise<ResponseDto> {
    const data = await this.employeesService.create(createEmployeeDto);
    return new ResponseDto(data, 'Employee created successfully');
  }

  /**
   * Returns array of employees. Optional query parameters are also acceptable.
   */
  @Get()
  @ApiOkResponse({ description: 'Records fetched successfully.' })
  async findAll(@Query() query: EmployeeQuery): Promise<ResponseDto> {
    const data = await this.employeesService.findAll(query);
    return new ResponseDto(data);
  }

  /**
   * Update an employee
   */
  @Put(':id')
  @ApiOkResponse({ description: 'The record updated successfully.' })
  @ApiNotFoundResponse({ description: 'Failed to update the record. Record not found.' })
  @ApiConflictResponse({ description: 'Failed to update the record. Email address already in use.' })
  async update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto): Promise<ResponseDto> {
    const data = await this.employeesService.update(id, updateEmployeeDto);
    return new ResponseDto(data, 'Employee updated successfully');
  }

  /**
   * Delete an employee by id
   */
  @Delete(':id')
  @ApiOkResponse({ description: 'The record deleted successfully.' })
  @ApiNotFoundResponse({ description: 'Failed to delete the record. Record not found.' })
  async delete(@Param('id') id: string): Promise<ResponseDto> {
    await this.employeesService.delete(id);
    return new ResponseDto(null, 'Employee deleted successfully');
  }

  /**
   * Returns an employee by id
   */
  @Get(':id')
  @ApiOkResponse({ description: 'The record fetched successfully.' })
  @ApiNotFoundResponse({ description: 'Failed to fetch the record. Record not found.' })
  async findById(@Param('id') id: string): Promise<ResponseDto> {
    const data = await this.employeesService.findById(id);
    return new ResponseDto(data);
  }
}
