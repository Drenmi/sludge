const actorMustBeAlive = require("./guards/actorMustBeAlive")
const actorMustBeAwake = require("./guards/actorMustBeAwake")
const directionMustBeValid = require("./guards/directionMustBeValid")
const exitMustExist = require("./guards/exitMustExist")

const Guard = {
  actorMustBeAlive,
  actorMustBeAwake,
  directionMustBeValid,
  exitMustExist
}

module.exports = Guard
