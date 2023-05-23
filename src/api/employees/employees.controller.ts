import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { IdParamDto } from 'src/common/dto';
import ResponseDto from 'src/utils/response.dto';
import { ApiKeyGuard } from '../auth/guards';
import { CreateEmployeeDto, EmployeeQuery, UpdateEmployeeDto } from './employees.dto';
import { EmployeesService } from './employees.service';

@UseGuards(ApiKeyGuard)
@ApiTags('Employees')
@ApiSecurity('XApiKey')
@Controller({ path: 'employees', version: '1' })
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
   * Retrieves all employees. Optional query parameters are also acceptable.
   */
  @Get()
  @ApiOkResponse({ description: 'Records fetched successfully.' })
  async findAll(@Query() query: EmployeeQuery): Promise<ResponseDto> {
    const data = await this.employeesService.findAll(query);
    return new ResponseDto(data);
  }

  /**
   * Updates an existing employee.
   */
  @Put(':id')
  @ApiOkResponse({ description: 'The record updated successfully.' })
  @ApiNotFoundResponse({ description: 'Failed to update the record. Record not found.' })
  @ApiConflictResponse({ description: 'Failed to update the record. Email address already in use.' })
  async update(@Param() params: IdParamDto, @Body() updateEmployeeDto: UpdateEmployeeDto): Promise<ResponseDto> {
    const data = await this.employeesService.update(params.id, updateEmployeeDto);
    return new ResponseDto(data, 'Employee updated successfully');
  }

  /**
   * Delete an employee by id
   */
  @Delete(':id')
  @ApiOkResponse({ description: 'The record deleted successfully.' })
  @ApiNotFoundResponse({ description: 'Failed to delete the record. Record not found.' })
  async delete(@Param() params: IdParamDto): Promise<ResponseDto> {
    await this.employeesService.delete(params.id);
    return new ResponseDto(null, 'Employee deleted successfully');
  }

  /**
   * Retrieves an employee by id
   */
  @Get(':id')
  @ApiOkResponse({ description: 'The record fetched successfully.' })
  @ApiNotFoundResponse({ description: 'Failed to fetch the record. Record not found.' })
  async findById(@Param() params: IdParamDto): Promise<ResponseDto> {
    const data = await this.employeesService.findById(params.id);
    return new ResponseDto(data);
  }
}
