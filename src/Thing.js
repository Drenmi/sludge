const _ = require("lodash")

/**
 * Bottom level trait that is used for all things. Adds basic attributes and
 * allows finders to target `thing`.
 */
const THING_TRAIT = {
  name: "thing",
  attributes: {
    id: "",
    name: "",
    description: ""
  }
}

/**
 * Assign attributes to an instance of `Thing`. Does some basic checks to
 * prevent assigning undefined attributes.
 */
function assignAttributes(attributes, options) {
  const unknownAttributes = _.difference(_.keys(options), _.keys(attributes))
  const defaultAttributes = { id: _.uniqueId() }

  if(_.isEmpty(unknownAttributes)) {
    return _.merge(_.cloneDeep(attributes), defaultAttributes, options)
  } else {
    throw(`Unknown attributes: ${_.join(unknownAttributes, ", ")}`)
  }
}

/**
 * Combines any number of traits into a new blueprint.
 */
function combineThing(...traits) {
  return _.reduce(traits, function(thing, trait) {
    return _.merge(thing, _.cloneDeep(trait))
  })
}

/**
 * Each definition of a new `Thing` generates a new factory, capable of
 * creating instances of that `Thing`, as well as holding some information
 * about the traits and attributes used on definition.
 */
const ThingFactory = function({ traits, attributes, actions }) {
  const blueprint = combineThing({ attributes, actions }, THING_TRAIT, ...traits)

  const kindOf = (trait) => _.some([THING_TRAIT, ...traits], { name: trait })

  const blueprintMethods = {
    attributes,
    traits,
    kindOf
  }

  const proto = _.merge(blueprintMethods, blueprint.actions)

  const build = (attributes) => _.create(proto, assignAttributes(blueprint.attributes, attributes))

  return _.merge({ build }, blueprintMethods)
}

/**
 * Public API for `Thing`.
 */
const Thing = {
  define({ traits = [], attributes = {}, actions = {} }) {
    return ThingFactory({ traits, attributes, actions })
  }
}

module.exports = Thing
