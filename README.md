# prisma-generator-nestjs-swagger

This generator is used to create all the possible dto classes you'll need for 
prisma crud operations. Include:

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

Below is the example output from [public.prisma](./public.prisma):

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


