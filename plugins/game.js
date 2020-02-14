/**
 * Helper for getting a step or question by ID
 *
 * @param {Number} id
 * @param {Array}  questions
 *
 * @return {Object}|undefined
 */
export const getItemById = (id, items) => {
  return items.find(item => item.id === id)
}

/**
 * Helper for getting a step or question by property
 *
 * @param {String} prop
 * @param {Mixed}  value
 * @param {Array}  questions
 *
 * @return {Object}|undefined
 */
export const getItemByProp = (prop, value, items) => {
  return items.find(item => item[prop] === value)
}

/**
 * Helper for getting a step or question index by ID
 *
 * @param {Number} id
 * @param {Array}  questions
 *
 * @return {Object}|undefined
 */
export const getItemIndexById = (id, items) => {
  return items.findIndex(item => item.id === id)
}
