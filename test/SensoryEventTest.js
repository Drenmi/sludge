require("./support/helpers")

const { expect } = require("chai")

const SensoryEvent = require("../src/SensoryEvent")
const Character = require("../src/character")

describe("SensoryEvent", function() {
  context("when character is powerful enough to experience event", function() {
    const event = SensoryEvent.create([
      { sense: "SIGHT", magnitude: 100, message: "an ogre standing in the middle of the room." }
    ])
    const character = Character.build({ senses: { "SIGHT": { acuity: 100 } } })

    it("forwards the sensory event to the character", function() {
      event.resolve(character)

      expect(character).to.see("an ogre standing in the middle of the room.")
    })
  })

  context("when character is not powerful enough to experience event", function() {
    const event = SensoryEvent.create([
      { sense: "SIGHT", magnitude: 30, message: "an imp cowering in a corner."}
    ])
    const character = Character.build({ senses: { "SIGHT": { acuity: 40 } } })

    it("does not forward the sensory event to the character", function() {
      event.resolve(character)

      expect(character).to.see.nothing
    })
  })
})
