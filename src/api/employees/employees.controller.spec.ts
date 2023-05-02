import { Test, TestingModule } from '@nestjs/testing';
import { IdParamDto } from 'src/common/dto';
import ResponseDto from 'src/utils/response.dto';
import { EmployeesController } from './employees.controller';
import { EmployeeQuery } from './employees.dto';
import { EmployeesService } from './employees.service';
import { Employee } from './schemas/employee.schema';

const employeeStub = (): Employee => {
  return {
    firstName: 'test',
    lastName: 'user',
    email: 'user@test.com',
    phoneNumber: '+94713771735',
    gender: 'M',
    photo: '',
  };
};

describe('EmployeesController', () => {
  let controller: EmployeesController;
  let service: EmployeesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeesController],
      providers: [
        {
          provide: EmployeesService,
          useValue: {
            create: jest.fn().mockResolvedValue(employeeStub()),
            findAll: jest.fn().mockResolvedValue([employeeStub()]),
            update: jest.fn().mockResolvedValue(employeeStub()),
            delete: jest.fn().mockResolvedValue(true),
            findById: jest.fn().mockResolvedValue(employeeStub()),
          },
        },
      ],
    }).compile();

    controller = module.get<EmployeesController>(EmployeesController);
    service = module.get<EmployeesService>(EmployeesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('When create is called', () => {
    let response: ResponseDto;

    beforeEach(async () => {
      response = await controller.create(employeeStub());
    });

    it('should call employeesService', () => {
      expect(service.create).toHaveBeenCalledWith(employeeStub());
    });

    it('should return the created employee with success message', () => {
      expect(response).toEqual({ data: employeeStub(), message: 'Employee created successfully' });
    });
  });

  describe('When findAll is called', () => {
    let response: ResponseDto;
    const query = {} as EmployeeQuery;

    beforeEach(async () => {
      response = await controller.findAll(query);
    });

    it('should call employeesService', () => {
      expect(service.findAll).toHaveBeenCalledWith(query);
    });

    it('should return array of employees', () => {
      expect(response).toEqual({ data: [employeeStub()], message: '' });
    });
  });

  describe('when update is called', () => {
    let response: ResponseDto;
    const params: IdParamDto = { id: '642eb1b706276e3cc9219257' };

    beforeEach(async () => {
      response = await controller.update(params, employeeStub());
    });

    it('should call employeesService', () => {
      expect(service.update).toHaveBeenCalledWith(params.id, employeeStub());
    });

    it('should return the updated employee with success message', () => {
      expect(response).toEqual({ data: employeeStub(), message: 'Employee updated successfully' });
    });
  });

  describe('when delete is called', () => {
    let response: ResponseDto;
    const params: IdParamDto = { id: '642eb1b706276e3cc9219257' };

    beforeEach(async () => {
      response = await controller.delete(params);
    });

    it('should call employeesService', () => {
      expect(service.delete).toHaveBeenCalledWith(params.id);
    });

    it('should return with success message', () => {
      expect(response).toEqual({ data: null, message: 'Employee deleted successfully' });
    });
  });

  describe('When findById is called', () => {
    let response: ResponseDto;
    const params: IdParamDto = { id: '642eb1b706276e3cc9219257' };

    beforeEach(async () => {
      response = await controller.findById(params);
    });

    it('should call employeesService', () => {
      expect(service.findById).toHaveBeenCalledWith(params.id);
    });

    it('should return an employee', () => {
      expect(response).toEqual({ data: employeeStub(), message: '' });
    });
  });
});
