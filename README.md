# prisma-generator-nestjs-swagger

This generator is used to create all the possible dto classes you'll need for
prisma crud operations, while also supporting open-api specs, including:

- Create
- Delete
- FindMany
- FindUnique
- Update

It includes an extended ValidationPipe serializer that will transform the DTO to
match the expected prisma query object. It includes support for filtering and ordering.

### Getting Started

1. Install the generator

```
npm i prisma-generator-nestjs-swagger
```

2. Inside your prisma schema, add the following:

```
generator nestJsSwagger {
  provider = "prisma-generator-nestjs-swagger"
}
```

The output will be generated to:

```
node_modules/@generated/swagger
```

3. Add the SwaggerSerializer as a global pipe:

```
import { SwaggerSerializer } from '@generated/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new SwaggerSerializer({transform: true}));
  
  await app.listen(3000);
}
```

4. Import & use the generated DTOs (based on code generated in example):

```typescript
import { FindManyUserDto } from '@generated/swagger';
import { Controller, Get, Query, Req, Res } from '@nestjs/common';

// assumed import of prisma wrapped service
import { PrismaService } from '../prisma/prisma.service';

@Controller()
export class UserController {
  constructor(private prisma: PrismaService) {
  }

  @Get('/users')
  async getUsers(
    @Query() query: FindManyUserDto,
    @Req() req,
    @Res() res
  ) {
    const value = await this.prisma.user.findMany({
      cursor: query.cursor,
      orderBy: query.orderBy,
      skip: query.skip,
      take: query.take,
      where: query.where
    });

    return res.send(value);
  }
}

```

---

### Supported Filters

| suffix       | description              | types supported        | 
|--------------|--------------------------|------------------------|
| __gt         | greater than             | Number, Date, DateTime |
| __gte        | greater than or equal to | Number, Date, DateTime |
| __lt         | less than                | Number, Date, DateTime |
| __lte        | less than or equal to    | Number, Date, DateTime |
| __contains   | starts containing        | String                 |
| __endsWith   | starts ends with         | String                 |
| __startsWith | starts starts with       | String                 |

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

import { serializer } from './serializer';

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
  private config?: Prisma.NullableJsonNullValueInput | Prisma.InputJsonValue;

  @Transform(({ value }) =>
    typeof value === 'string' ? new Date(value) : value
  )
  @ApiProperty({ format: 'date-time', required: false })
  @IsOptional()
  @IsDate()
  private createdAt?: Date;
  @Transform(({ value }) =>
    typeof value === 'string' ? new Date(value) : value
  )
  @ApiProperty({ format: 'date-time', required: false })
  @IsOptional()
  @IsDate()
  private createdAt__lt?: Date;

  @Transform(({ value }) =>
    typeof value === 'string' ? new Date(value) : value
  )
  @ApiProperty({ format: 'date-time', required: false })
  @IsOptional()
  @IsDate()
  private createdAt__lte?: Date;

  @Transform(({ value }) =>
    typeof value === 'string' ? new Date(value) : value
  )
  @ApiProperty({ format: 'date-time', required: false })
  @IsOptional()
  @IsDate()
  private createdAt__gt?: Date;

  @Transform(({ value }) =>
    typeof value === 'string' ? new Date(value) : value
  )
  @ApiProperty({ format: 'date-time', required: false })
  @IsOptional()
  @IsDate()
  private createdAt__gte?: Date;

  @Transform(({ value }) =>
    typeof value === 'string' ? new Date(value) : value
  )
  @ApiProperty({ format: 'date-time', required: false })
  @IsOptional()
  @IsDate()
  private updatedAt?: Date;
  @Transform(({ value }) =>
    typeof value === 'string' ? new Date(value) : value
  )
  @ApiProperty({ format: 'date-time', required: false })
  @IsOptional()
  @IsDate()
  private updatedAt__lt?: Date;

  @Transform(({ value }) =>
    typeof value === 'string' ? new Date(value) : value
  )
  @ApiProperty({ format: 'date-time', required: false })
  @IsOptional()
  @IsDate()
  private updatedAt__lte?: Date;

  @Transform(({ value }) =>
    typeof value === 'string' ? new Date(value) : value
  )
  @ApiProperty({ format: 'date-time', required: false })
  @IsOptional()
  @IsDate()
  private updatedAt__gt?: Date;

  @Transform(({ value }) =>
    typeof value === 'string' ? new Date(value) : value
  )
  @ApiProperty({ format: 'date-time', required: false })
  @IsOptional()
  @IsDate()
  private updatedAt__gte?: Date;

  @Transform(({ value }) => (typeof value === 'string' ? +value : value))
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  private id?: number;

  @Transform(({ value }) => (typeof value === 'string' ? +value : value))
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  private id__lt?: number;

  @Transform(({ value }) => (typeof value === 'string' ? +value : value))
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  private id__lte?: number;

  @Transform(({ value }) => (typeof value === 'string' ? +value : value))
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  private id__gt?: number;

  @Transform(({ value }) => (typeof value === 'string' ? +value : value))
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  private id__gte?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  private email?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  private email__contains?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  private email__startsWith?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  private email__endsWith?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  private password?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  private password__contains?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  private password__startsWith?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  private password__endsWith?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  private order?:
    | 'id_asc'
    | 'id_desc'
    | 'email_asc'
    | 'email_desc'
    | 'password_asc'
    | 'password_desc'
    | 'createdAt_asc'
    | 'createdAt_desc'
    | 'updatedAt_asc'
    | 'updatedAt_desc'
    | 'config_asc'
    | 'config_desc';

  @Transform(({ value }) => (typeof value === 'string' ? +value : value))
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  skip?: number;

  @Transform(({ value }) => (typeof value === 'string' ? +value : value))
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  take?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  cursor?: Prisma.UserWhereUniqueInput;

  where?: Prisma.UserWhereInput;

  orderBy?: Prisma.Enumerable<Prisma.UserOrderByWithRelationInput>;

  private serialize(value): Prisma.UserFindManyArgs {
    return serializer<Prisma.UserFindManyArgs>(value);
  }
}

export class FindUniqueUserDto {
  @Transform(({ value }) => (typeof value === 'string' ? +value : value))
  @ApiProperty({ required: true })
  @IsNumber()
  private id: number;

  where?: Prisma.UserWhereUniqueInput;

  private serialize(value): Prisma.UserFindUniqueArgs {
    return serializer<Prisma.UserFindUniqueArgs>(value);
  }
}

export class UpdateUserDto {
  @ApiProperty({ required: true })
  @IsNumber()
  private id: number;

  @ApiProperty({ required: false })
  @IsString()
  private email?: string;

  @ApiProperty({ required: false })
  @IsString()
  private password?: string;

  @ApiProperty({ required: false })
  @IsDate()
  private createdAt?: Date;

  @ApiProperty({ required: false })
  @IsDate()
  private updatedAt?: Date;

  @ApiProperty({ required: false })
  private config?: Prisma.NullableJsonNullValueInput | Prisma.InputJsonValue;

  data?: Prisma.UserUpdateArgs['data'];

  where?: Prisma.UserUpdateArgs['where'];

  private serialize(value): Prisma.UserUpdateArgs {
    return {
      data: ['email', 'password', 'createdAt', 'updatedAt', 'config'].reduce(
        (acc, key) => ({
          ...acc,
          ...(value[key] !== undefined ? { [key]: value[key] } : {})
        }),
        {}
      ),
      where: ['id'].reduce(
        (acc, key) => ({
          ...acc,
          ...(value[key] !== undefined ? { [key]: value[key] } : {})
        }),
        {}
      )
    };
  }
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


