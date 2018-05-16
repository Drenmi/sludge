require("./support/helpers")

const { expect } = require("chai")

const SensoryEvent = require("../src/SensoryEvent")
const Character = require("../src/Character")

describe("SensoryEvent", function() {
  context("when receiver is powerful enough to experience event", function() {
    const event = SensoryEvent.create([
      { sense: "SIGHT", magnitude: 100, message: () => "an ogre standing in the middle of the room" }
    ])
    const receiver = Character.build({ senses: { "SIGHT": { acuity: 100 } } })

    it("forwards the sensory event to the receiver", function() {
      event.resolve(receiver)

      expect(receiver).to.see("an ogre standing in the middle of the room")
    })
  })

  context("when receiver is not powerful enough to experience event", function() {
    const event = SensoryEvent.create([
      { sense: "SIGHT", magnitude: 30, message: () => "an imp cowering in a corner" }
    ])
    const receiver = Character.build({ senses: { "SIGHT": { acuity: 40 } } })

    it("does not forward the sensory event to the receiver", function() {
      event.resolve(receiver)

      expect(receiver).to.see.nothing
    })
  })

  context("when the event contains contextual information", function() {
    const event = SensoryEvent.create([
      { sense: "SIGHT", magnitude: 60, message: ({ actor }) => `${actor.name} prancing around` }
    ])
    const actor = Character.build({ name: "Gandalf" })
    const receiver = Character.build({ senses: { "SIGHT": { acuity: 40 } }})

    it("forwards a contextualized message to the receiver", function() {
      event.resolve(receiver, { actor })

      expect(receiver).to.see("Gandalf prancing around")
    })
  })
})
