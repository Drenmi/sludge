function actorMustBeAwake(actor) {
  const MESSAGE = `You are asleep ...`

  if(actor.isAwake) {
    return true
  } else {
    return MESSAGE
  }
}

module.exports = actorMustBeAwake
