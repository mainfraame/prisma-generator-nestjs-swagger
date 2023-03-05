const FieldTsTypes = {
  BigInt: 'number',
  Boolean: 'boolean',
  DateTime: 'Date',
  Decimal: 'number',
  Int: 'number',
  Json: 'Record<string, unknown>',
  String: 'string',
  Float: 'number'
};

export const mapPrismaTypeToTsType = (type) => {
  return FieldTsTypes[type];
};
