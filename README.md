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
Output DLL
```bash
npm run dll 
```

Output App associated dll

```bash
npm run app
```

## Build

By default, `npm run build` will build without plugins.
```bash
npm run build
```

If you want to build with Happypack and DllPlugin

``` bash
npm run dist
```

If you are told you haven't permissions to execute the script, run the code below:

``` bash
$ chmod +x ./script/dist.sh
```