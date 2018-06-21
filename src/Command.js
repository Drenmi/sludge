const _ = require("lodash")

const DEFAULT_SUCCESS_CALLBACK = function() { return "Yay!" }
const DEFAULT_FAILURE_CALLBACK = function(actor, message) { actor.perceive({ sense: "NONE", message }) }

/*
 * Command registry. This holds a reference to all the registered commands
 * in memory.
 */
let commands = []

/**
 * Creates a new command.
 */
function create({ name, guards = [], onSuccess = DEFAULT_SUCCESS_CALLBACK, onFailure = DEFAULT_FAILURE_CALLBACK }) {
  if(_.isEmpty(name)) {
    throw new Error(`Command created without a name`)
  }

  return {
    name,
    issue: function(actor, parameters) {
      const results = _.map(guards, (guard) => (guard(actor, parameters)))
      const failure = _.find(results, (pass) => (pass !== true))

      if(failure) {
        return onFailure(actor, failure)
      } else {
        return onSuccess({ actor })
      }
    }
  }
}

/**
 * Registers a command by creating it and adding it to the command registry.
 * Does some checks to avoid name clashes.
 */
function register({ name, guards = [], onSuccess = DEFAULT_SUCCESS_CALLBACK, onFailure = DEFAULT_FAILURE_CALLBACK }) {
  const command = create({ name, guards, onSuccess, onFailure })

  if(_.some(commands, { name })) {
    throw new Error(`Command already registered: ${name}`)
  } else {
    commands.push(command)
  }
}

/**
 * Checks whether a passed string seems to allude to a known target string.
 */
function isAlludingTo(target, name) {
  return _.startsWith(_.lowerCase(target), _.lowerCase(name))
}

/**
 * The unknown command is a null command used when a matching command can't
 * be found. It always succeeds, and gives the player an indication that a
 * command wasn't found. It is treated as a regular command, and pushed to
 * the character's command queue.
 */
const UnknownCommand = {
  name: "unknown",
  issue: function(actor) {
    actor.perceive({ sense: "NONE", message: "Huh?" })
  }
}

/**
 * Takes in a string and attempts to find a matching command from the
 * command registry. Returns the unknown command if it can't find a match.
 */
function parse(string) {
  return _.find(commands, function(command) {
    return isAlludingTo(command.name, string)
  }) || UnknownCommand
}

/**
 * Danger zone! Clear all commands in the command registry. This is useful
 * in a lot of tests.
 */
function clear() {
  commands = []
}

/**
 * Public API for `Command`.
 */
const Command = {
  clear,
  create,
  register,
  parse
}

module.exports = Command
