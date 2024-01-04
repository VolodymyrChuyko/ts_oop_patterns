# Adapter
The adapter is a design pattern that allows the interface of an existing class to be used as another interface. It is often used to make existing classes work with others without modifying their source code.

## Overview
The adapter design pattern solves problems like:
- How can a class be reused that does not have an interface that a client requires?
- How can classes that have incompatible interfaces work together?
- How can an alternative interface be provided for a class?

Often an already existing class can not be reused only because its interface does not conform to the interface clients require.

The adapter design pattern describes how to solve such problems:
- Define a separate `adapter` class that converts the incompatible interface of a class (`adaptee`) into another interface (`target`) clients require.
- Work through an `adapter` to reuse the classes that do not have the required interface.

The key idea in this pattern is to work through a separate `adapter` that adapts the interface of an already existing class without changing it.

Clients don't know whether they work with a `target` class directly or through an `adapter` with a class that does not have the `target` interface.

## Structure
![UML adapter](UML-adapter.png)
1. The `Client` is a class that contains the existing business logic of the program.
2. The `Client Interface` describes a protocol that other classes must follow to be able to collaborate with the client code.
3. The `Service` is some useful class (usually 3rd-party or legacy). The client can’t use this class directly because it has an incompatible interface.
4. The `Adapter` is a class that’s able to work with both the client and the service: it implements the client interface, while wrapping the service object. The adapter receives calls from the client via the client interface and translates them into calls to the wrapped service object in a format it can understand.
5. The client code doesn’t get coupled to the concrete adapter class as long as it works with the adapter via the client interface. Thanks to this, you can introduce new types of adapters into the program without breaking the existing client code. This can be useful when the interface of the service class gets changed or replaced: you can just create a new adapter class without changing the client code.

## Implementation
1. Make sure that you have at least two classes with incompatible interfaces:
   - A useful `service class`, which you can’t change (often 3rd-party, legacy or with lots of existing dependencies).
   - One or several `client classes` that would benefit from using the service class.
2. Declare the `client interface` and describe how clients communicate with the service.
3. Declare the `adapter class` that implements the client interface.
4. Add a field to the `adapter class` to store a reference to the `service object`. The common practice is to initialize this field via the constructor, but sometimes it’s more convenient to pass it to the adapter when calling its methods.
5. One by one, implement all methods of the `client interface` in the `adapter class`. The adapter should delegate most of the real work to the `service object`, handling only the interface or data format conversion.
6. Clients should use the `adapter` via the `client interface`. This allows changing or extending the adapters without affecting the client code.