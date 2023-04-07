import { orderBy } from 'lodash';

import { mapPrismaTypeToClassValidator } from './mapPrismaTypeToClassValidator';
import { mapPrismaTypeToTsType } from './mapPrismaTypeToTsType';
import { mapTransformerType } from './mapTransformerType';

export function generateFindUniqueFields(model) {
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

  const apiFields = finalFields
    .map((field) => {
      const classValidator = mapPrismaTypeToClassValidator(field.type);
      const tsType = mapPrismaTypeToTsType(field.type);
      const transformType = mapTransformerType(field.type);

      const optional = field.isRequired ? '' : '?';

      return `
      ${transformType ? `@Transform(${transformType})` : ''}
      @ApiProperty({ required: ${field.isRequired} })
      ${classValidator ? `${classValidator}\n` : ''}
      ${field.name}${optional}: ${tsType};
      `;
    })
    .join('\n\n');

  return `
    ${apiFields}
    
    // where?: Prisma.${model.name}WhereUniqueInput;
  `;
}
