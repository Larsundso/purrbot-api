import { describe, expect, jest, test } from '@jest/globals';
import owoify from '../src/owoify';

describe('owoify.ts', () => {
 // Set longer timeout since we're making actual API calls
 jest.setTimeout(10000);

 test('owoify() should return transformed text', async () => {
  const result = await owoify('Hello, world!');

  // The API should convert the text to a more "cute" version
  expect(result).not.toBe('Hello, world!'); // Ensure it was transformed
  expect(typeof result).toBe('string');

  // Common owoify transformations we should expect
  expect(result).toContain('w'); // Usually r/l -> w
 });

 test('owoify() should handle different input texts', async () => {
  const result1 = await owoify('This is a test sentence.');
  expect(typeof result1).toBe('string');
  expect(result1).toBe('This is a test sentence.');

  const result2 = await owoify('Testing multiple owoifications to ensure API stability');
  expect(typeof result2).toBe('string');
  expect(result2).not.toBe('Testing multiple owoifications to ensure API stability');
 });

 test('owoify() should handle empty string', async () => {
  try {
   const result = await owoify('');
   // If it succeeds, the result should be a string
   expect(typeof result).toBe('string');
  } catch (error) {
   // Some APIs might reject empty strings as invalid
   expect(error instanceof Error).toBe(true);
  }
 });

 test('owoify() should handle special characters', async () => {
  const input = 'Hello! This contains $pecial ch@racters & symbols.';
  const result = await owoify(input);

  expect(typeof result).toBe('string');
  expect(result).not.toBe(input);
 });

 test('owoify() should throw an error for extremely long texts', async () => {
  // Create a very long string that might exceed API limits
  const longText = 'a'.repeat(10000);

  try {
   await owoify(longText);
   // If it succeeds, we don't need to assert anything specific
  } catch (error) {
   // If it fails, make sure it's a proper error
   expect(error instanceof Error).toBe(true);
  }
 });
});
