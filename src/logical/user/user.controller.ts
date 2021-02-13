import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/createUser.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/create')
  async createUser(@Res() res, @Body() createUserDto: CreateUserDTO) {
    console.log(createUserDto);
    const customer = await this.userService.addUser(createUserDto);
    return res.status(HttpStatus.OK).json({
      message: 'Customer has been created successfully',
      customer,
    });
  }

  // Retrieve customers list
  @Get('/all')
  async getAllCustomer(@Res() res) {
    const customers = await this.userService.getAllUser();
    return res.status(HttpStatus.OK).json(customers);
  }

  // Fetch a particular customer using ID
  @Get('/:userID')
  async getCustomer(@Res() res, @Param('userID') userID) {
    const customer = await this.userService.getUser(userID);
    if (!customer) throw new NotFoundException('Customer does not exist!');
    return res.status(HttpStatus.OK).json(customer);
  }
}
