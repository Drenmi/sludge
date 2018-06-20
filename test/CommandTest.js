const { expect } = require("chai")

const Command = require("../src/Command")

describe("Command", function() {
  describe(".create", function() {
    context("when creating without a name", function() {
      const creation = function() {
        Command.create({ name: "" })
      }

      it("raises an error", function() {
        expect(creation).to.throw("Command created without a name")
      })
    })

    context("when creating with a name", function() {
      const creation = function() {
        Command.create({ name: "foo" })
      }

      it("does not raise an error", function() {
        expect(creation).not.to.throw
      })
    })
  })

  describe(".register", function() {
    afterEach("clear command registry", function() {
      Command.clear()
    })

    context("when registering a new command", function() {
      const registration = function() {
        Command.register({ name: "foo" })
      }

      it("does not raise an error", function() {
        expect(registration).not.to.throw
      })
    })

    context("when registerig a command whose name is already taken", function() {
      before(function() {
        Command.register({ name: "bar" })
      })

      const registration = function() {
        Command.register({ name: "bar" })
      }

      it("raises an error", function() {
        expect(registration).to.throw("Command already registered: bar")
      })
    })
  })

  describe(".parse", function() {
    afterEach("clear command registry", function() {
      Command.clear()
    })

    context("when a matching command exists", function() {
      before(function() {
        Command.register({ name: "foo" })
      })

      it("returns the command", function() {
        expect(Command.parse("foo").name).to.eq("foo")
      })
    })

    context("when no matching command exists", function() {
      it("returns the unknown command", function() {
        expect(Command.parse("bar").name).to.eq("unknown")
      })
    })
  })
})
