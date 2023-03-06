import { mapTransformerType } from './mapTransformerType';

export function generateDateFields(model, includeFilters = false) {
  return model.fields
    .filter((field) => field.kind === 'scalar' && field.type === 'DateTime')
    .map((field) => ({
      ...field,
      isRequired: includeFilters ? false : field.isRequired,
      transformType: mapTransformerType(field.type)
    }))
    .map((field) => {
      const code = `@Transform(${field.transformType})
    @ApiProperty({ format: 'date-time', required: ${field.isRequired} })
    ${field.isRequired ? '' : '@IsOptional()'}
    @IsDate()
    ${includeFilters ? 'private ' : ''}${field.name}${
        field.isRequired ? '' : '?'
      }: Date;`;

      const filters = `
    @Transform(${field.transformType})
    @ApiProperty({ format: 'date-time', required: false })
    @IsOptional()
    @IsDate()
    ${includeFilters ? 'private ' : ''}${field.name}__lt?: Date;

    @Transform(${field.transformType})
    @ApiProperty({ format: 'date-time', required: false })
    @IsOptional()
    @IsDate()
    ${includeFilters ? 'private ' : ''}${field.name}__lte?: Date;

    @Transform(${field.transformType})
    @ApiProperty({ format: 'date-time', required: false })
    @IsOptional()
    @IsDate()
    ${includeFilters ? 'private ' : ''}${field.name}__gt?: Date;
    
    @Transform(${field.transformType})
    @ApiProperty({ format: 'date-time', required: false })
    @IsOptional()
    @IsDate()
    ${includeFilters ? 'private ' : ''}${field.name}__gte?: Date;
  `;
      return `${code}${includeFilters ? filters : ''}`;
    })
    .join('\n\n');
}
