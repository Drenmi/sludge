const _ = require("lodash")

function create(impressions) {
  return {
    resolve: function(receiver, context = {}) {
      _.each(impressions, ({ sense, magnitude, message }) => {
        const threshold = 100 - receiver.senses[sense].acuity

        if(magnitude >= threshold) {
          receiver.perceive({ sense, message: message(context) })
        }
      })
    }
  }
}

const SensoryEvent = {
  create
}

module.exports = SensoryEvent
