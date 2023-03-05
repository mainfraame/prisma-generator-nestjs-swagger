import { orderBy } from 'lodash';

import { mapPrismaTypeToClassValidator } from './mapPrismaTypeToClassValidator';
import { mapPrismaTypeToTsType } from './mapPrismaTypeToTsType';

export function generateFindUniqueFields(fields, model) {
  const parsedFields = orderBy(
    fields.filter((field) => !field.relationName).filter((field) => field.isId),
    ['name']
  );

  const finalFields = parsedFields.length
    ? parsedFields
    : orderBy(
        (model.primaryKey?.fields ?? []).map((field) =>
          fields.find(({ name }) => name === field)
        ),
        ['name']
      );

  return finalFields
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
