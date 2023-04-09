import { generateBooleanFields } from './generateBooleanFields';
import { generateDateFields } from './generateDateFields';
import { generateJsonFields } from './generateJsonFields';
import { generateNumericFields } from './generateNumericFields';
// import { generateOrderByFields } from './generateOrderByFields';
// import { generatePaginationFields } from './generatePaginationFields';
import { generateStringFields } from './generateStringFields';

export function generateFindManyFields(model) {
  const apiProperties = [
    generateBooleanFields(model, true),
    generateJsonFields(model, true),
    generateDateFields(model, true),
    generateNumericFields(model, true),
    generateStringFields(model, true)
    // generateOrderByFields(model, true),
    // generatePaginationFields(model, true)
  ]
    .filter((b) => b)
    .join('\n\n');

  return `
    ${apiProperties}
  `;
}
