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

## Dll
Output vendor
```bash
npm run vendor
```

## Build

By default, `npm run build` will build without plugins.
```bash
npm run build
```

If you want to build with Happypack and DllPlugin

``` bash
npm run dll happy
```

If you want to build only with DllPlugin

``` bash
npm run dll
```

If you want to build only with Happypack

``` bash
npm run happy
```

If you are told you haven't permissions to execute the script, run the code below:

``` bash
$ chmod +x ./script/dist.sh
```