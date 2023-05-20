# typical

A fork of [camwiegert/typical](https://github.com/camwiegert/typical)

> Animated typing in ~400 bytes :blowfish: of JavaScript.

- **Zero dependencies**
- **MIT licensed** [→](https://github.com/tomskopek/typical/tree/master/LICENSE)
- **Emoji support**
- **Smart delete:** only delete what needs deleting
- **Pausing:** pause between steps
- **Looping:** easily loop from any point
- **Waiting:** wait on arbitrary Promises
- **Humanity:** slightly varied typing speed

[**Demo →**](https://codepen.io/camwiegert/pen/rNNepYo)

[![](https://repository-images.githubusercontent.com/211405607/1dd6e300-f8b2-11e9-8260-26ad1d49db17)](https://codepen.io/camwiegert/pen/rNNepYo "Demo on CodePen")

---

## Install

```shell
npm install @tomskopek/typical
```

## API

```typescript
type(target: HTMLElement, ...steps: any[]) => Promise<void>;
type(target: { node: HTMLElement, textAccessor: 'textContent' | 'placeholder' }, ...steps: any[]) => Promise<void>;
```

The module exports a single function, `type`, which takes a target element as its first argument, and any number of additional arguments as the steps to perform. Additional arguments perform actions based on their type:

| Type       | Action                   |
|:-----------|:-------------------------|
| `string`   | Type text                |
| `number`   | Pause (milliseconds)     |
| `function` | Call with target element |
| `Promise`  | Wait for resolution      |

## Usage

The most basic usage of `type` is providing a target element and a string to type.

```javascript
import { type } from '@tomskopek/typical';

type(element, 'text');
```

### Pausing

In order to pause typing at any point, pass a number of milliseconds to pause.

```javascript
type(element, 'Hello', 1000, 'Hello world!');
```

### Looping

In order to loop, pass `type` as a parameter to itself at the point at which you'd like to start looping. It can be helpful to alias `type` as `loop` to be explicit.

```javascript
import {
    type,
    type as loop
};

const steps = [1000, 'Ready', 1000, 'Set', 1000, 'Go'];

type(element, ...steps, loop);
```

To loop a finite amount, pass your steps multiple times.

```javascript
type(element, ...steps, ...steps, ...steps);
```

### Waiting

When passed a `Promise`, `type` will wait for it to resolve before continuing. Because `type` itself returns a `Promise`, that means you can wait on a set of steps to complete before starting another.

```javascript
const init = type(target, 'In a moment...', 500);

type(target, init, 'start', 500, 'looping', loop);
```

### Functions

Function arguments are passed the target element, and can be useful for operating on the target element between steps. If you return a `Promise`, `type` will wait for it to resolve.

```javascript
const toggle = (element) =>
    element.classList.toggle('is-typing');

type(target, toggle, 'Type me', toggle);
```

## Support

- [x] Chrome
- [x] Edge
- [x] Firefox
- [x] Safari
- [ ] Internet Explorer

## Related

- [react-typical](https://github.com/catalinmiron/react-typical) - React component
- [vue-typical](https://github.com/Turkyden/vue-typical) - Vue component
