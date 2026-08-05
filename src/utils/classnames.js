export function cnBEM(blockElement, modifier, condition) {
  if (!condition || !modifier) return blockElement;
  return `${blockElement} ${blockElement}--${modifier}`;
}
