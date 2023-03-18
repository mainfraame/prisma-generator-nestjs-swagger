# prisma-generator-nestjs-swagger

This generator is used to create all the possible dto classes you'll need for
prisma crud operations, while also supporting open-api specs, including:

- Create
- Delete
- FindMany
- FindUnique
- Update

It includes an extended ValidationPipe serializer that will transform the DTO to
match the expected prisma query object. It includes support for pagination (skip/take or cursor),
filtering and ordering.

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

3. Add the SwaggerSerializer as a global pipe **_(optional)_**:

```
import { SwaggerSerializer } from '@generated/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new SwaggerSerializer({transform: true}));

  await app.listen(3000);
}
```

_\*_ This is a wrapper around [ValidationPipe](https://docs.nestjs.com/techniques/validation) that invokes
a serialized method no the generated DTOs.

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
  async getUsers(@Query() query: FindManyUserDto, @Req() req, @Res() res) {
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

| suffix       | description              | types supported        | Example                                 |
|--------------|--------------------------|------------------------|-----------------------------------------|
| __gt         | greater than             | Number, Date, DateTime | createdAt__gt=2023-03-18T16:51:33.991Z  |
| __gte        | greater than or equal to | Number, Date, DateTime | createdAt__gte=2023-03-18T16:51:33.991Z |
| __lt         | less than                | Number, Date, DateTime | createdAt__lt=2023-03-18T16:51:33.991Z  |
| __lte        | less than or equal to    | Number, Date, DateTime | createdAt__lte=2023-03-18T16:51:33.991Z |
| __contains   | starts containing        | String                 | email__contains=test                    |
| __endsWith   | starts ends with         | String                 | email__endsWith=@gmail.com              |
| __startsWith | starts starts with       | String                 | email__startsWith=test@                 |

---

### Examples

See our this [doc](https://github.com/mainfraame/prisma-generator-nestjs-swagger/docs/Example.md) for an example output
