const _ = require("lodash")

/**
 * Creates a new `SensoryEvent` to be perceived by actors. It takes a list of
 * impressions, one per targeted sense, which are resolved in order of priority
 * of the receiver.
 */
function create(impressions) {
  return {
    resolve: function(receiver, context = {}) {
      _.each(impressions, ({ sense, magnitude, message }) => {
        const threshold = 100 - receiver.senses[sense].acuity

        if(magnitude >= threshold) {
          receiver.perceive({ sense, message: message(context) })

          return false
        }
      })
    }
  }
}

/**
 * Public API for `SensoryEvent`.
 */
const SensoryEvent = {
  create
}

module.exports = SensoryEvent
