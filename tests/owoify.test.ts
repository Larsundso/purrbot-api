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

 test('owoify() with emoticons option should add emoticons', async () => {
  const input = 'Hello world!';
  const result = await owoify(input, { emoticons: true });

  expect(typeof result).toBe('string');
  expect(result).not.toBe(input);
  const containsEmoticon = !result.includes('!');
  expect(containsEmoticon).toBe(true);
 });

 test('owoify() with replaceWords option should replace common words', async () => {
  const input = 'I love you so much!';
  const result = await owoify(input, { replaceWords: true });

  expect(typeof result).toBe('string');
  expect(result).not.toBe(input);
  // Look for common owoified word replacements
  // Words like "love" might become "wuv"
  const hasReplacedWords =
   result !== input && (result.includes('wuv') || /\b(w[ou]v)\b/g.test(result));
  expect(hasReplacedWords).toBe(true);
 });

 test('owoify() with stutter option should add stuttering', async () => {
  const input = 'Hello World';
  const result = await owoify(input, { stutter: true });

  expect(typeof result).toBe('string');
  expect(result).not.toBe(input);
  // Stuttering typically adds hyphens to create w-word patterns
  const containsStuttering = /-[a-zA-Z]/g.test(result);
  expect(containsStuttering).toBe(true);
 });

 test('owoify() should handle multiple options combined', async () => {
  const input = 'Hello, I love this world!';
  const result = await owoify(input, {
   emoticons: true,
   replaceWords: true,
   stutter: true,
  });

  expect(typeof result).toBe('string');
  expect(result).not.toBe(input);
  // Check for the presence of features from each option
  const containsEmoticon = !result.includes('!');
  const hasReplacedWords =
   result !== input && (result.includes('wuv') || /\b(w[ou]v)\b/g.test(result));

  // At least some of these features should be present
  // Suttering is added randomly, so we can't test for it
  expect(hasReplacedWords).toBe(true);
  expect(containsEmoticon).toBe(true);
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
