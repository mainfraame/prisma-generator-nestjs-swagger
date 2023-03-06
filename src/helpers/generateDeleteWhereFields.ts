import { orderBy } from 'lodash';

import { mapPrismaTypeToClassValidator } from './mapPrismaTypeToClassValidator';
import { mapPrismaTypeToTsType } from './mapPrismaTypeToTsType';

export function generateDeleteWhereFields(model) {
  const parsedFields = orderBy(
    model.fields
      .filter((field) => !field.relationName)
      .filter((field) => field.isId),
    ['name']
  );

  const finalFields = parsedFields.length
    ? parsedFields
    : orderBy(
        (model.primaryKey?.fields ?? []).map((field) =>
          model.fields.find(({ name }) => name === field)
        ),
        ['name']
      );

  return finalFields
    .map((field) => {
      const classValidator = mapPrismaTypeToClassValidator(field.type);
      const tsType = mapPrismaTypeToTsType(field.type);

      return `@ApiProperty({ required: ${field.isRequired} })
      ${classValidator ? `${classValidator}\n` : ''}
      ${field.name}: ${tsType};`;
    })
    .join('\n\n');
}
