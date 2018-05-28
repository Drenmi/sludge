const { expect } = require("chai")

const Exit = require("../src/Exit")
const Connector = require("../src/Connector")

describe("Connector", function() {
  describe("#resolve", function() {
    context("when using the default duplex resolver", function() {
      const source = Exit.build({})
      const destination = Exit.build({})

      const connector = Connector.build({})

      it("returns the opposite exit", function() {
        connector.connect([source, destination])

        expect(connector.resolve(source)).to.eq(destination)
      })
    })
  })
})
