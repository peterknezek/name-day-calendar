/**
 * Filter from Array `null, undefined, ""`
 * @returns filtred Array
 * @usage ```
 * [...].filter(isNotEmpty)
 * ```
 */
export const isNotEmpty = <Value>(value: Value | null | undefined | string): value is Value => {
  return value !== null && value !== undefined && value !== '';
};
