const _ = require("lodash")

function create(impressions) {
  return function(character) {
    _.each(impressions, ({ sense, magnitude, message }) => {
      const threshold = 100 - character.senses[sense].acuity

      if(magnitude >= threshold) {
        return character.send({ sense, message })
      }
    })
  }
}

const SensoryEvent = {
  create
}

module.exports = SensoryEvent
