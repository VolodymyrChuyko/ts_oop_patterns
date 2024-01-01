# Command
The command is a design pattern that turns a request into a stand-alone object that contains all information about the request. This transformation allows passing requests as method arguments, delaying or queueing a request’s execution, and supporting undoable operations.

Four terms always associated with the command pattern are *command*, *receiver*, *invoker* and *client*. A command object knows about the receiver and invokes a method of the receiver. Values for parameters of the receiver method are stored in the command. The receiver object to execute these methods is also stored in the command object by aggregation. The receiver then does the work when the `execute()` method in the command is called. An invoker object knows how to execute a command, and optionally does bookkeeping about the command execution. The invoker does not know anything about a concrete command, it knows only about the command interface. Invoker object(s), command objects and receiver objects are held by a client object, the client decides which receiver objects it assigns to the command objects, and which commands it assigns to the invoker. The client decides which commands to execute at which points. To execute a command, it passes the command object to the invoker object.

Using command objects makes it easier to construct general components that need to delegate, sequence or execute method calls at a time of their choosing without the need to know the class of the method or the method parameters. Using an invoker object allows bookkeeping about command executions to be conveniently performed, as well as implementing different modes for commands, which are managed by the invoker object, without the need for the client to be aware of the existence of bookkeeping or modes.

## Overview
The command design pattern solves problems like:
- Coupling the invoker of a request to a particular request should be avoided. That is, hard-wired requests should be avoided.
- It should be possible to configure an object (that invokes a request) with a request.

Implementing (hard-wiring) a request directly into a class is inflexible because it couples the class to a particular request at compile-time, which makes it impossible to specify a request at run-time.

The command design pattern describes how to solve such problems:
- Define separate (command) objects that encapsulate a request.
- A class delegates a request to a command object instead of implementing a particular request directly.

This enables one to configure a class with a command object that is used to perform a request. The class is no longer coupled to a particular request and has no knowledge (is independent) of how the request is carried out.

## Structure
![UML command](UML-command.png)
1. The `Sender` class (aka *invoker*) is responsible for initiating requests. This class must have a field for storing a reference to a command object. The sender triggers that command instead of sending the request directly to the receiver. Note that the sender isn’t responsible for creating the command object. Usually, it gets a pre-created command from the client via the constructor.
2. The `Command` interface usually declares just a single method for executing the command.
3. `Concrete Commands` implement various kinds of requests. A concrete command isn’t supposed to perform the work on its own, but rather to pass the call to one of the business logic objects. However, for the sake of simplifying the code, these classes can be merged.

   > Parameters required to execute a method on a receiving object can be declared as fields in the concrete command. The command objects can be made immutable by only allowing the initialization of these fields via the constructor.
4. The `Receiver` class contains some business logic. Almost any object may act as a receiver. Most commands only handle the details of how a request is passed to the receiver, while the receiver itself does the actual work.
5. The `Client` creates and configures concrete command objects. The client must pass all of the request parameters, including a receiver instance, into the command’s constructor. After that, the resulting command may be associated with one or multiple senders.

## Implementation
1. Declare the `command interface` with a single execution method.
2. Create concrete command classes that implement the command interface for every request. Each class must have a set of fields for storing the request arguments along with a reference to the actual `receiver` object. All these values must be initialized via the command’s constructor.
3. Identify classes that will act as `senders`. Add the fields for storing commands into these classes. `Senders` should communicate with their `commands` only via the `command interface`. `Senders` usually don’t create `command` objects on their own, but rather get them from the `client` code.
4. The `senders` should execute the `command` instead of sending a request to the receiver directly.
5. The `client` should initialize objects in the following order:
- Create `receivers`.
- Create `commands`, and associate them with `receivers` if needed.
- Create `senders`, and associate them with specific `commands`.
