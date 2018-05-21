const Command = require("../Command")
const Finder = require("../Finder")
const Guard = require("../Guard")

const finder = Finder.create({ scope: "room", target: "thing" })

const Move = Command.create({
  arguments: [
    { tag: "target", finder }
  ],
  guards: [
    Guard.actorMustBeAlive,
    Guard.actorMustBeAwake
  ]
})

module.exports = Move
