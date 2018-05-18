const { expect } = require("chai")

const Thing = require("../src/Thing")
const Container = require("../src/traits/Container")

describe("Thing", function() {
  describe("#attributes", function() {
    context("when defined without attributes", function() {
      const thing = Thing.define({})

      it("does not list any attributes", function() {
        expect(thing.attributes).to.be.empty
      })
    })

    context("when defined with attributes", function() {
      const thing = Thing.define({ attributes: { brightness: 1 } })

      it("lists the names of its attributes", function() {
        expect(thing.attributes).to.contain("brightness")
      })
    })

    context("when inheriting attributes from traits", function() {
      const thing = Thing.define({ traits: [Container] })

      it("lists the names of the inherited attributes", function() {
        expect(thing.attributes).to.contain("contents")
      })
    })
  })

  describe("#traits", function() {
    context("when defined without traits", function() {
      const thing = Thing.define({})

      it("does not list any traits", function() {
        expect(thing.traits).to.be.empty
      })
    })

    context("when defined with traits", function() {
      const thing = Thing.define({ traits: [Container] })

      it("lists the names of its traits", function() {
        expect(thing.traits).to.contain("container")
      })
    })
  })
})
