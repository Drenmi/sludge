const { expect } = require("chai")

const Room = require("../src/Room")

describe("Room", function() {
  describe("#exits", function() {
    context("when initialized without arguments", function() {
      const room = Room.build()

      it("has keys for all cardinal directions", function() {
        expect(room.exits).to.have.all.keys("north", "east", "south", "west", "up", "down")
      })
    })

    context("when initialized with an exit", function() {
      const room = Room.build({ exits: { north: "foo" } })

      it("assigns the passed in exits", function() {
        expect(room.exits.north).to.eql("foo")
      })

      it("keeps the default exits for other directions", function() {
        expect(room.exits.south).to.be.null
      })
    })
  })
})
