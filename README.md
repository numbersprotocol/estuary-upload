# estuary-upload

Estuary project [terminated on 2023-08-10](https://x.com/Estuary_Tech/status/1689468956980228096?s=20), so this repository is also archived.

Upload your file to Estuary and generate Numbers ID (Nid, the same as [default IPFS CIDv1](https://github.com/ipfs/kubo)).

If you upload a file to Estuary and find the CIDv1 is different from Kubo (IPFS implementation in Go) CIDv1, it is because both Kubo and Estuary generate CIDv1, but they use different chunk sizes: Kubo (256 KB) vs Estuary (1 MB). estuary-upload helps you generate Nid (Kubo CIDv1) in any file size.

## Installation
```bash
yarn global add @numbersprotocol/estuary-upload
```

## Usage

### In code

Add from path

```javascript
import { Estuary } from 'estuary-upload';

const estuary = new Estuary('<api-key>');
const cid = await estuary.addFromPath('my-file.jpg');
console.log(
  `The file is uploaded to Estuary with CID ${cid} preserved!`
);
```

Add from Nid (Kubo CIDv1)

```javascript
import { Estuary } from 'estuary-upload';

const estuary = new Estuary('<api-key>');
const cid = await estuary.addFromCid(
  'bafkreia2254bseihmsqw7fzxsk54p7nqmitn2ibhnjiafxtql6by54idv4'
);
console.log(
  `The file is uploaded to Estuary with CID ${cid} preserved!`
);
```

Add from buffer

```javascript
import { Estuary } from 'estuary-upload';

const estuary = new Estuary('<api-key>');
const cid = await estuary.addFromBuffer(new Uint8Array([21, 31, 41]));
console.log(
  `The file is uploaded to Estuary with CID ${cid} preserved!`
);
```

### CLI tool to add all files in a directory

```
$ export ESTUARY_API_KEY=<api-key>
$ estuary-upload add-dir <dirpath>
[
  ...
  'bafkreia2254bseihmsqw7fzxsk54p7nqmitn2ibhnjiafxtql6by54idv4',
  'bafkreigrov5qj25vp2vawsjlav5v3veihagovvddjodlydspmy2mtmks5q',
  ... 900 more items
]
```

### CLI tool to add specific files

```
$ estuary-upload -k <api-key> add-files <filepath...>
[
  ...
  'bafkreia2254bseihmsqw7fzxsk54p7nqmitn2ibhnjiafxtql6by54idv4',
  'bafkreigrov5qj25vp2vawsjlav5v3veihagovvddjodlydspmy2mtmks5q',
  ... 900 more items
]
```

## Run Test

### Unit Test

```bash
$ npm run unit
```

### Integration Test

The integration test will fetch an image (size ~20MB) from public IPFS gateway and upload it to Estuary.

1. Set API key

```
$ export ESTUARY_API_KEY=<api-key>
```

2. Run test

```
$ npm run integration
```
