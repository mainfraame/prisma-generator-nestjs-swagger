# prisma-generator-nestjs-swagger

This generator is used to create all the possible dto classes you'll need for 
prisma crud operations, including:

- Create
- Delete
- FindMany
- FindUnique
- Update

### Getting Started

```
npm i prisma-generator-nestjs-swagger
```

Inside of your prisma schema, add the following:
```
generator nestJsSwagger {
  provider = "prisma-generator-nestjs-swagger"
}
```

The output will be generated to:
```
node_modules/@generated/swagger
```

Import the resolvers:

```
import { MyDto } from '@generated/swagger';
```

---

### Example

Below is the output generated from the project's [public.prisma](./public.prisma):
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
  provider = "./dist/prisma-generator-nestjs-swagger.js"
}

model User {
  id                   Int                    @id @default(autoincrement())
  email                String?                @db.VarChar(512)
  password             String?                @db.VarChar(512)
  createdAt            DateTime?              @map("created_at") @db.Timestamptz(6)
  updatedAt            DateTime?              @map("updated_at") @db.Timestamptz(6)

  @@map("user")
  @@schema("public")
}
```

`UserDto.ts`
```typescript
import { ApiProperty } from '@nestjs/swagger';

import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString
} from 'class-validator';

export class UserDto {
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

export class CreateUserDto {
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

export class FindUniqueUserDto {
  @ApiProperty({ required: true })
  @IsNumber()
  id: number;
}

export class UpdateUserDto {
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
}

export class UpdateWhereUserDto {
  @ApiProperty({ required: true })
  @IsNumber()
  id: number;
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
  UpdateUserDto,
  UpdateWhereUserDto
} from './UserDto';
```


