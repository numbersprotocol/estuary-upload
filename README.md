# estuary-upload

## Usage

### In code

```javascript
import { Estuary } from 'estuary-upload';

const estuary = new Estuary('<api-key>');
const cid = await estuary.addFromPath('my-file.jpg');
console.log(
  `The file is uploaded to Estuary with CID ${cid} preserved!`
);
```

### CLI tool to add all files in a directory

```bash
$ export ESTUARY_API_KEY=<api-key>
$ npm run add-dir <file-dirpath>

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
