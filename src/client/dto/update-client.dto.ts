import { IsOptional, IsString, Length, Matches } from "class-validator";

export class UpdateClientDto {
  @IsOptional()
  @IsString()
  @Length(1, 50, { message: "First name must be between 1 and 50 characters." })
  first_name?: string;

  @IsOptional()
  @IsString()
  @Length(1, 50, { message: "Last name must be between 1 and 50 characters." })
  last_name?: string;

  @IsOptional()
  @IsString()
  @Matches(/^[0-9]{12}$/, {
    message: "Phone number must be a valid 12-digit number.",
  })
  phone_number?: string;
}
