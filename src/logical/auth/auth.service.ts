import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { encryptPassword } from '../../utils/crypto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
  ) {}

  // JWT验证 - Step 2: 校验用户信息
  async validateUser(username: string, password: string, user): Promise<any> {
    console.log('JWT验证 - Step 2: 校验用户信息', user, password);
    if (user.password == password) {
      let token = this.certificate(user);
      return token
    } else {
      return false;
    }
  }

  // JWT验证 - Step 3: 处理 jwt 签证
  async certificate(user: any) {
    const payload = {
      username: user.name,
    };
    console.log('JWT验证 - Step 3: 处理 jwt 签证');

      const token = this.jwtService.sign(payload);
      return token;
  }
}