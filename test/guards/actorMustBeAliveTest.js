const { expect } = require("chai")

const actorMustBeAlive = require("../../src/guards/actorMustBeAlive")
const Character = require("../../src/Character")

describe("actorMustBeAlive", function() {
  context("when the character is alive", function() {
    const character = Character.build({ isAlive: true })
    const result = actorMustBeAlive(character, {})

    it("returns true", function() {
      expect(result).to.be.true
    })
  })

  context("when the character is dead", function() {
    const character = Character.build({ isAlive: false })
    const result = actorMustBeAlive(character, {})

    it("returns a formatted failure message", function() {
      expect(result).to.eql("You are dead ...")
    })
  })
})
