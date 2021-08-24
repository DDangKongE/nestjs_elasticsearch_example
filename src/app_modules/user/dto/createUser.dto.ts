import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsNumber, IsString, IS_DATE } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    readonly username : string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    readonly password : string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly phone : string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly email : string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly nickname : string;
}