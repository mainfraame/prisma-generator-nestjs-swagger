# prisma-generator-nestjs-swagger

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
```


`index.ts`
```typescript
export { UserDto } from './UserDto';
```


