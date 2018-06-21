require("../support/helpers")

const { expect } = require("chai")

const YawnCommand = require("../../src/commands/yawn")

const Character = require("../../src/Character")
const Room = require("../../src/Room")

describe("YawnCommand", function() {
  context("when the room has an exit in the given direction", function() {
    const room = Room.build({})
    const actor = Character.build({ name: "Yoda", room })
    const observer = Character.build({ name: "Obi-Wan",room })

    room.add(actor)
    room.add(observer)

    it("appears to the observer that the actor is yawning", function() {
      YawnCommand.issue(actor)

      expect(actor).to.see("Yoda yawns.")
    })
  })
})
