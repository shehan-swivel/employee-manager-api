import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { EmployeeQuery } from './employees.dto';
import { EmployeesService } from './employees.service';
import { Employee } from './schemas/employee.schema';
import { HttpException, HttpStatus } from '@nestjs/common';

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

describe('EmployeesService', () => {
  let service: EmployeesService;
  let model: Model<Employee>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeesService,
        {
          provide: getModelToken(Employee.name),
          useValue: {
            new: jest.fn().mockResolvedValue(employeeStub()),
            constructor: jest.fn().mockResolvedValue(employeeStub()),
            find: jest.fn(),
            findOne: jest.fn(),
            findById: jest.fn(),
            create: jest.fn(),
            exec: jest.fn(),
            deleteOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<EmployeesService>(EmployeesService);
    model = module.get<Model<Employee>>(getModelToken(Employee.name));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('When create is called', () => {
    describe('with not used email', () => {
      it('should create a new employee', async () => {
        jest.spyOn(model, 'create').mockResolvedValue(employeeStub() as any);

        const createdEmployee = await service.create(employeeStub());
        expect(createdEmployee).toEqual(employeeStub());
      });
    });

    describe('with already used email', () => {
      it('should throw conflict error', async () => {
        jest.spyOn(model, 'findOne').mockResolvedValue(employeeStub());

        try {
          await service.create(employeeStub());
        } catch (error) {
          expect(error).toBeInstanceOf(HttpException);
          expect(error).toHaveProperty('status', HttpStatus.CONFLICT);
          expect(error).toHaveProperty('message', 'Email address is already in use');
        }
      });
    });
  });

  describe('When findAll is called', () => {
    const query = {} as EmployeeQuery;

    it('should return array of employees', async () => {
      jest.spyOn(model, 'find').mockReturnValue({
        collation: jest.fn().mockReturnValue({
          sort: jest.fn().mockReturnValue({
            exec: jest.fn().mockResolvedValue([employeeStub()]),
          }),
        }),
      } as any);

      const employees = await service.findAll(query);
      expect(employees).toEqual([employeeStub()]);
    });
  });

  describe('When update is called', () => {
    describe('with a correct employee id', () => {
      it('should update the employee', async () => {
        const randomId = '642eb1b706276e3cc9219257';
        const employeeSaveStub = { ...employeeStub(), save: jest.fn() };

        jest.spyOn(model, 'findById').mockResolvedValue(employeeSaveStub);
        jest.spyOn(employeeSaveStub, 'save').mockResolvedValue(employeeStub());

        const updatedEmployee = await service.update(randomId, employeeStub());
        expect(updatedEmployee).toEqual(employeeStub());
      });
    });

    describe('with an incorrect employee id', () => {
      it('should throw not found error', async () => {
        const randomId = '642eb1b706276e3cc9219257';

        jest.spyOn(model, 'findById').mockResolvedValue(null);

        try {
          await service.update(randomId, employeeStub());
        } catch (error) {
          expect(error).toBeInstanceOf(HttpException);
          expect(error).toHaveProperty('status', HttpStatus.NOT_FOUND);
          expect(error).toHaveProperty('message', 'Employee not found');
        }
      });
    });
  });

  describe('When delete is called', () => {
    describe('with a correct employee id', () => {
      it('should return true', async () => {
        const randomId = '642eb1b706276e3cc9219257';

        jest.spyOn(model, 'findById').mockResolvedValue(employeeStub());
        jest.spyOn(model, 'deleteOne').mockResolvedValue({ deletedCount: 1 } as any);

        const result = await service.delete(randomId);
        expect(result).toEqual(true);
      });
    });

    describe('with an incorrect employee id', () => {
      it('throw not found error', async () => {
        const randomId = '642eb1b706276e3cc9219257';

        jest.spyOn(model, 'findById').mockResolvedValue(null);

        try {
          await service.delete(randomId);
        } catch (error) {
          expect(error).toBeInstanceOf(HttpException);
          expect(error).toHaveProperty('status', HttpStatus.NOT_FOUND);
          expect(error).toHaveProperty('message', 'Employee not found');
        }
      });
    });
  });

  describe('When findById is called', () => {
    describe('with a correct employee id', () => {
      it('should return an employee', async () => {
        const randomId = '642eb1b706276e3cc9219257';

        jest.spyOn(model, 'findById').mockResolvedValue(employeeStub());

        const employee = await service.findById(randomId);
        expect(employee).toEqual(employeeStub());
      });
    });

    describe('with an incorrect employee id', () => {
      it('throw not found error', async () => {
        const randomId = '642eb1b706276e3cc9219257';

        jest.spyOn(model, 'findById').mockResolvedValue(null);

        try {
          await service.delete(randomId);
        } catch (error) {
          expect(error).toBeInstanceOf(HttpException);
          expect(error).toHaveProperty('status', HttpStatus.NOT_FOUND);
          expect(error).toHaveProperty('message', 'Employee not found');
        }
      });
    });
  });
});
