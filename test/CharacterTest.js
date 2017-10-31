const { expect } = require("chai")

const Character = require("../src/Character")

describe("Character", function() {
  describe("#room", function() {
    context("when initialized with a room", function() {
      const character = Character.build({ room: "foo" })

      it("assigns the passed in room", function() {
        expect(character.room).to.eql("foo")
      })
    })
  })
})
