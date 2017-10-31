const { expect } = require("chai")

const actorMustBeAwake = require("../../src/guards/actorMustBeAwake")
const Character = require("../../src/Character")

describe("actorMustBeAwake", function() {
  context("when the character is awake", function() {
    const character = Character.build({ isAwake: true })
    const result = actorMustBeAwake(character, {})

    it("returns true", function() {
      expect(result).to.be.true
    })
  })

  context("when the character is asleep", function() {
    const character = Character.build({ isAwake: false })
    const result = actorMustBeAwake(character, {})

    it("returns a formatted failure message", function() {
      expect(result).to.eql("You are asleep ...")
    })
  })
})
