import { describe, expect, jest, test } from '@jest/globals';
import { get, list } from '../src/util';
import { fail } from 'assert';

describe('util.ts', () => {
 // Set longer timeout since we're making actual API calls
 jest.setTimeout(10000);

 test('get() should return a valid image URL for SFW content', async () => {
  const result = await get('img', false, 'neko');
  expect(result).toMatch(/^https:\/\/.+\.(jpg|jpeg|png|gif)$/i);
 });

 test('get() should return a valid image URL for NSFW content', async () => {
  const result = await get('img', true, 'neko');
  expect(result).toMatch(/^https:\/\/.+\.(jpg|jpeg|png|gif)$/i);
 });

 test('get() should throw an error for invalid category', async () => {
  try {
   // @ts-expect-error - Invalid category type
   await get('img', false, 'invalid-category');
   fail('Expected an error but none was thrown');
  } catch (error) {
   expect(error).toBeDefined();
   expect(error instanceof Error).toBe(true);
  }
 });

 test('list() should return an array of image URLs for SFW content', async () => {
  const result = await list('img', false, 'neko');
  expect(Array.isArray(result)).toBe(true);
  expect(result.length).toBeGreaterThan(0);

  // Check that each URL is valid
  result.forEach((url) => {
   expect(url).toMatch(/^https:\/\/.+\.(jpg|jpeg|png|gif)$/i);
  });
 });

 test('list() should return an array of image URLs for NSFW content', async () => {
  const result = await list('img', true, 'neko');
  expect(Array.isArray(result)).toBe(true);
  expect(result.length).toBeGreaterThan(0);

  // Check that each URL is valid
  result.forEach((url) => {
   expect(url).toMatch(/^https:\/\/.+\.(jpg|jpeg|png|gif)$/i);
  });
 });

 test('list() should throw an error for invalid category', async () => {
  try {
   // @ts-expect-error - Invalid category type
   await list('img', false, 'invalid-category');
   fail('Expected an error but none was thrown');
  } catch (error) {
   expect(error).toBeDefined();
   expect(error instanceof Error).toBe(true);
  }
 });

 test('get() should handle different image types correctly', async () => {
  // Test both 'gif' and 'img' types
  const gifResult = await get('gif', false, 'neko');
  expect(gifResult).toMatch(/^https:\/\/.+\.gif$/i);

  const imgResult = await get('img', false, 'neko');
  expect(imgResult).toMatch(/^https:\/\/.+\.(jpg|jpeg|png|gif)$/i);
 });
});
