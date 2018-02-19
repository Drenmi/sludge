const _ = require("lodash")

const { Assertion, util } = require("chai")

addSenseAssertion("NONE", "notice", "noticed")
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
      `expected character to ${presentTenseVerb} ${message}, but ${pastTenseVerb} ${lastSensed}`,
      `expected character to not ${presentTenseVerb} ${message}`
    )
  },
  function() {
    util.flag(this, "sense", "SIGHT")
    // TODO: extract inflection methods
    util.flag(this, "presentTenseVerb", presentTenseVerb)
    util.flag(this, "pastTenseVerb", pastTenseVerb)
  })
}

function senseAssertion(character, sense, message) {
  const lastSensed = _.find(character.impressions, (impression) => (impression.sense === sense))
  const lastMessage = (lastSensed) ? lastSensed.message : "nothing"

  return [lastSensed && lastMessage === message, lastMessage]
}

Assertion.addProperty("nothing", function() {
  const character = util.flag(this, "object")
  const sense = util.flag(this, "sense")
  const presentTenseVerb = util.flag(this, "presentTenseVerb")
  const pastTenseVerb = util.flag(this, "pastTenseVerb")

  const lastSensed = _.find(character.impressions, (impression) => (impression.sense === sense))
  const lastMessage = (lastSensed) ? lastSensed.message : "nothing"

  this.assert(
    !lastSensed,
    `expected character to ${presentTenseVerb} nothing, but ${pastTenseVerb} ${lastMessage}`,
    `expected character to not ${presentTenseVerb} nothing`
  )
})

Assertion.addProperty("something", function() {
  const character = util.flag(this, "object")
  const sense = util.flag(this, "sense")
  const presentTenseVerb = util.flag(this, "presentTenseVerb")
  const pastTenseVerb = util.flag(this, "pastTenseVerb")

  const lastSensed = _.find(character.impressions, (impression) => (impression.sense === sense))

  this.assert(
    lastSensed,
    `expected character to ${presentTenseVerb} something, but ${pastTenseVerb} nothing`,
    `expected character to not ${presentTenseVerb} something`
  )
})
