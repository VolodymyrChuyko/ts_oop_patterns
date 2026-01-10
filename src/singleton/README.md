# Singleton

The singleton pattern is a software design pattern that restricts the instantiation of a class to a singular instance.

The singleton pattern allows objects to:

- Ensure they only have one instance
- Provide easy access to that instance
- Control their instantiation (for example, hiding the constructors of a class)

## Common uses
Singletons are often preferred to global variables because they do not pollute the global namespace (or their containing namespace). Additionally, they permit lazy allocation and initialization, whereas global variables in many languages will always consume resources.

The singleton pattern can also be used as a basis for other design patterns, such as the abstract factory, factory method, builder and prototype patterns. Facade objects are also often singletons because only one facade object is required.

Logging is a common real-world use case for singletons, because all objects that wish to log messages require a uniform point of access and conceptually write to a single source.

## Implementations
Implementations of the singleton pattern ensure that only one instance of the singleton class ever exists and typically provide global access to that instance.

Typically, this is accomplished by:

- Declaring all constructors of the class to be private, which prevents it from being instantiated by other objects
- Providing a static method that returns a reference to the instance

The instance is usually stored as a private static variable; the instance is created when the variable is initialized, at some point before when the static method is first called.

## Criticism
Some consider the singleton to be an anti-pattern that introduces global state into an application, often unnecessarily. This introduces a potential dependency on the singleton by other objects, requiring analysis of implementation details to determine whether a dependency actually exists. This increased coupling can introduce difficulties with unit testing. In turn, this places restrictions on any abstraction that uses the singleton, such as preventing concurrent use of multiple instances.

Singletons also violate the single-responsibility principle because they are responsible for enforcing their own uniqueness along with performing their normal functions.