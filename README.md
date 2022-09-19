# estuary-upload

## Usage

### In code

```javascript
import { Estuary } from 'estuary-upload';

const estuary = new Estuary('<api-key>');
const resp = await estuary.add('my-file.jpg');
console.log(`The file is uploaded to Estuary with CID ${resp.data.cid} preserved!`);
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

1. Set API KEY

```bash
$ export ESTUARY_API_KEY=<api-key>
```

2. Download test image

```bash
$ ./get-test-image.sh
```

3. Run test

```bash
$ npm test
```
