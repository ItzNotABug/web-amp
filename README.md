# Appwrite Web SDK

This is the same SDK as [appwrite](https://www.npmjs.com/package/appwrite) with added support for `params` in methods.
No more passing `undefined` now!

**This SDK is only compatible with a minimum of Appwrite server version 1.5.x.**

## Installation

### NPM

To install via [NPM](https://www.npmjs.com/):

```bash
npm install @itznotabug/web-amp --save
```

If you're using a bundler (like [Rollup](https://rollupjs.org/) or [webpack](https://webpack.js.org/)), you can import
the Appwrite module when you need it:

```js
import { Client, Account } from "web-amp";
```

### CDN

To install with a CDN (content delivery network) add the following scripts to the bottom of your <body> tag, but before
you use any Appwrite services:

```html

<script src="https://cdn.jsdelivr.net/npm/@itznotabug/web-amp@1.5.2"></script>
```

## Getting Started

Same as https://github.com/appwrite/sdk-for-web?tab=readme-ov-file#getting-started.

## Example Usage

Before -

```ts
const teams = new Teams(client);
await teams.createMembership(
    'productId',
    [Role.label('product')],
    undefined,
    undefined,
    undefined,
    undefined,
    'Product Team'
);
```

After -

```ts
const teams = new Teams(client);
await teams.createMembership('productId', [Role.label('product')], {
    name: 'Product Team',
});
```