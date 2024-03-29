# A simple webapp that displays departures from rudan
Running: [here](https://rudan-departures.app.cloud.cbh.kth.se/).
## Frontend
Made with Vite and React
## Backend
Made with go, has a api path that acts as a proxy to serve SL departures from the path specified in the env variable `SL_API_URL`.

## Running the docker image
```bash
docker run -p 8080:8080 phillezi/rudan-departures

```

## Building and running to a docker image
To build and run you need `node`, `npm`, `git` and `Docker`.
```bash
git clone git@github.com:Phillezi/rudan-departures.git
cd rudan-departures
cd rudan-disp
npm install
npm run build
cd ..
docker build -t rudan-departures:latest .
docker run -p 8080:8080 rudan-departures

```
## Building and running without docker
To build you will need `git`, `go`, `node` and `npm`.
### On Linux
```bash
git clone git@github.com:Phillezi/rudan-departures.git
cd rudan-departures/rudan-disp
npm install
npm run build
cd ../container/
mkdir ./static
cp -r ../rudan-disp/dist/* ./static/.
go build -o main .
./main

```
### On Windows (not tested)
```ps
git clone git@github.com:Phillezi/rudan-departures.git
cd rudan-departures\rudan-disp
npm install
npm run build
cd ..\container
mkdir static
xcopy ..\rudan-disp\dist\* .\static\ /s /e
go build -o main .
main.exe

```
