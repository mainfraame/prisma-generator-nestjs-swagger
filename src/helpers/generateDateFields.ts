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
      return `@Transform(${field.transformType})
    @ApiProperty({ type: () => String, format: 'date-time', required: ${
      field.isRequired
    } })
    ${field.isRequired ? '' : '@IsOptional()'}
    @IsDate()
    ${field.name}${field.isRequired ? '' : '?'}: Date;`;
    })
    .join('\n\n');
}
