# ts-mockito [![build badge](https://travis-ci.org/NagRock/ts-mockito.svg?branch=master)](https://travis-ci.org/NagRock/ts-mockito) [![codecov](https://codecov.io/gh/NagRock/ts-mockito/branch/master/graph/badge.svg)](https://codecov.io/gh/NagRock/ts-mockito)

Mocking library for TypeScript inspired by http://mockito.org/

## 1.x to 2.x migration guide
[1.x to 2.x migration guide](https://github.com/NagRock/ts-mockito/wiki/ts-mockito-1.x-to-2.x-migration-guide)

## Main features


* Strongly typed
* IDE autocomplete
* Mock creation (`mock`) (also abstract classes) [#example](#basics)
* Spying on real objects (`spy`) [#example](#spying-on-real-objects)
* Changing mock behavior (`when`) via:
	* `thenReturn` - return value [#example](#stubbing-method-calls)
	* `thenThrow` - throw an error [#example](#throwing-errors)
	* `thenCall` - call custom method [#example](#custom-function)
	* `thenResolve` - resolve promise [#example](#resolving--rejecting-promises)
	* `thenReject` - rejects promise [#example](#resolving--rejecting-promises)
* Checking if methods were called with given arguments (`verify`)
	* `anything`, `notNull`, `anyString`, `anyOfClass` etc. - for more flexible comparision
	* `once`, `twice`, `times`, `atLeast` etc. - allows call count verification [#example](#call-count-verification)
	* `calledBefore`, `calledAfter` - allows call order verification [#example](#call-order-verification)
* Resetting mock (`reset`, `resetCalls`) [#example](#resetting-mock-calls), [#example](#resetting-mock)
* Capturing arguments passed to method (`capture`) [#example](#capturing-method-arguments)
* Recording multiple behaviors [#example](#recording-multiple-behaviors)
* Readable error messages (ex. `'Expected "convertNumberToString(strictEqual(3))" to be called 2 time(s). But has been called 1 time(s).'`)

## Installation

`npm install ts-mockito --save-dev`

## Usage

### Basics
``` typescript
// Creating mock
let mockedFoo:Foo = mock(Foo);

// Getting instance from mock
let foo:Foo = instance(mockedFoo);

// Using instance in source code
foo.getBar(3);
foo.getBar(5);

// Explicit, readable verification
verify(mockedFoo.getBar(3)).called();
verify(mockedFoo.getBar(5)).called();
```

### Stubbing method calls

``` typescript
// Creating mock
let mockedFoo:Foo = mock(Foo);

// stub method before execution
when(mockedFoo.getBar(3)).thenReturn('three');

// Getting instance
let foo:Foo = instance(mockedFoo);

// prints three
console.log(foo.getBar(3));

// prints null, because "getBar(999)" was not stubbed
console.log(foo.getBar(999));
```

### Stubbing getter value

``` typescript
// Creating mock
let mockedFoo:Foo = mock(Foo);

// stub getter before execution
when(mockedFoo.sampleGetter).thenReturn('three');

// Getting instance
let foo:Foo = instance(mockedFoo);

// prints three
console.log(foo.sampleGetter);
```

### Stubbing property values that have no getters

Syntax is the same as with getter values.

Please note, that stubbing properties that don't have getters only works if [Proxy](http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-objects) object is available (ES6).

### Call count verification

``` typescript
// Creating mock
let mockedFoo:Foo = mock(Foo);

// Getting instance
let foo:Foo = instance(mockedFoo);

// Some calls
foo.getBar(1);
foo.getBar(2);
foo.getBar(2);
foo.getBar(3);

// Call count verification
verify(mockedFoo.getBar(1)).once();               // was called with arg === 1 only once
verify(mockedFoo.getBar(2)).twice();              // was called with arg === 2 exactly two times
verify(mockedFoo.getBar(between(2, 3))).thrice(); // was called with arg between 2-3 exactly three times
verify(mockedFoo.getBar(anyNumber()).times(4);     // was called with any number arg exactly four times
verify(mockedFoo.getBar(2)).atLeast(2);           // was called with arg === 2 min two times
verify(mockedFoo.getBar(1)).atMost(1);           // was called with arg === 1 max one time
verify(mockedFoo.getBar(4)).never();              // was never called with arg === 4
```

### Call order verification

``` typescript
// Creating mock
let mockedFoo:Foo = mock(Foo);
let mockedBar:Bar = mock(Bar);

// Getting instance
let foo:Foo = instance(mockedFoo);
let bar:Bar = instance(mockedBar);

// Some calls
foo.getBar(1);
bar.getFoo(2);

// Call order verification
verify(mockedFoo.getBar(1)).calledBefore(mockedBar.getFoo(2));    // foo.getBar(1) has been called before bar.getFoo(2)
verify(mockedBar.getFoo(2)).calledAfter(mockedFoo.getBar(1));    // bar.getFoo(2) has been called before foo.getBar(1)
verify(mockedFoo.getBar(1)).calledBefore(mockedBar.getFoo(999999));    // throws error (mockedBar.getFoo(999999) has never been called)
```

### Throwing errors

``` typescript
let mockedFoo:Foo = mock(Foo);

when(mockedFoo.getBar(10)).thenThrow(new Error('fatal error'));

let foo:Foo = instance(mockedFoo);
try {
    foo.getBar(10);
} catch (error:Error) {
    console.log(error.message); // 'fatal error'
}
```

### Custom function

You can also stub method with your own implementation

``` typescript
let mockedFoo:Foo = mock(Foo);
let foo:Foo = instance(mockedFoo);

when(mockedFoo.sumTwoNumbers(anyNumber(), anyNumber())).thenCall((arg1:number, arg2:number) => {
    return arg1 * arg2; 
});

// prints '50' because we've changed sum method implementation to multiply!
console.log(foo.sumTwoNumbers(5, 10));
```

### Resolving / rejecting promises

You can also stub method to resolve / reject promise

``` typescript
let mockedFoo:Foo = mock(Foo);

when(mockedFoo.fetchData("a")).thenResolve({id: "a", value: "Hello world"});
when(mockedFoo.fetchData("b")).thenReject(new Error("b does not exist"));
```

### Resetting mock calls

You can reset just mock call counter

``` typescript
// Creating mock
let mockedFoo:Foo = mock(Foo);

// Getting instance
let foo:Foo = instance(mockedFoo);

// Some calls
foo.getBar(1);
foo.getBar(1);
verify(mockedFoo.getBar(1)).twice();      // getBar with arg "1" has been called twice

// Reset mock
resetCalls(mockedFoo);

// Call count verification
verify(mockedFoo.getBar(1)).never();      // has never been called after reset
```

You can also reset calls of multiple mocks at once `resetCalls(firstMock, secondMock, thirdMock)`

### Resetting mock

Or reset mock call counter with all stubs

``` typescript
// Creating mock
let mockedFoo:Foo = mock(Foo);
when(mockedFoo.getBar(1)).thenReturn("one").

// Getting instance
let foo:Foo = instance(mockedFoo);

// Some calls
console.log(foo.getBar(1));               // "one" - as defined in stub
console.log(foo.getBar(1));               // "one" - as defined in stub
verify(mockedFoo.getBar(1)).twice();      // getBar with arg "1" has been called twice

// Reset mock
reset(mockedFoo);

// Call count verification
verify(mockedFoo.getBar(1)).never();      // has never been called after reset
console.log(foo.getBar(1));               // null - previously added stub has been removed
```

You can also reset multiple mocks at once `reset(firstMock, secondMock, thirdMock)`

### Capturing method arguments

``` typescript
let mockedFoo:Foo = mock(Foo);
let foo:Foo = instance(mockedFoo);

// Call method
foo.sumTwoNumbers(1, 2);

// Check first arg captor values
const [firstArg, secondArg] = capture(mockedFoo.sumTwoNumbers).last();
console.log(firstArg);    // prints 1
console.log(secondArg);    // prints 2
```

You can also get other calls using `first()`, `second()`, `byCallIndex(3)` and more...

### Recording multiple behaviors

You can set multiple returning values for same matching values

``` typescript
const mockedFoo:Foo = mock(Foo);

when(mockedFoo.getBar(anyNumber())).thenReturn('one').thenReturn('two').thenReturn('three');

const foo:Foo = instance(mockedFoo);

console.log(foo.getBar(1));	// one
console.log(foo.getBar(1));	// two
console.log(foo.getBar(1));	// three
console.log(foo.getBar(1));	// three - last defined behavior will be repeated infinitely
```

Another example with specific values

``` typescript
let mockedFoo:Foo = mock(Foo);

when(mockedFoo.getBar(1)).thenReturn('one').thenReturn('another one');
when(mockedFoo.getBar(2)).thenReturn('two');

let foo:Foo = instance(mockedFoo);

console.log(foo.getBar(1));	// one
console.log(foo.getBar(2));	// two
console.log(foo.getBar(1));	// another one
console.log(foo.getBar(1));	// another one - this is last defined behavior for arg '1' so it will be repeated
console.log(foo.getBar(2));	// two
console.log(foo.getBar(2));	// two - this is last defined behavior for arg '2' so it will be repeated
```

Short notation:

``` typescript
const mockedFoo:Foo = mock(Foo);

// You can specify return values as multiple thenReturn args
when(mockedFoo.getBar(anyNumber())).thenReturn('one', 'two', 'three');

const foo:Foo = instance(mockedFoo);

console.log(foo.getBar(1));	// one
console.log(foo.getBar(1));	// two
console.log(foo.getBar(1));	// three
console.log(foo.getBar(1));	// three - last defined behavior will be repeated infinity
```

Possible errors:

``` typescript
const mockedFoo:Foo = mock(Foo);

// When multiple matchers, matches same result:
when(mockedFoo.getBar(anyNumber())).thenReturn('one');
when(mockedFoo.getBar(3)).thenReturn('one');

const foo:Foo = instance(mockedFoo);
foo.getBar(3); // MultipleMatchersMatchSameStubError will be thrown, two matchers match same method call

```

### Mocking interfaces

You can mock interfaces too, just instead of passing type to `mock` function, set `mock` function generic type
Mocking interfaces requires `Proxy` implementation

``` typescript
let mockedFoo:Foo = mock<FooInterface>(); // instead of mock(FooInterface)
const foo: SampleGeneric<FooInterface> = instance(mockedFoo);
```

### Mocking types

You can mock abstract classes

``` typescript
const mockedFoo: SampleAbstractClass = mock(SampleAbstractClass);
const foo: SampleAbstractClass = instance(mockedFoo);
```

You can also mock generic classes, but note that generic type is just needed by mock type definition

``` typescript
const mockedFoo: SampleGeneric<SampleInterface> = mock(SampleGeneric);
const foo: SampleGeneric<SampleInterface> = instance(mockedFoo);

```

### Spying on real objects

You can partially mock an existing instance:

``` typescript
const foo: Foo = new Foo();
const spiedFoo = spy(foo);

when(spiedFoo.getBar(3)).thenReturn('one');

console.log(foo.getBar(3)); // 'one'
console.log(foo.getBaz()); // call to a real method
```

You can spy on plain objects too:

``` typescript
const foo = { bar: () => 42 };
const spiedFoo = spy(foo);

foo.bar();

console.log(capture(spiedFoo.bar).last()); // [42] 
```

### Thanks

* Szczepan Faber (https://www.linkedin.com/in/szczepiq) 
* Sebastian Konkol (https://www.linkedin.com/in/sebastiankonkol) 
* Clickmeeting (http://clickmeeting.com)
* Michał Stocki (https://github.com/michalstocki)
* Łukasz Bendykowski (https://github.com/viman)
* Andrey Ermakov (https://github.com/dreef3)
* Markus Ende (https://github.com/Markus-Ende)
* Thomas Hilzendegen (https://github.com/thomashilzendegen)
* Johan Blumenberg (https://github.com/johanblumenberg)
