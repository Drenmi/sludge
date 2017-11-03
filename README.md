# Sludge

Sludge is a tool for building text based virtual worlds. It is inspired by old world [MUD](https://en.wikipedia.org/wiki/MUD)s, but built with modern JavaScript.

## Design & Goals

*Note: This is very much work in progress. Many of the things outlines below are not yet implemented, and are subject to change at a moment's notice.*

Sludge is intended for rapid creation of virtual worlds. It is designed to be fun to use, thus user productivity is a priority. Clean mental models and an expressive and intuitive public API are important design objectives. The framework is primarily data driven, with support for sophisticated users to extend it using custom code.

### Topography

A Sludge `World` is entirely made up of `Room`s. These can be subdivided into `Area`s, which allow the world to have different biomes with local weather conditions. Rooms are connected by `Path`s, which are accessed through endpoints such as `Exit`s or `Portal`s.

To put a spanner in the works of an unfortunate adventurer, exits can be fitted with furniture such as a `Door` or a `Gate`, or perhaps something even cooler like a `Firewall`. (Not that firewalls are known for being particularly cool.)

### Command and Conquer

A world would not be very interesting without being able to act upon it. Whether your inclination is exploring, socialising, or just mindless killing, you need means to express action. Sludge uses the concept of `Command`s to achieve this. A command is a high level concept used by world builders to bestow self efficacy on the players.

**Example:**

```javascript
const Knock = Command.register({
  guards: [
    Guard.actorMustBeAlive,
    Guard.actorMustBeAwake,
    Guard.directionMustBeValid,
    Guard.exitMustExist
  ]
})
```

A command is required to pass a number of `Guard`s before successful. In the case of knocking on a door, shown above, for the knocking to be successful, the actor must be both alive and awake, the direction must be a valid one, and there needs to be an exit in that direction.

### Unified Thing Theory

A lot of things in the Sludge world are ... well, `Thing`s. This is a common enough occurrence that it deserves a first class concept in the framework. Doors, exits, players, demogorgons, and enchanted sticks are all things. Using the `Thing` API, we can create factories ready to churn out new things.

**Example:**

```javascript
const LightSource = Thing.define({
  attributes: {
    brightness: 2
  },
  traits: [
    Trait.wieldable
  ]
})
```

`Trait`s determine how things can be used. In the example above, we have defined a new thing, a light source, which can be wielded by characters (granted they possess the right body parts.) We can use our new thing to construct new light sources.

**Example:**

```javascript
const candle = Light.build({ brightness: 1 })
```

### Making Sense of the World

Everything that happens in the world is experienced through the eyes (or ears, nose, tendrils, etc.) of a `Character`. Each character is equipped with a set of senses which, in addition to an inherent acuity, can be altered through various effects. For example, a dirt kick might temporarily impair a character's sight.

Fear not, however! Even when blinded, you are not rendered unaware of the surroundings. Given that your hearing is still intact, you can still have a good sense of the impending doom. Some characters can also have a natural affinity for sensing certain stimuli. For example a tunnel trogg, given it has spent most of its life underground, may have very poor eyesight, but make up for it with a very keen sense of smell.

This is made possible through the emission of `SensoryEvent`s. Data packages which can be resolved for each character in the room in which it was emitted. A sensory event can target several senses at once, and are resolved in the order of priority inherent to the character's perception.

**Example:**

```javascript
const knock = SensoryEvent.create([
  { sense: "SIGHT", magnitude: 100, message: "${actor} knocks on ${target}" },
  { sense: "HEARING", magnitude: 70, message: "Someone knocks on ${target}" }
])
```

In the example above, knocking on a door will result in a sensory event targeting sight and hearing inside the room where the knock happens. (So far I am unaware of any cases where someone was able to smell or taste a knock on a door.) Since one can normally not hear *who* is knocking on a door, the contextual information of the actor is not included in the message targeting hearing. In the case of a knock, we would normally emit an event targeting only hearing to the connecting room as well.

## Testing

You can easily run the test suite by invoking `npm test`.

### Custom Matchers

The framework provides some facilities for writing better, more expressive tests. We can use some of these to test the resolution of sensory events.

**Example:**

```javascript
context("when character is powerful enough to sense the presence of an imp", () => {
  const event = SensoryEvent.create([
    { sense: "SIGHT", magnitude: 40, message: "A small imp is hiding in a corner." }
  ])
  const character = Character.build({ senses: { "SIGHT": { acuity: 70 } } })

  it("is perceived by the character", () => {
    event.resolve(character)

    expect(character).to.see("A small imp is hiding in a corner.")
  })
}

context "when character is not powerful enough to sense the presence of an imp", () => {
  const event = SensoryEvent.create([
    { sense: "SIGHT", magnitude: 40, message: "A small imp is hiding in a corner." }
  ])
  const character = Character.build({ senses: { "SIGHT": { acuity: 50 } } })

  it("is perceived by the character", () => {
    event.resolve(character)

    expect(character).to.see.nothing
  })
}
```

## Dependencies

LoDash is the single runtime dependency. In development we use Mocha and Chai for testing, and ESLint for keeping things neat.

## License

This project is released under the [MIT license](LICENSE.md). Use whatever you find herein. Go forth, and build great things.
