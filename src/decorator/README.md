# Decorator
The decorator is a design pattern that allows behavior to be added to an individual object, dynamically, without affecting the behavior of other instances of the same class.
The decorator pattern is often useful for adhering to the Single Responsibility Principle, as it allows functionality to be divided between classes with unique areas of concern as well as to the Open-Closed Principle, by allowing the functionality of a class to be extended without being modified. Decorator use can be more efficient than subclassing, because an object's behavior can be augmented without defining an entirely new object.

## Overview
The decorator design pattern solves problems like:
- Responsibilities should be added to (and removed from) an object dynamically at run-time.
- A flexible alternative to subclassing for extending functionality should be provided.

When using subclassing, different subclasses extend a class in different ways. But an extension is bound to the class at compile-time and can't be changed at run-time.

The decorator design pattern describes how to solve such problems:
- Implement the interface of the extended (`decorated`) object (`Component`) transparently by forwarding all requests to it.
- Perform additional functionality before/after forwarding a request.

This allows working with different `Decorator` objects to extend the functionality of an object dynamically at run-time.

## Structure
![UML decorator](UML-decorator.png)
1. The `Component` declares the common interface for both decorators and decorated objects.
2. `Concrete Component` is a class of objects being decorated. It defines the basic behavior, which can be altered by decorators.
3. The `Base Decorator` class has a field for referencing a decorated object. The field’s type should be declared as the component interface so it can contain both concrete components and decorators. The base decorator delegates all operations to the decorated object.
4. `Concrete Decorators` define extra behaviors that can be added to components dynamically. Concrete decorators override methods of the base decorator and execute their behavior either before or after calling the parent method.
5. The `Client` can wrap components in multiple layers of decorators, as long as it works with all objects via the component interface.

## Implementation
1. Make sure the business domain can be represented as a primary component with multiple optional layers over it.
2. Figure out what methods are common to both the primary component and the optional layers. Create a component interface and declare those methods there.
3. Create a concrete component class and define the base behavior in it.
4. Create a base decorator class. It should have a field for storing a reference to a wrapped (decorated) object. The field should be declared with the component interface type to allow linking to concrete components as well as decorators. The base decorator must delegate all work to the decorated object.
5. Make sure all classes implement the component interface.
6. Create concrete decorators by extending them from the base decorator. A concrete decorator must execute its behavior before or after the call to the parent method (which always delegates to the wrapped object).
7. The client code must be responsible for creating decorators and composing them in the way the client needs.

