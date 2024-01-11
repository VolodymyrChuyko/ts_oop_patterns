# State
The state is a design pattern that allows an object to alter its behavior when its internal state changes.

This can be a cleaner way for an object to change its behavior at runtime without resorting to conditional statements and thus improve maintainability.

## Overview
The state design pattern solves problems like:
- How an object could change its behavior when its internal state changes?
- How could be state-specific behavior defined independently, that is, adding new states should not affect the behavior of existing states?

Implementing state-specific behavior directly within a class is inflexible because it commits the class to a particular behavior and makes it impossible to add a new state or change the behavior of an existing state later, independently from the class, without changing the class.

The state design pattern describes how to solve such problems:
- Define separate state objects that encapsulate state-specific behavior for each state. That is, define an interface (state) for performing state-specific behavior, and define classes that implement the interface for each state.
- A class delegates state-specific behavior to its current state object instead of implementing state-specific behavior directly.

This makes a class independent of how state-specific behavior is implemented. New states can be added by defining new state classes. A class can change its behavior at run-time by changing its current state object.

## Structure
![UML state](UML-state.png)
1. `Context` stores a reference to one of the concrete state objects and delegates to it all state-specific work. The context communicates with the state object via the state interface. The context exposes a setter for passing it a new state object.
2. The `State` interface declares the state-specific methods. These methods should make sense for all concrete states because you don’t want some of your states to have useless methods that will never be called.
3. `Concrete States` provide their own implementations for the state-specific methods. To avoid duplication of similar code across multiple states, you may provide intermediate abstract classes that encapsulate some common behavior.

    > State objects may store a backreference to the context object. Through this reference, the state can fetch any required info from the context object, as well as initiate state transitions.
4. Both context and concrete states can set the next state of the context and perform the actual state transition by replacing the state object linked to the context.

## Implementation
1. Decide what class will act as the `context`. It could be an existing class which already has the state-dependent code; or a new class, if the state-specific code is distributed across multiple classes.
2. Declare the `state interface`. It should mirror all the methods declared in the `context` that may contain state-specific behavior.
3. For every actual state, create a class that derives from the `state interface`. Then go over the methods of the `context` and extract all code related to that state into the newly created class.

    > While moving the code to the `state class`, you might discover that it depends on private members of the `context`. There are several workarounds:
    >- Make these fields or methods public.
    >- Turn the behavior you’re extracting into a public method in the `context` and call it from the state class. This way is ugly but quick, and you can always fix it later.
    >- Nest the `state classes` into the `context` class, but only if your programming language supports nesting classes.
4. In the `context` class, add a reference field of the `state interface` type and a public setter that allows overriding the value of that field.
5. Go over the method of the `context` again and replace empty state conditionals with calls to corresponding methods of the `state object`.
6. To switch the state of the `context`, create an instance of one of the `state classes` and pass it to the `context`. You can do this within the `context` itself, or in various states, or in the client. Wherever this is done, the class becomes dependent on the concrete `state class` that it instantiates.