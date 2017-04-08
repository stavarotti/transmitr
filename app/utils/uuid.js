// The number to increment and use as the uuid.
let _uuid = 0;

/**
  Creates and returns a uuid.

  @public
  @function
  @returns {String} A uuid.
  */
export default function uuid() {
  return `t-${++_uuid}`;
}
