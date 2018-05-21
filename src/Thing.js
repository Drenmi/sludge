const _ = require("lodash")

const THING_TRAIT = {
  name: "thing",
  attributes: {
    name: "",
    description: ""
  }
}

function assignAttributes(attributes, options) {
  const unknownAttributes = _.difference(_.keys(options), _.keys(attributes))

  if(_.isEmpty(unknownAttributes)) {
    return _.merge(_.cloneDeep(attributes), options)
  } else {
    throw(`Unknown attributes: ${_.join(unknownAttributes, ", ")}`)
  }
}

function combineThing(...traits) {
  return _.reduce(traits, function(thing, trait) {
    return _.merge(thing, _.cloneDeep(trait))
  })
}

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

const Thing = {
  define({ traits = [], attributes = {}, actions = {} }) {
    return ThingFactory({ traits, attributes, actions })
  }
}

module.exports = Thing
