import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
    @ApiProperty({description: 'The email of the user account', example : "test@gmail.com"})
    @IsString()
    @IsNotEmpty()
    readonly email:string

    @ApiProperty({description: 'The password of the user account', example : "Test123"})
    @IsString()
    @IsNotEmpty()
    readonly password:string
}
