const express = require('express');
const request = require('request');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/api/departures', (req, res) => {
  request(
    { url: 'https://services.c.web.sl.se/api/v2/departures?desiredResults=3&mode=departures&origPlaceId=QT0xQE89SMOkbHNvdsOkZ2VuIChIdWRkaW5nZSlAWD0xNzk0Nzk4OEBZPTU5MjE5MjM2QFU9NzRATD0zMDAxMDcwMDVAQj0xQA%3D%3D&origSiteId=7005&origName=H%C3%A4lsov%C3%A4gen+%28Huddinge%29' },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: err.message });
      }

      res.json(JSON.parse(body));
    }
  )
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));