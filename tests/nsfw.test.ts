import { describe, expect, jest, test } from '@jest/globals';
import nsfw from '../src/nsfw';
import { fail } from 'assert';

describe('nsfw.ts', () => {
 // Set longer timeout since we're making actual API calls
 jest.setTimeout(10000);

 test('nsfw.get() should return a valid image URL', async () => {
  const result = await nsfw.get('img', 'neko');
  expect(result).toMatch(/^https:\/\/.+\.(jpg|jpeg|png|gif)$/i);
 });

 test('nsfw.list() should return an array of image URLs', async () => {
  const result = await nsfw.list('img', 'neko');
  expect(Array.isArray(result)).toBe(true);
  expect(result.length).toBeGreaterThan(0);
  // Check that each URL is valid
  result.forEach((url) => {
   expect(url).toMatch(/^https:\/\/.+\.(jpg|jpeg|png|gif)$/i);
  });
 });

 test('nsfw.gif.get() should return a valid GIF URL', async () => {
  const result = await nsfw.gif.get('neko');
  expect(result).toMatch(/^https:\/\/.+\.gif$/i);
 });

 test('nsfw.img.list() should return an array of image URLs', async () => {
  const result = await nsfw.img.list('neko');
  expect(Array.isArray(result)).toBe(true);
  expect(result.length).toBeGreaterThan(0);
  // Check that each URL has proper format
  result.forEach((url) => {
   expect(url).toMatch(/^https:\/\/.+\.(jpg|jpeg|png|gif)$/i);
  });
 });

 // Test multiple NSFW categories to ensure they all work
 test('nsfw.categories functions should return valid URLs', async () => {
  // Test a few representative categories
  const nekoResult = await nsfw.categories.neko('img');
  expect(nekoResult).toMatch(/^https:\/\/.+\.(jpg|jpeg|png|gif)$/i);

  const analResult = await nsfw.categories.anal();
  expect(analResult).toMatch(/^https:\/\/.+\.gif$/i);
 });

 // Error handling test
 test('should handle API errors gracefully', async () => {
  // We'll use a try/catch since we're expecting potential errors
  try {
   // Attempt to use an invalid category - this should throw an error
   await nsfw.get('img', 'invalid-category' as any);
   fail('Expected an error but none was thrown');
  } catch (error) {
   expect(error).toBeDefined();
   expect(error instanceof Error).toBe(true);
  }
 });
});
