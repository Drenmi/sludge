const Command = require("../Command")
const Finder = require("../Finder")
const Guard = require("../Guard")
const SensoryEvent = require("../SensoryEvent")

const moveEvent = SensoryEvent.create([
  {
    sense: "SIGHT",
    magnitude: 100,
    message: (actor, direction) => `${actor} leaves ${direction}.`
  }
])

const finder = Finder.create({ scope: "room", target: "exit" })

const Move = Command.create({
  name: "move",
  arguments: [
    { tag: "exit", finder }
  ],
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
