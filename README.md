# typescript-stephen-grider

## 19. TypeScript

##### Commands

> npm i -g typescript
> 
> npm i -g parcel-bundler

##### The TS Type System

- Helps us catch errors during development
  
- Uses `type annotatios` to analyze our code
  
- **Only active during development**: Browser & NodeJS have no idea what Typescript is.
  
- Doesn't provide any performance optimization
  

Typescript Code (JavaScript with type annotations) => TypeScript compiler => Plain old JavaScript

##### Type Annotation vs Type Inference

- Primitive Types & Object Types (functions, arrays, classes, objects)
  
- Type annotation & inference are applied differently to variables, functions & objects.
  

###### Variables

- **Type Annotation**: Code we add to tell TypeScript what type of value a variable will refer to.
  
- **Type Inference**: TypeScript tries to figure out what type of value a variable refers to.
  

```typescript
// annotation: we (developers) tell TS the type
let apples: number = 5
// built-in objects
let now: Date = new Date()
// array
let colors: string[] = ['red', 'purple', 'white']
// classes
class Car {}
let car: Car = new Car()
// object literal
let point: { x: number; y: number; } = {x: 10, y: 20}
// function annotation: (i: number) => void 
const logNumber: (i: number) => void = (i: number) => {
    console.log(i)
}
```

Three different scenarios where we are going to add in type annotations manually

1. When a function returns `any` type and we need to clarify the value
  
2. When we declare the variable on one line and then initialize it later
  
3. When we want a variable to have a type that can't be inferred
  

```typescript
// inference: TS guesses the type
// scenario: 1
const json = '{"x": 10, "y":20}'
const coordinates = JSON.parse(json) // coordinates <- any
// TS can't predict what we will get back from the function - can't 
// check for correct property references 
// avoid variables with `any` type at all costs

// fixing the `any` type
const coordinates: { x: number; y: number; } = JSON.parse(json) 

// scenario: 2
// not prefered/redundant
let number1 : number = 5 // 5.0

// this is Ok!
let number2 : number

// if declaration & initialization are on the same line,
// TS will figure out the type of variable for us.
let number3 // <- any
number3 = 5

// scenario: 3 
let numbers = [-10, -1, 12]
let numberAboveZero: boolean | number = false // Union Type
for (let i = 0; i < numbers.length; i++) {
    if(numbers[i] > 0) {
        numberAboveZero = number[i]
    }
}
```

###### Functions

- **Type Annotation**: Code we add to tell TypeScript what type of argument a function will receive and what type of value it will return.
  
- **Type Inference**: TypeScript tries to figure out what type of value a function will **return** but we won't use it.
  
  - It works out output, but we won't use it
    
  - It does no type inference for **arguments**
    

```typescript
// the annotation that we wrote out in previous example was for 
// the variable
const logNumber: (i: number) => void = (i: number) => {
    console.log(i)
}

// function type annotation
const add = (a: number, b: number): number => {
    return a + b
}

// function type inference
const add = (a: number, b: number) => {
    return a + b
}

// We won't use type inference. Why? 
// Becasue no error on omitting return 
const sub = (a: number, b: number) => {
    a - b
}
```

###### Destructuring with Functions

```typescript
const todaysWeather = {
    date: new Date(),
    weather: "sunny"
}

const logWeather = (forecast: {date: Date; weather: string;}): void => {
    console.log(forecast.date)
    console.log(forecast.weather)
}

// JS - ES6
const logWeather2 = ({date, weather}): void => {
    console.log(date)
    console.log(weather)
}

// TS - destructuring
// JS - ES6
const logWeather3 = ({date, weather}: {date: Date; weather: string;}): void => {
    console.log(date)
    console.log(weather)
}

logWeather3(todaysWeather)
```

###### Objects

```ts
const profile = {
    name: "alex",
    age: 19,
    coords: {
        lat: 0,
        lng: 15
    },
    setAge(age: number): void {
        this.age = age
    }
}

// const { age } = profile
const { age }: {age: number} = profile
const { coords: {lat, lng} }: { coords: {lat:number; lng: number;}} = profile
```

##### Arrays

```typescript
const carMakers = [] // <- any or never based on tsconfig.json
const carMarkes: string[] = []

// Why do we care about typed arrays?
// Help with interference when extracting values from an array
const cars = ['civic', 'range rover', 'mehran']
const car = cars[0] // <- car is string

// Prevent us from adding imcompatible values to the array
cars.push(10) // error

// Help with array related methods (.map), (.toLowerCase) etc.

// Flexible values using union type
```

##### Tuples

- Have fixed order, length & type
  
- `push` bypasses above restriction
  

```ts
// Why it is better to use objects? 
// Give more information and clarity
const drink = {
    color: 'brown',
    carbonated: true,
    sugar: 40
}

const pepsi = ['brown', true, 40] // <- this is an array 
const pepsi: [string, boolean, number] = ['brown', true, 40] // <- tuple

// Type alias
type Drink = [string, boolean, number]
const sprite: Drink = ['clear', true, 40]

// Why we won't be using tuples?
const carSpecs: [number, number] = [400, 3354]
// What do these numbers mean?

const carStats = {
    horsePower: 400,
    weight: 3354
}
```

##### Interfaces

- To avoid long type annotations
  
- It doesn't matter if we have additional properties on `oldCivic`, when TS tries to decide whether `oldCivic` is a vehicle or not, it's only going to check to see if it has this list (specified in vehicle interface) of properties or not.
  

##### Classes (Blueprint)

**public**: (by default)

**private**: can only be called by other methods in this class

**protected**: can only be called by other methods in this class, or by other methods in child classes

- We can't change `modifiers` in the child class
  
- protected fields and methods can be used in all the child classes not only immediate children
  

```ts
class Vehicle {
    color: string
    constructor(color: string) {
        this.color = color
    }

    // better way
    constructor(public color: string) {}
}
```

###### Inheritance

```ts
class Vehicle {
    constructor(public color: string) {}
}

class Car extends Vehicle {
    constructor(public wheels: number, color: string) { 
        // C++ => Car(int wheels, string color):Vehicle(color){}
        super(color)
    }
}

const car = new Car(10, "red")
```

##### Type Definition Files

> npm i faker
> 
> npm i @types-faker

- Type definition files `index.d.ts` have `.d` in their name
  
- We have to add type definition files for the libraries added through scripts
  

> npm i @types/google.maps

- We typically don't use default exports in TS.
