# Facade
The facade is a design pattern that provides a simplified interface to a library, a framework, or any other complex set of classes.

Developers often use the facade design pattern when a system is very complex or difficult to understand because the system has many interdependent classes or because its source code is unavailable. This pattern hides the complexities of the larger system and provides a simpler interface to the client. It typically involves a single wrapper class that contains a set of members required by the client. These members access the system on behalf of the facade client and hide the implementation details.

## Overview
The facade design pattern solves problems like:
- How to make a complex subsystem easier to use?
- How to minimize the dependencies on a subsystem?

Clients that access a complex subsystem directly refer to (depend on) many different objects having different interfaces (tight coupling), which makes the clients hard to implement, change, test, and reuse.

The facade design pattern describes how to solve such problems:
- A simple interface should be provided for a set of interfaces in the subsystem.

## Structure
![UML facade](UML-facade.png)
1. The `Facade` provides convenient access to a particular part of the subsystem’s functionality. It knows where to direct the client’s request and how to operate all the moving parts.
2. An `Additional Facade` class can be created to prevent polluting a single facade with unrelated features that might make it yet another complex structure. Additional facades can be used by both clients and other facades.
3. The `Complex Subsystem` consists of dozens of various objects. To make them all do something meaningful, you have to dive deep into the subsystem’s implementation details, such as initializing objects in the correct order and supplying them with data in the proper format.
Subsystem classes aren’t aware of the facade’s existence. They operate within the system and work with each other directly.
4. The `Client` uses the facade instead of calling the subsystem objects directly.

## Implementation
1. Check whether it’s possible to provide a simpler interface for an existing `subsystem`. This interface should make the `client code` independent from many of the subsystem’s classes.
2. Declare and implement this interface in a new `facade class`. The `facade` should redirect the calls from the `client code` to appropriate objects of the `subsystem`. The `facade` should be responsible for initializing the `subsystem` and managing its further life cycle.
3. Make all the `client code` communicate with the `subsystem` only via the `facade`. This makes the `client code` protected from any changes in the `subsystem` code. For example, when a `subsystem` gets upgraded to a new version, there is only a need to modify the code in the `facade`.
4. If the `facade` becomes too big, consider extracting part of its behavior to a new, refined `facade` class.