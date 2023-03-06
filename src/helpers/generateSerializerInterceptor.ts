export function generateSerializerInterceptor() {
  return `
    import { ArgumentMetadata, Injectable, ValidationPipe } from '@nestjs/common';

    @Injectable()
    export class SwaggerSerializer extends ValidationPipe {
      async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
        const cls = await super.transform(value, metadata);

        /** serialize response; put request into correct format */
        return typeof cls?.serialize === 'function' ? cls.serialize(cls) : cls;
      }
    }
  `;
}
