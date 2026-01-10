# Strategy
The strategy is a design pattern that allows selecting an algorithm at runtime. Instead of implementing a single algorithm directly, it defines a family of algorithms, puts each of them into a separate class, and makes their objects interchangeable. The decision about which algorithm to use is deferred until runtime. This allows the calling code to be more flexible and reusable.

## Overview
The strategy design pattern solves problems like:
- How to select concrete algorithm at runtime.
- How can context be independent of concrete algorithm?

The strategy design pattern describes how to solve such problems:
- Extract algorithms into separate classes called strategies.
- The context must have a field for storing a reference to one of the strategies.
- The context delegates the work to a linked strategy object instead of executing it on its own.

The context isn’t responsible for selecting an appropriate algorithm for the job. Instead, the client passes the desired strategy to the context. In fact, the context doesn’t know much about strategies. It works with all strategies through the same generic interface, which only exposes a single method for triggering the algorithm encapsulated within the selected strategy.

This way the context becomes independent of concrete strategies, so new algorithms can be added or existing ones modified without changing the code of the context or other strategies.

## Structure
![UML adapter](UML-strategy.png)

1. The `Context` maintains a reference to one of the concrete strategies and communicates with this object only via the strategy interface.
2. The `Strategy` interface is common to all concrete strategies. It declares a method the context uses to execute a strategy.
3. `Concrete Strategies` implement different variations of an algorithm the context uses.
4. The context calls the execution method on the linked strategy object each time it needs to run the algorithm. The context doesn’t know what type of strategy it works with or how the algorithm is executed.
5. The `Client` creates a specific strategy object and passes it to the context. The context exposes a setter which lets clients replace the strategy associated with the context at runtime.

## Implementation
1. In the `context class`, identify an algorithm that is prone to frequent changes. It may also be a massive conditional that selects and executes a variant of the same algorithm at runtime.
2. Declare the `strategy interface` common to all variants of the algorithm.
3. Extract all algorithms into their own classes. They should all implement the `strategy interface`.
4. In the `context class`, add a field for storing a reference to a `strategy object`. Provide a setter for replacing values of that field. The `context` should work with the `strategy object` only via the `strategy interface`. The `context` may define an interface which lets the `strategy` access its data.