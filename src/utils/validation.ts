export function validateRequired(param: any, paramName: string): void {
  if (param === undefined || param === null || param === '') {
    throw new Error(`Parameter '${paramName}' is required.`);
  }
}

export function validateType(param: any, paramName: string, expectedType: string): void {
  if (typeof param !== expectedType) {
    throw new Error(`Parameter '${paramName}' must be a ${expectedType}.`);
  }
}
