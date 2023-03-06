export function generateJsonFields(model, includeFilters = false) {
  return model.fields
    .filter((field) => field.kind === 'scalar' && field.type === 'Json')
    .map((field) => ({
      ...field,
      isRequired: includeFilters ? false : field.isRequired
    }))
    .map(
      (field) => `
        @ApiProperty({ required: ${field.isRequired} })
        ${field.isRequired ? '' : '@IsOptional()'}
        @IsObject()
        ${includeFilters ? 'private ' : ''}${field.name}${
        field.isRequired ? '' : '?'
      }: ${
        field.isRequired
          ? 'Prisma.InputJsonValue'
          : 'Prisma.NullableJsonNullValueInput | Prisma.InputJsonValue'
      };
    `
    )
    .join('\n\n');
}
