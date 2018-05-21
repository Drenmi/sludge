const { expect } = require("chai")

const Finder = require("../src/Finder")

const Character = require("../src/Character")
const Room = require("../src/Room")
const Bag = require("../src/Bag")

describe("Finder", function() {
  describe("#find", function() {
    const finder = Finder.create({ scope: "room", target: "container" })
    const bag = Bag.build({ name: "Magic Pouch" })

    context("when a matching bag exists in scope", function(){
      const room = Room.build({ contents: [bag] })
      const character = Character.build({ room: room })

      context("when matching the entire name", function() {
        it("finds the bag", function() {
          expect(finder.find(character, "magic pouch")).to.eq(bag)
        })
      })

      context("when matching the entire first part of the name", function() {
        it("finds the bag", function() {
          expect(finder.find(character, "magic")).to.eq(bag)
        })
      })

      context("when matching the entire last part of the name", function() {
        it("finds the bag", function() {
          expect(finder.find(character, "pouch")).to.eq(bag)
        })
      })

      context("when matching a subset of the first part of the name", function() {
        it("finds the bag", function() {
          expect(finder.find(character, "pou")).to.eq(bag)
        })
      })
    })

    context("when a non-matching bag exists in scope", function(){
      const room = Room.build({ contents: [bag] })
      const character = Character.build({ room: room })

      it("does not find the bag", function() {
        expect(finder.find(character, "ordinary")).to.be.undefined
      })
    })

    context("when a matching bag exists in another scope", function() {
      const room = Room.build({ contents: [] })
      const character = Character.build({ room: room, inventory: [bag] })

      it("does not find the bag", function() {
        expect(finder.find(character, "magic")).to.be.undefined
      })
    })
  })
})
