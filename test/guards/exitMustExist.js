const { expect } = require("chai")

const exitMustExist = require("../../src/guards/exitMustExist")

const Character = require("../../src/Character")
const Room = require("../../src/Room")

describe("exitMustExist", function() {
  context("when the room has an exit in the given direction", function() {
    const room = Room.build({ exits: { north: "foo" } })
    const character = Character.build({ room })
    const result = exitMustExist(character, { direction: "north" })

    it("returns true", function() {
      expect(result).to.be.true
    })
  })

  context("when the room does not have an exit in the given direction", function() {
    const room = Room.build({ exits: { north: "foo" } })
    const character = Character.build({ room })
    const result = exitMustExist(character, { direction: "south" })

    it("returns a formatted failure message", function() {
      expect(result).to.eql("There is no exit south of here.")
    })
  })
})
