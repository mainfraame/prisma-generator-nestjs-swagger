export function generateBooleanFields(model, includeFilters = false) {
  return model.fields
    .filter((field) => field.kind === 'scalar' && field.type === 'Boolean')
    .map((field) => ({
      ...field,
      isRequired: includeFilters ? false : field.isRequired
    }))
    .map((field) => {
      return `
        ${
          includeFilters
            ? `@Transform(({value}) => typeof value === 'string' ? Boolean(value) : value)`
            : ''
        }
        @ApiProperty({ required: ${field.isRequired} })
        ${field.isRequired ? '' : '@IsOptional()'}
        @IsBoolean()
        ${includeFilters ? 'private ' : ''}${field.name}${
        field.isRequired ? '' : '?'
      }: boolean;
      `;
    })
    .join('\n\n');
}
