const _ = require("lodash")

const DEFAULT_SUCCESS_CALLBACK = function() { return "Yay!" }
const DEFAULT_FAILURE_CALLBACK = function(actor, message) { actor.perceive({ sense: "NONE", message }) }

function create({ guards = [], onSuccess = DEFAULT_SUCCESS_CALLBACK, onFailure = DEFAULT_FAILURE_CALLBACK }) {
  return {
    issue: function(actor, parameters) {
      const results = _.map(guards, (guard) => (guard(actor, parameters)))
      const failure = _.find(results, (pass) => (pass !== true))

      if(failure) {
        return onFailure(actor, failure)
      } else {
        return onSuccess()
      }
    }
  }
}

const Command = {
  create
}

module.exports = Command
