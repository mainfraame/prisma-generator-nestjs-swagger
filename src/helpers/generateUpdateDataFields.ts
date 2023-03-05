import { mapPrismaTypeToClassValidator } from './mapPrismaTypeToClassValidator';
import { mapPrismaTypeToTsType } from './mapPrismaTypeToTsType';

export function generateUpdateDataFields(fields) {
  return fields
    .filter((field) => !field.relationName)
    .filter((field) => !field.isId)
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
