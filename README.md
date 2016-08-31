# ts-mockito

## Main features

* `mock` - create mock
* `when` - specify how mock should behave via:
	* `thenReturn`, `thenThrowsError` - return value or throw an exception
* `verify` - check if methods were called with given arguments
	* `anything`, `notNull`, `anyString`, `arrayContainig` etc. - for more flexible comparision
	* `once`, `twice`, `times`, `atLeast` etc. - allows call count verification
* recording multiple behaviors

## Usage

### Basics
```typescript
// Creating mock
let mockedFoo:Foo = mock(Foo);

// Getting instance
let foo:Foo = instance(mockedFoo);

// Using mock object
foo.getBar(3);
foo.getBar(5);

// Explicit, readable verification
verify(fooMock.getBar(3)).called();
verify(fooMock.getBar(5)).called();
```

### Stubbing method calls

```typescript
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

### Call count verification

```typescript
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
verify(mockedFoo.getBar(between(2, 3))).thrice(); // was called with arg beween 2-3 exactly three times
verify(mockedFoo.getBar(anyNumber()).time(4);     // was called with any number arg exactly four times
verify(mockedFoo.getBar(2)).atLeast(2);           // was called with arg === 2 min two times
verify(mockedFoo.getBar(1)).atMoast(1);           // was called with arg === 1 max one time
verify(mockedFoo.getBar(4)).never();              // was never called with arg === 4
```

### Recording multiple behaviors

If more than one behavior is set, first matching is executed and removed

```typescript

let mockedFoo:Foo = mock(Foo);

when(mockedFoo.getBar(anyNumber())).thenReturn('one');
when(mockedFoo.getBar(anyNumber()).thenReturn('two');
when(mockedFoo.getBar(anyNumber())).thenReturn('three');

let foo:Foo = instance(mockedFoo);

console.log(foo.getBar(1));	// one
console.log(foo.getBar(1));	// two
console.log(foo.getBar(1));	// three
console.log(foo.getBar(1));	// null - no more behaviors defined
```
