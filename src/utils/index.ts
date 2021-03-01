const createMajorVersionNumber = (num: string): string => num.split('.')[0];
const createHandlerBasePath = (s: string): string => `v${s}`;

export { createMajorVersionNumber, createHandlerBasePath };
