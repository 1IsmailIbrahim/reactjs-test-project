/**
 *
 * @param {string} text - the input text to be sliced.
 * @param {number} [max=100] - the maximum length before truncation.
 * @returns the sliced text, with an ellipsis (...) appended if truncated.
 */
export function textSlicer(text: string, max: number = 100) {
  if (text.length >= max) return `${text.slice(0, max)} ...`;
  return text;
}
