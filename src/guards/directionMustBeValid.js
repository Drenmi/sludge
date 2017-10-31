const { Direction } = require("../world")

function directionMustBeValid(actor, { direction }) {
  const MESSAGE = `Move where?`

  if(Direction.search(direction)) {
    return true
  } else {
    return MESSAGE
  }
}

module.exports = directionMustBeValid
