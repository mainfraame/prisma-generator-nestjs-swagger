import { orderBy } from 'lodash';

import { mapPrismaTypeToClassValidator } from './mapPrismaTypeToClassValidator';
import { mapPrismaTypeToTsType } from './mapPrismaTypeToTsType';

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

      return `@ApiProperty({ required: false })
      ${classValidator ? `${classValidator}\n` : ''}
      @IsOptional()
      ${field.name}?: ${tsType};`;
    })
    .join('\n\n');
}
