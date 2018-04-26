# webpack-build-speed-testing

Code to test webpack's build time.

## install
```bash
cnpm i
```

## Development

```bash
npm start
```

## Build

By default, `npm run build` will build without plugins.

If you want to build with Happypack and DllPlugin, just pass a `dll` param:

``` bash
npm run build dll
```

If you are told you haven't permissions to execute the script, run the code below:

``` bash
$ chmod +x ./script/build.sh
```