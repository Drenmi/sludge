const Command = require("../Command")
const Guard = require("../Guard")
const SensoryEvent = require("../SensoryEvent")

const yawnEvent = SensoryEvent.create([
  {
    sense: "SIGHT",
    magnitude: 100,
    message: ({ actor }) => `${actor.name} yawns.`
  }
])

const Yawn = Command.create({
  name: "yawn",
  guards: [
    Guard.actorMustBeAlive,
    Guard.actorMustBeAwake
  ],
  onSuccess: function(context) {
    context.actor.room.emit(yawnEvent, context)
  }
})

module.exports = Yawn
