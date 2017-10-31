function exitMustExist(actor, { direction }) {
  const MESSAGE = `There is no exit ${direction} of here.`

  if(actor.room.exits[direction]) {
    return true
  } else {
    return MESSAGE
  }
}

module.exports = exitMustExist
