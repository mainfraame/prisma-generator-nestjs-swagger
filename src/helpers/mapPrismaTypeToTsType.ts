const FieldTsTypes = {
  BigInt: 'number',
  Boolean: 'boolean',
  DateTime: 'Date',
  Decimal: 'number',
  Int: 'number',
  Json: 'Prisma.NullableJsonNullValueInput | Prisma.InputJsonValue',
  String: 'string',
  Float: 'number'
};

export const mapPrismaTypeToTsType = (type) => {
  return FieldTsTypes[type];
};
