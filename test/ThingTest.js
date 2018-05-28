require("./support/helpers")

const { expect } = require("chai")

const Thing = require("../src/Thing")
const Container = require("../src/traits/container")
const Equippable = require("../src/traits/equippable")

describe("Thing", function() {
  describe("#attributes", function() {
    context("when defined without attributes", function() {
      const thing = Thing.define({})

      it("lists the default attributes", function() {
        expect(thing.attributes).to.contain.keys("id", "name", "description")
      })
    })

    context("when defined with attributes", function() {
      const thing = Thing.define({ attributes: { brightness: 1 } })

      it("lists the names of its attributes", function() {
        expect(thing.attributes).to.contain.key("brightness")
      })
    })

    context("when inheriting attributes from a single trait", function() {
      const thing = Thing.define({ traits: [Container] })

      it("lists the names of the inherited attributes", function() {
        expect(thing.attributes).to.contain.key("contents")
      })
    })

    context("when inheriting attributes from several traits", function() {
      const thing = Thing.define({ traits: [Container, Equippable] })

      it("lists the names of the inherited attributes", function() {
        expect(thing.attributes).to.contain.keys("contents", "slot")
      })
    })

    context("when defined with- and inheriting attributes from a trait", function() {
      const thing = Thing.define({ attributes: { name: "a bag" }, traits: [Container] })

      it("lists both the defined and inherited attributes", function() {
        expect(thing.attributes).to.contain.keys("name", "contents")
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

    context("when defined with a single trait", function() {
      const thing = Thing.define({ traits: [Container] })

      it("lists the trait", function() {
        expect(thing.traits).to.deep.include(Container)
      })
    })

    context("when defined with several traits", function() {
      const thing = Thing.define({ traits: [Container, Equippable] })

      it("lists all the traits", function() {
        expect(thing.traits).to.deep.include(Container, Equippable)
      })
    })
  })

  describe("#kindOf", function() {
    context("when argument is thing", function() {
      const thing = Thing.define({})

      it("returns true", function() {
        expect(thing).to.be.a.kindOf("thing")
      })
    })

    context("when argument matches one of the traits", function() {
      const thing = Thing.define({ traits: [Container] })

      it("returns true", function() {
        expect(thing).to.be.a.kindOf("container")
      })
    })

    context("when argument does not match any of the traits", function() {
      const thing = Thing.define({ traits: [Equippable] })

      it("returns false", function() {
        expect(thing).not.to.be.a.kindOf("container")
      })
    })

    context("when called on an instance of the thing", function() {
      const thing = Thing.define({ traits: [Container] }).build()

      it("returns true", function() {
        expect(thing).to.be.a.kindOf("container")
      })
    })
  })
})
