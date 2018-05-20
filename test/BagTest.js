const { expect } = require("chai")

const Bag = require("../src/Bag")

describe("Bag", function() {
  describe("#contents", function() {
    context("when initialized without arguments", function() {
      const bag = Bag.build()

      it("contains nothing", function() {
        expect(bag.contents).to.be.empty
      })
    })

    context("when initialized with contents", function() {
      const bag = Bag.build({ contents: ["foo"] })

      it("contains the contents it was initialized with", function() {
        expect(bag.contents).to.contain("foo")
      })
    })
  })

  describe("#add", function() {
    const bag = Bag.build()

    it("puts the thing in the bag", function() {
      bag.add("foo")

      expect(bag.contents).to.contain("foo")
    })
  })

  describe("#remove", function() {
    const bag = Bag.build({ contents: ["foo"] })

    it("removes the thing from the bag", function() {
      bag.remove("foo")

      expect(bag.contents).not.to.contain("foo")
    })
  })
})
