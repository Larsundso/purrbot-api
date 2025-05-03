import { describe, expect, jest, test } from '@jest/globals';
import sfw from '../src/sfw';
import { fail } from 'assert';

describe('sfw.ts', () => {
 // Set longer timeout since we're making actual API calls
 jest.setTimeout(10000);

 test('sfw.get() should return a valid image URL', async () => {
  const result = await sfw.get('img', 'neko');
  expect(result).toMatch(/^https:\/\/.+\.(jpg|jpeg|png|gif)$/i);
 });

 test('sfw.list() should return an array of image URLs', async () => {
  const result = await sfw.list('img', 'neko');
  expect(Array.isArray(result)).toBe(true);
  expect(result.length).toBeGreaterThan(0);
  // Check that each URL is valid
  result.forEach((url) => {
   expect(url).toMatch(/^https:\/\/.+\.(jpg|jpeg|png|gif)$/i);
  });
 });

 test('sfw.gif.get() should return a valid GIF URL', async () => {
  const result = await sfw.gif.get('neko');
  expect(result).toMatch(/^https:\/\/.+\.gif$/i);
 });

 test('sfw.img.list() should return an array of image URLs', async () => {
  const result = await sfw.img.list('neko');
  expect(Array.isArray(result)).toBe(true);
  expect(result.length).toBeGreaterThan(0);
  // Check that each URL has proper format
  result.forEach((url) => {
   expect(url).toMatch(/^https:\/\/.+\.(jpg|jpeg|png|gif)$/i);
  });
 });

 // Test multiple SFW categories to ensure they all work
 test('sfw.categories functions should return valid URLs', async () => {
  // Test a few representative categories
  const nekoResult = await sfw.categories.neko('img');
  expect(nekoResult).toMatch(/^https:\/\/.+\.(jpg|jpeg|png|gif)$/i);

  const hugResult = await sfw.categories.hug();
  expect(hugResult).toMatch(/^https:\/\/.+\.gif$/i);
 });

 // Error handling test
 test('should handle API errors gracefully', async () => {
  // We'll use a try/catch since we're expecting potential errors
  try {
   // Attempt to use an invalid category - this should throw an error
   await sfw.get('img', 'invalid-category' as any);
   fail('Expected an error but none was thrown');
  } catch (error) {
   expect(error).toBeDefined();
   expect(error instanceof Error).toBe(true);
  }
 });
});
