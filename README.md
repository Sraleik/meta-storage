# Meta-Storage

## Description

Simple overlay on bluzelle Connection

- Strigify data before save
- JSON.parse data on read
- add a set function that create or update key when needed

## Installation

```bash
npm install @sraleik/meta-storage
```

```bash
yarn add @sraleik/meta-storage
```

```bash
pnpm add @sraleik/meta-storage
```

## Usage 

```javascript
const { createMockBluzelle } = require('@sraleik/mock-bluzelle');  //Or any kind of bluzelle connection
const { createMetaStorage } = require("@sraleik/meta-storage");

const mockBluzelle = await createMockBluzelle();
const metaStorage = await createMetaStorage(mockBluzelle);

await metaStorage.set('lol', {winner: 'chickenDinner'})
res = await metaStorage.read('lol')
```
