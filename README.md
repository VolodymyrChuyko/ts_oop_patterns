# OOP Design Patterns

## Creational
**Creational patterns** are ones that create objects, rather than having to instantiate objects directly. This gives the program more flexibility in deciding which objects need to be created for a given case.

- [**Abstract factory**](./src/abstract-factory) groups object factories that have a common theme.
- [**Builder**](./src/builder/) constructs complex objects by separating construction and representation.
- [**Factory method**](./src/factory-method/) creates objects without specifying the exact class to create.
- **Prototype** creates objects by cloning an existing object.
- [**Singleton**](./src/singleton/) restricts object creation for a class to only one instance.

## Structural
**Structural patterns** concern class and object composition. They use inheritance to compose interfaces and define ways to compose objects to obtain new functionality.

- [**Adapter**](./src/adapter/) allows classes with incompatible interfaces to work together by wrapping its own interface around that of an already existing class.
- **Bridge** decouples an abstraction from its implementation so that the two can vary independently.
- **Composite** composes zero-or-more similar objects so that they can be manipulated as one object.
- [**Decorator**](./src/decorator/) dynamically adds/overrides behaviour in an existing method of an object.
- [**Facade**](./src/facade/) provides a simplified interface to a large body of code.
- **Flyweight** reduces the cost of creating and manipulating a large number of similar objects.
- **Proxy** provides a placeholder for another object to control access, reduce cost, and reduce complexity.

## Behavioral
Most **behavioral** design patterns are specifically concerned with communication between objects.

- **Chain of responsibility** delegates commands to a chain of processing objects.
- [**Command**](./src/command/) creates objects that encapsulate actions and parameters.
- **Interpreter** implements a specialized language.
- **Iterator** accesses the elements of an object sequentially - without exposing its underlying representation.
- **Mediator** allows loose coupling between classes by being the only class that has detailed knowledge of their methods.
- **Memento** provides the ability to restore an object to its previous state (undo).
- **Observer** is a publish/subscribe pattern, which allows a number of observer objects to see an event.
- [**State**](./src/state) allows an object to alter its behavior when its internal state changes.
- [**Strategy**](./src/strategy/) allows one of a family of algorithms to be selected on-the-fly at runtime.
- **Template method** defines the skeleton of an algorithm as an abstract class, allowing its subclasses to provide concrete behavior.
- **Visitor** separates an algorithm from an object structure by moving the hierarchy of methods into one object.