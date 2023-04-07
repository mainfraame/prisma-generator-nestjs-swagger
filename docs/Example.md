# Example

Below is the output generated from the project's [public.prisma](../public.prisma):

```
generator client {
  provider        = "prisma-client-js"
  binaryTargets   = ["native"]
  previewFeatures = ["multiSchema"]
}

datasource db {
  provider = "postgresql"
  url      = env("POSTGRES_URL")
  schemas  = ["public"]
}

generator nestJsSwagger {
  provider = "prisma-generator-nestjs-swagger"
}

model User {
  id                   Int                    @id @default(autoincrement())
  email                String?                @db.VarChar(512)
  password             String?                @db.VarChar(512)
  createdAt            DateTime?              @map("created_at") @db.Timestamptz(6)
  updatedAt            DateTime?              @map("updated_at") @db.Timestamptz(6)
  config               Json?

  @@map("user")
  @@schema("public")
}
```

`UserDto.ts`

```typescript
import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString
} from 'class-validator';

export class UserDto {
  @Transform(({ value }) =>
    typeof value === 'string' ? new Date(value) : value
  )
  @ApiProperty({ format: 'date-time', required: false })
  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @Transform(({ value }) =>
    typeof value === 'string' ? new Date(value) : value
  )
  @ApiProperty({ format: 'date-time', required: false })
  @IsOptional()
  @IsDate()
  updatedAt?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsObject()
  config?: Prisma.NullableJsonNullValueInput | Prisma.InputJsonValue;

  @Transform(({ value }) => (typeof value === 'string' ? +value : value))
  @ApiProperty({ required: true })
  @IsNumber()
  id: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  password?: string;
}

export class CreateUserDto {
  @ApiProperty({ required: false })
  config?: Prisma.NullableJsonNullValueInput | Prisma.InputJsonValue;

  @ApiProperty({ required: false })
  @IsDate()
  createdAt?: Date;

  @ApiProperty({ required: false })
  @IsString()
  email?: string;

  @ApiProperty({ required: true })
  @IsNumber()
  id: number;

  @ApiProperty({ required: false })
  @IsString()
  password?: string;

  @ApiProperty({ required: false })
  @IsDate()
  updatedAt?: Date;
}

export class DeleteWhereUserDto {
  @ApiProperty({ required: true })
  @IsNumber()
  id: number;
}

export class FindManyUserDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsObject()
  config?: Prisma.NullableJsonNullValueInput | Prisma.InputJsonValue;

  @Transform(({ value }) =>
    typeof value === 'string' ? new Date(value) : value
  )
  @ApiProperty({ format: 'date-time', required: false })
  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @Transform(({ value }) =>
    typeof value === 'string' ? new Date(value) : value
  )
  @ApiProperty({ format: 'date-time', required: false })
  @IsOptional()
  @IsDate()
  updatedAt?: Date;

  @Transform(({ value }) => (typeof value === 'string' ? +value : value))
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  id?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  password?: string;
}

export class FindUniqueUserDto {
  @Transform(({ value }) => (typeof value === 'string' ? +value : value))
  @ApiProperty({ required: true })
  @IsNumber()
  id: number;
}

export class UpdateUserDto {
  @ApiProperty({ required: true })
  @IsNumber()
  id: number;

  @ApiProperty({ required: false })
  @IsString()
  email?: string;

  @ApiProperty({ required: false })
  @IsString()
  password?: string;

  @ApiProperty({ required: false })
  @IsDate()
  createdAt?: Date;

  @ApiProperty({ required: false })
  @IsDate()
  updatedAt?: Date;

  @ApiProperty({ required: false })
  config?: Prisma.NullableJsonNullValueInput | Prisma.InputJsonValue;
}
```

`index.ts`

```typescript
export {
  UserDto,
  CreateUserDto,
  DeleteWhereUserDto,
  FindManyUserDto,
  FindUniqueUserDto,
  UpdateUserDto
} from './UserDto';
```
