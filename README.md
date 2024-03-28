# A simple webapp that displays departures from rudan
## Frontend
Made with Vite and React
## Backend
Made with go, has a api path that acts as a proxy to serve SL departures from the path specified in the env variable `SL_API_URL`.

## Building and running
To build and run you need node, nvm, git and Docker.
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
