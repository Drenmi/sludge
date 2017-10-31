const { expect } = require("chai")

const directionMustBeValid = require("../../src/guards/directionMustBeValid")

describe("directionMustBeValid", function() {
  context("when the given direction is valid", function() {
    const result = directionMustBeValid(null, { direction: "north" })

    it("returns true", function() {
      expect(result).to.be.true
    })
  })

  context("when the given direction is invalid", function() {
    const result = directionMustBeValid(null, { direction: "foo" })

    it("returns a formatted failure message", function() {
      expect(result).to.eql("Move where?")
    })
  })

  context("when the given direction is missing", function() {
    const result = directionMustBeValid(null, { direction: "" })

    it("returns a formatted failure message", function() {
      expect(result).to.eql("Move where?")
    })
  })
})
