require("../support/helpers")

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

    it("exclaims there is no exit in the given direction", function() {
      MoveCommand(character, { direction: "south" })

      expect(character).to.notice("There is no exit south of here.")
    })
  })

  context("when the character is dead", function() {
    const room = Room.build({ exits: { north: "foo" } })
    const character = Character.build({ room, isAlive: false })

    it("exclaims the character is dead", function() {
      MoveCommand(character, { direction: "north" })

      expect(character).to.notice("You are dead ...")
    })
  })

  context("when the character is asleep", function() {
    const room = Room.build({ exits: { north: "foo" } })
    const character = Character.build({ room, isAwake: false })

    it("exclaims the character is not awake", function() {
      MoveCommand(character, { direction: "north" })

      expect(character).to.notice("You are asleep ...")
    })
  })
})
