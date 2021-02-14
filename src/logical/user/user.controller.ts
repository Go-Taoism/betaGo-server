import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/createUser.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService, private authService: AuthService ) {}

  @Post('/register')
  async createUser(@Res() res, @Body() createUserDto: CreateUserDTO) {
    // TODO 加密加盐 优化错误处理
    try {
      const user = await this.userService.addUser(createUserDto);
      return res.status(HttpStatus.OK).json({
        message: 'Customer has been created successfully',
        user,
      });
    } catch(err) {
      // console.log(err.message)
      return res.status(HttpStatus.OK).json({
        message: err.message,
      });
    }
  }

  // Retrieve customers list
  @UseGuards(AuthGuard('jwt')) 
  @Get('/all')
  async getAllCustomer(@Res() res) {
    const customers = await this.userService.getAllUser();
    return res.status(HttpStatus.OK).json(customers);
  }

  // Fetch a particular customer using ID
  @UseGuards(AuthGuard('jwt')) 
  @Get('/:userID')
  async getCustomer(@Res() res, @Param('userID') userID) {
    const customer = await this.userService.getUser(userID);
    if (!customer) throw new NotFoundException('Customer does not exist!');
    return res.status(HttpStatus.OK).json(customer);
  }

  @Post('/login')
  async logIn(@Res() res, @Body() userDto: CreateUserDTO) {
    console.log('JWT验证 - Step 1: 用户请求登录');
    let user = await this.userService.getUser(userDto.name);
    if (!user) throw new NotFoundException('User not found'); 
    const authResult = await this.authService.validateUser(
      userDto.name,
      userDto.password,
      user
    );
    let response = {
      code: authResult? 200: 400,
      msg: authResult? 'login success' : 'wrong password',
      token: authResult
    }
    return res.status(HttpStatus.OK).json(response);
  }

}
