"use strict";
/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    setupFilesAfterEnv: ['./jest.setup.ts'],
    testPathIgnorePatterns: ['<rootDir>/dist/']
};
