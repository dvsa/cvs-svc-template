const createMajorVersionNumber = (num: string): string => {
  if (!num) {
    throw new Error(
      '"API_VERSION" environmental variable matching semver convention must be provided before running your npm script',
    );
  }
  return num.split('.')[0];
};
const createHandlerBasePath = (s: string): string => `v${s}`;

export { createMajorVersionNumber, createHandlerBasePath };
