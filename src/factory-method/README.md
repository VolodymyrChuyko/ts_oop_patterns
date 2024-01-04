# Factory method

Factory Method is a creational design pattern that provides an interface for creating objects in a superclass, but allows subclasses to alter the type of objects that will be created.

## Overview

The Factory Method design pattern solves problems like:

- How can an object be created so that subclasses can redefine which class to instantiate?
- How can a class defer instantiation to subclasses?

The Factory Method design pattern describes how to solve such problems:

- Define a separate operation (factory method) for creating an object.
- Create an object by calling a factory method.

Thus, the Factory Method pattern suggests that you replace direct object construction calls (using the `new` operator) with calls to a special factory method. Objects returned by a factory method are often referred to as `products`.
This allows us to override the factory method in a subclass and change the class of products being created by the method.

Subclasses may return different types of products. These products should extend a base class or implement a base interface. Also, the factory method in the base class should have its return type declared as this interface.

The code that uses the factory method (often called the client code) doesn’t see a difference between the actual products returned by various subclasses. It treats them via the base interface.

The Factory Method separates product construction code from the code that actually uses the product. Therefore it’s easier to extend the product construction code independently from the rest of the code.

## Structure

![UML factory method](UML-factory-method.png)

1. The Product declares the interface, which is common to all objects that can be produced by the creator and its subclasses.
2. Concrete Products are different implementations of the product interface.
3. The Creator class declares the factory method that returns new product objects. It’s important that the return type of this method matches the product interface.
The factory method can be declared as abstract to force all subclasses to implement their own versions of the method. As an alternative, the base factory method can return some default product type.
> Note, despite its name, product creation is not the primary responsibility of the creator. Usually, the creator class already has some core business logic related to products. The factory method helps to decouple this logic from the concrete product classes. Here is an analogy: a large software development company can have a training department for programmers. However, the primary function of the company as a whole is still writing code, not producing programmers.
4. Concrete Creators override the base factory method so it returns a different type of product.

> Note that the factory method doesn’t have to create new instances all the time. It can also return existing objects from a cache, an object pool, or another source.

## Implementation

- Create a `common interface` for products.
- Create `concrete product classes` that implement the `common interface`.
- Declare a `factory method` in the `creator class`. The return type of the `method` should match the `common product interface`. The `factory method` of the superclass can either be abstract or return a default product.
- Use the `factory method`  instead of product constructors to create products in the `creator's` code.
- Implement a `subclass` that extends the `creator class` and overrides the `factory method` for each product type
- Employ a `concrete creator subclass` in the `client code` depending on the specified parameters.