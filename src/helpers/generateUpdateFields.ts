import { orderBy } from 'lodash';

import { mapPrismaTypeToClassValidator } from './mapPrismaTypeToClassValidator';
import { mapPrismaTypeToTsType } from './mapPrismaTypeToTsType';

export function generateUpdateFields(model) {
  const parsedFields = orderBy(
    model.fields
      .filter((field) => !field.relationName)
      .filter((field) => field.isId),
    ['name']
  );

  const uniqueFields = parsedFields.length
    ? parsedFields
    : orderBy(
        (model.primaryKey?.fields ?? []).map((field) =>
          model.fields.find(({ name }) => name === field)
        ),
        ['name']
      );

  const nonUniqueFields = model.fields
    .filter((field) => !field.relationName)
    .filter((field) => !field.isId);

  return `
    ${uniqueFields
      .map((field) => {
        const classValidator = mapPrismaTypeToClassValidator(field.type);
        const tsType = mapPrismaTypeToTsType(field.type);

        const optional = field.isRequired ? '' : '?';

        return `@ApiProperty({ required: ${field.isRequired} })
      ${classValidator ? `${classValidator}\n` : ''}
      private ${field.name}${optional}: ${tsType};`;
      })
      .join('\n\n')}
    
    ${nonUniqueFields
      .map((field) => {
        const classValidator = mapPrismaTypeToClassValidator(field.type);
        const tsType = mapPrismaTypeToTsType(field.type);

        const optional = field.isRequired ? '' : '?';

        return `@ApiProperty({ required: ${field.isRequired} })
      ${classValidator ? `${classValidator}\n` : ''}
      private ${field.name}${optional}: ${tsType};`;
      })
      .join('\n\n')}
      
    data?: Prisma.${model.name}UpdateArgs['data'];

    where?: Prisma.${model.name}UpdateArgs['where'];
    
    private serialize(value): Prisma.${model.name}UpdateArgs {
      return {
        data: [${nonUniqueFields
          .map((field) => `'${field.name}'`)
          .join(', ')}].reduce((acc, key) => ({
          ...acc,
          ...value[key] !== undefined ? { [key]: value[key] } : {}
        }), {}),
        where: [${uniqueFields
          .map((field) => `'${field.name}'`)
          .join(', ')}].reduce((acc, key) => ({
            ...acc,
            ...value[key] !== undefined ? { [key]: value[key] } : {}
          }), {}),
      }
    }
  `;
}
