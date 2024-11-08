import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
} from "class-validator";

export class UpdateSupplierDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: "Supplier name must be provided." })
  name?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: "Contact name must be provided if entered." })
  contact_name?: string;

  //   @IsOptional()
  //   @IsString()
  //   @IsNotEmpty({ message: "Phone number must be provided." })
  //   @Matches(/^[0-9]{12}$/, {
  //     message: "Phone number must be a valid 12-digit number.",
  //   })
  //   phone_number?: string;  // cannot update phone_number. so, easily.

  //   @IsOptional()
  //   @IsString()
  //   @IsEmail(
  //     {
  //       allow_display_name: true,
  //       allow_underscores: true,
  //     },
  //     { message: "Email must be a valid format, e.g., user@example.com" }
  //   )
  //   email: string;  // cannot update email that easily.

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: "Address must be provided if entered." })
  address?: string;

  @IsOptional()
  @IsUrl(
    {
      require_tld: true, // Ensure the URL has a top-level domain (e.g., .com, .org)
      require_port: false, // Allow URLs without specifying a port
      allow_query_components: true, // Allow query parameters (e.g., ?key=value)
    },
    { message: "Website URL must be valid and start with http:// or https://." }
  )
  website_url?: string;
}
