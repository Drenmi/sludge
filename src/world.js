const Enum = require("./Enum")

const Direction = Enum.define("NORTH", "EAST", "SOUTH", "WEST", "UP", "DOWN")
const Sense = Enum.define("SIGHT", "HEARING", "TOUCH", "SMELL", "TASTE")

module.exports = { Direction, Sense }
