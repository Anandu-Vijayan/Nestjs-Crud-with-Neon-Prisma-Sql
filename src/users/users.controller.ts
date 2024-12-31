import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ParseIntPipe,
  ValidationPipe
} from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  // const usersService = new UsersService
  constructor(private readonly usersService: UsersService) {}
  // GET /users or /users/?role=value
  @Get()
  findAll(@Query('role') role?: 'INTERN' | 'EMPLOYEE' | 'ENGINEER' | 'ADMIN') {
    return this.usersService.findAll(role);
  }

  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id: number) {
    return this.usersService.findOne(Number(id));
  }

  @Post()
  Create(
    @Body(ValidationPipe)
    createUserDto: CreateUserDto
  ) {
    return this.usersService.create(createUserDto);
  }
 
  @Patch(':id')
  update(
    @Param('id',ParseIntPipe) id: number,
    @Body(ValidationPipe)
    updateUserDto: UpdateUserDto
  ) {
    return this.usersService.update(Number(id), updateUserDto);
  }

  @Delete(':id')
  Delete(@Param('id',ParseIntPipe) id: number) {
    return this.usersService.delete(Number(id));
  }
}
