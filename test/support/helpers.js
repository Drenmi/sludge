const _ = require("lodash")

const { Assertion, util } = require("chai")

addSenseAssertion("SIGHT", "see", "saw")
addSenseAssertion("HEARING", "hear", "heard")
addSenseAssertion("TOUCH", "feel", "felt")
addSenseAssertion("SMELL", "smell", "smelled")
addSenseAssertion("TASTE", "taste", "tasted")

function addSenseAssertion(sense, presentTenseVerb, pastTenseVerb) {
  Assertion.addChainableMethod(presentTenseVerb, function(message) {
    const character = util.flag(this, "object")

    const [didSense, lastSensed] = senseAssertion(character, sense, message)

    this.assert(
      didSense,
      `expected character to see ${message}, but saw ${lastSensed}`,
      `expected character to not see ${message}`
    )
  },
  function() {
    util.flag(this, "sense", "SIGHT")
    // TODO: extract inflection methods
    util.flag(this, "verb", presentTenseVerb)
    util.flag(this, "pastVerb", pastTenseVerb)
  })
}

function senseAssertion(character, sense, message) {
  const lastSensed = _.find(character.messages, (event) => (event.sense === "SIGHT"))
  const lastMessage = (lastSensed) ? lastSensed.message : "nothing"

  return [lastSensed && lastMessage === message, lastMessage]
}

Assertion.addProperty("nothing", function() {
  const character = util.flag(this, "object")
  const sense = util.flag(this, "sense")
  const verb = util.flag(this, "verb")
  const pastVerb = util.flag(this, "pastVerb")

  const lastSensed = _.find(character.messages, (event) => (event.sense === sense))
  const lastMessage = (lastSensed) ? lastSensed.message : "nothing"

  this.assert(
    !lastSensed,
    `expected character to ${verb} nothing, but ${pastVerb} ${lastMessage}`,
    `expected character to not ${verb} nothing`
  )
})

Assertion.addProperty("something", function() {
  const character = util.flag(this, "object")
  const sense = util.flag(this, "sense")
  const verb = util.flag(this, "verb")
  const pastVerb = util.flag(this, "pastVerb")

  const lastSensed = _.find(character.messages, (event) => (event.sense === sense))

  this.assert(
    lastSensed,
    `expected character to ${verb} something, but ${pastVerb} nothing`,
    `expected character to not ${verb} something`
  )
})
