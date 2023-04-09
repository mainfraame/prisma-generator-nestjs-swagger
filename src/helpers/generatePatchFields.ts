import { orderBy } from 'lodash';

import { mapPrismaTypeToClassValidator } from './mapPrismaTypeToClassValidator';
import { mapPrismaTypeToTsType } from './mapPrismaTypeToTsType';
import { mapTransformerType } from './mapTransformerType';

export function generatePatchFields(model) {
  return orderBy(
    model.fields.filter((field) => {
      return !field.relationName;
    }),
    ['name']
  )
    .map((field) => {
      const classValidator = mapPrismaTypeToClassValidator(field.type);
      const tsType = mapPrismaTypeToTsType(field.type);
      const transformType = mapTransformerType(field.type);

      return `${transformType ? `@Transform(${transformType})` : ''}
      @ApiProperty({ required: false })
      ${classValidator ? `${classValidator}\n` : ''}
      @IsOptional()
      ${field.name}?: ${tsType};`;
    })
    .join('\n\n');
}
