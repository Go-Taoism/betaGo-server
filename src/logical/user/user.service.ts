import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';
import { CreateUserDTO } from './dto/createUser.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}
  // fetch all Users
  async getAllUser(): Promise<User[]> {
    const Users = await this.userModel.find().exec();
    return Users;
  }
  // Get a single User
  async getUser(UserID): Promise<User> {
    const User = await this.userModel.findOne({name: UserID});
    return User;
  }
  // post a single User
  async addUser(createUserDTO: CreateUserDTO): Promise<User> {
    let user = await this.userModel.findOne({name: createUserDTO.name});
    console.log(user);
    if (!user) {
      const newUser = new this.userModel(createUserDTO);
      return newUser.save();
    } else {
      throw Error('username already existed');
    }
  }
  // Edit User details
  async updateUser(UserID, createUserDTO: CreateUserDTO): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      UserID,
      createUserDTO,
      { new: true },
    );
    return updatedUser;
  }
  // Delete a User
  async deleteUser(UserID): Promise<any> {
    const deletedUser = await this.userModel.findByIdAndRemove(UserID);
    return deletedUser;
  }
}
