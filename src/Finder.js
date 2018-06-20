const _ = require("lodash")

/**
 * String fragments that are ignored in weak matching of target strings.
 */
const IRRELEVANT_PARTS = ["a", "an"]

/**
 * Checks whether a passed string seems to allude to a known target string.
 */
function isAlludingTo(target, name) {
  return _.startsWith(_.lowerCase(target), _.lowerCase(name))
}

/**
 * A strong match indicates that that the passed string alludes to a known
 * target string _including_ irrelevant parts like prefixes.
 */
function isStrongMatch(target, name) {
  return isAlludingTo(target.name, name)
}

/**
 * A weak match indicates that the passed string alludes to a known targets
 * string when ignoring irrelevant parts like prefixes.
 */
function isWeakMatch(target, name) {
  const relevantParts = _.reject(_.split(target.name, " "), (part) => _.includes(IRRELEVANT_PARTS, part))

  return _.some(relevantParts, (part) => isAlludingTo(part, name))
}

/**
 * Either a strong or a weak match.
 */
function isMatch(target, name) {
  return isStrongMatch(target, name) || isWeakMatch(target, name)
}

/**
 * A two pass filter that looks for candidate targets by:
 *
 *   1. Filtering things that are in the indicated scope(s)
 *   2. Filtering things that match the indicated target(s)
 */
function filterCandidates(actor, scopes, targets) {
  return _.flatMap(scopes, (scope) => {
    return _.filter(actor[scope].contents, (thing) => {
      return _.some(targets, (target) => thing.kindOf(target))
    })
  })
}

/**
 * A `Finder` is an object that attempts to find target `Thing`s that
 * are alluded to in arguments to commands. For example, the commands
 * "look stick" attempts to find a suitable stick to look at in the
 * relevant scopes. Which scopes are relevant is decided by the command
 * when it is created.
 */
const Finder = {
  create({ scopes, targets }) {
    return {
      find: function(actor, name) {
        const candidates = filterCandidates(actor, scopes, targets)

        return _.find(candidates, (candidate) => isMatch(candidate, name))
      }
    }
  }
}

module.exports = Finder
