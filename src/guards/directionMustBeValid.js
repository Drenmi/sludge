const { Direction } = require("../World")

function directionMustBeValid(actor, { direction }) {
  const MESSAGE = `Move where?`

  if(Direction.search(direction)) {
    return true
  } else {
    return MESSAGE
  }
}

module.exports = directionMustBeValid
