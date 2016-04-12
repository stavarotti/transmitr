// The number to increment and use as the guid.
let guid = 0;

/**
  Creates and returns a guid.

  @public
  @function
  @returns {String} A guid.
  */
export default function generateGuid() {
  return `st-${++guid}`;
}
