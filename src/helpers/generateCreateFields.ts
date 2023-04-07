import { orderBy } from 'lodash';

import { mapPrismaTypeToClassValidator } from './mapPrismaTypeToClassValidator';
import { mapPrismaTypeToTsType } from './mapPrismaTypeToTsType';

export function generateCreateFields(model) {
  return orderBy(
    model.fields.filter((field) => {
      return !field.relationName && !field.isId;
    }),
    ['name']
  )
    .map((field) => {
      const classValidator = mapPrismaTypeToClassValidator(field.type);
      const tsType = mapPrismaTypeToTsType(field.type);

      const optional = field.isRequired ? '' : '?';

      return `@ApiProperty({ required: ${field.isRequired} })
      ${classValidator ? `${classValidator}\n` : ''}
      ${field.name}${optional}: ${tsType};`;
    })
    .join('\n\n');
}
