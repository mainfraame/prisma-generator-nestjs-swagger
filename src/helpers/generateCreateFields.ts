import { orderBy } from 'lodash';

import { mapPrismaTypeToClassValidator } from './mapPrismaTypeToClassValidator';
import { mapPrismaTypeToTsType } from './mapPrismaTypeToTsType';
import { mapTransformerType } from './mapTransformerType';

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
      const transformType = mapTransformerType(field.type);

      const optional = field.isRequired ? '' : '?';

      return `${transformType ? `@Transform(${transformType})` : ''}
      @ApiProperty({ required: ${field.isRequired} })
      ${classValidator ? `${classValidator}\n` : ''}
      ${field.isRequired ? '' : '@IsOptional()'}
      ${field.name}${optional}: ${tsType};`;
    })
    .join('\n\n');
}
