export function generateStringFields(model, includeFilters = false) {
  return model.fields
    .filter((field) => field.kind === 'scalar' && field.type === 'String')
    .map((field) => ({
      ...field,
      isRequired: includeFilters ? false : field.isRequired
    }))
    .map((field) => {
      return `
        @ApiProperty({ required: ${field.isRequired} })
        ${field.isRequired ? '' : '@IsOptional()'}
        ${field.isRequired ? '@IsNotEmpty()' : ''}
        @IsString()
        ${field.name}${
        // ${includeFilters ? 'private ' : ''}${field.name}${
        field.isRequired ? '' : '?'
      }: string;
      `;
      //
      // const filters = `
      //   @ApiProperty({ required: false })
      //   @IsOptional()
      //   @IsString()
      //   ${includeFilters ? 'private ' : ''}${field.name}__contains?: string;
      //
      //   @ApiProperty({ required: false })
      //   @IsOptional()
      //   @IsString()
      //   ${includeFilters ? 'private ' : ''}${field.name}__startsWith?: string;
      //
      //   @ApiProperty({ required: false })
      //   @IsOptional()
      //   @IsString()
      //   ${includeFilters ? 'private ' : ''}${field.name}__endsWith?: string;
      // `;
      //
      // return `${code}${includeFilters ? filters : ''}`;
      // return `${code}${includeFilters ? filters : ''}`;
    })
    .join('\n\n');
}
