function actorMustBeAlive(actor) {
  const MESSAGE = `You are dead ...`

  if(actor.isAlive) {
    return true
  } else {
    return MESSAGE
  }
}

module.exports = actorMustBeAlive
