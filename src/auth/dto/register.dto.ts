import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDto {
   @IsNotEmpty()
   fullName!: string;

   @IsEmail()
   email!: string;

   @IsNotEmpty()
   password!: string;
}