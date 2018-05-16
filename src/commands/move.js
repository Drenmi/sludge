const Command = require("../Command")
const Guard = require("../Guard")
const SensoryEvent = require("../SensoryEvent")

const moveEvent = SensoryEvent.create([
  {
    sense: "SIGHT",
    magnitude: 100,
    message: (actor) => `${actor} leaves.`
  }
])

const Move = Command.create({
  guards: [
    Guard.actorMustBeAlive,
    Guard.actorMustBeAwake,
    Guard.directionMustBeValid,
    Guard.exitMustExist
  ],
  events: [
    moveEvent
  ]
})

module.exports = Move
