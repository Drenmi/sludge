const { expect } = require("chai")

const MoveCommand = require("../../src/commands/move")

const Character = require("../../src/Character")
const Room = require("../../src/Room")

describe("MoveCommand", function() {
  context("when the room has an exit in the given direction", function() {
    const room = Room.build({ exits: { north: "foo" } })
    const character = Character.build({ room })
    const result = MoveCommand(character, { direction: "north" })

    it("moves the character through the exit", function() {
      expect(result).to.eql("Yay!")
    })
  })

  context("when the room has no exit in the given direction", function() {
    const room = Room.build({ exits: { north: "foo" } })
    const character = Character.build({ room })
    const result = MoveCommand(character, { direction: "south" })

    it("exclaims there is no exit in the given direction", function() {
      expect(result).to.eql("There is no exit south of here.")
    })
  })

  context("when the character is dead", function() {
    const room = Room.build({ exits: { north: "foo" } })
    const character = Character.build({ room, isAlive: false })
    const result = MoveCommand(character, { direction: "north" })

    it("exclaims the character is dead", function() {
      expect(result).to.eql("You are dead ...")
    })
  })

  context("when the character is asleep", function() {
    const room = Room.build({ exits: { north: "foo" } })
    const character = Character.build({ room, isAwake: false })
    const result = MoveCommand(character, { direction: "north" })

    it("exclaims the character is not awake", function() {
      expect(result).to.eql("You are asleep ...")
    })
  })
})
