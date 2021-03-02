import { createMajorVersionNumber, createHandlerBasePath } from '.';

describe("'Utils' file", () => {
  let SEMVER_VERSION_NUMBER;
  let expectedVersionNumber;
  let expectedBasePath;

  beforeEach(() => {
    SEMVER_VERSION_NUMBER = '1.0.0';
    expectedVersionNumber = createMajorVersionNumber(SEMVER_VERSION_NUMBER);
    expectedBasePath = createHandlerBasePath(expectedVersionNumber);
  });

  describe("'createMajorVersionNumber' function", () => {
    it('should return the major version when a version number following semver is passed', () => {
      expect(SEMVER_VERSION_NUMBER).toMatch(/^(\d+\.)?(\d+\.)?(\*|\d+)$/);
      expect(expectedVersionNumber).toBe('1');
      expect(expectedVersionNumber).not.toBe('1.0.0');
    });
  });

  describe("'createHandlerBasePath' function", () => {
    it("should return the basePath as '/v<x>' where 'x' is a major version number when a number is given", () => {
      expect(expectedBasePath).toBe('v1');
      expect(expectedVersionNumber).not.toBe('v1.0.0');
    });
  });
});
