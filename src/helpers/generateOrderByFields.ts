export function generateOrderByFields(model, includeFilters = false) {
  if (!includeFilters) {
    return '';
  }

  const possibleOrders = model.fields
    .filter((field) => field.kind === 'scalar')
    .reduce(
      (acc, field) => [...acc, `'${field.name}_asc'`, `'${field.name}_desc'`],
      []
    );

  return `
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    private order?: ${possibleOrders.join(' | ')};
  `;
}
