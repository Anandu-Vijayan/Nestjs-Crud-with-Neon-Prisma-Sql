import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Role } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class EmployeesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createEmployeeDto: Prisma.EmployeeCreateInput) {
    try {
      const existingEmployee = await this.findByEmail(createEmployeeDto.email);

      if (existingEmployee) {
        throw new ForbiddenException('Employee with this email already exists');
      }

      return await this.databaseService.employee.create({
        data: createEmployeeDto,
      });
    } catch (error) {
      throw error;
    }
  }

  async findAll(role?: Role) {
    try {
      const where = role ? { role } : {};
      return await this.databaseService.employee.findMany({ where });
    } catch (error) {
      throw error;
    }
  } 

  async findOne(id: number) {
    try {
      const employee = await this.databaseService.employee.findUnique({
        where: { id },
      });

      if (!employee) {
        throw new NotFoundException(`Employee with ID ${id} not found`);
      }

      return employee;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    try {
      await this.findOne(id); // Verify employee exists

      return await this.databaseService.employee.update({
        where: { id },
        data: updateEmployeeDto,
      });
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      await this.findOne(id); // Verify employee exists

      return await this.databaseService.employee.delete({
        where: { id },
      });
    } catch (error) {
      throw error;
    }
  }

  async findByEmail(email: string) {
    try {
      return await this.databaseService.employee.findUnique({
        where: { email },
      });
    } catch (error) {
      throw error;
    }
  }
}
