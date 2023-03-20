
function convertStringToValidJsonDate(string) {
  return string === '-' ? '-' : new Date(string).toJSON()
}

module.exports = { convertStringToValidJsonDate }