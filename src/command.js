const DEFAULT_SUCCESS_CALLBACK = function() { return "Yay!" }
const DEFAULT_FAILURE_CALLBACK = function(message) { return message }

function create({ guards = [], onSuccess = DEFAULT_SUCCESS_CALLBACK, onFailure = DEFAULT_FAILURE_CALLBACK }) {
  return function(actor, parameters) {
    const results = guards.map(guard => guard(actor, parameters))
    const failure = results.find(pass => pass !== true)

    if(failure) {
      return onFailure(failure)
    } else {
      return onSuccess()
    }
  }
}

const Command = {
  create
}

module.exports = Command
