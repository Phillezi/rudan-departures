package main

import (
	"encoding/json"
	"log"
	"net/http"
	"os"
	"path/filepath"
)

func main() {
	staticDir := os.Getenv("STATIC_DIR")
	if staticDir == "" {
		staticDir = "./static"
	}
	slAPIURL := os.Getenv("SL_API_URL")
	if slAPIURL == "" {
		slAPIURL = "https://services.c.web.sl.se/api/v2/departures?desiredResults=3&mode=departures&origPlaceId=QT0xQE89SMOkbHNvdsOkZ2VuIChIdWRkaW5nZSlAWD0xNzk0Nzk4OEBZPTU5MjE5MjM2QFU9NzRATD0zMDAxMDcwMDVAQj0xQA%3D%3D&origSiteId=7005&origName=H%C3%A4lsov%C3%A4gen+%28Huddinge%29"
	}
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	fs := http.FileServer(http.Dir(staticDir))

	http.HandleFunc("/api/departures", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")

		resp, err := http.Get(slAPIURL)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		defer resp.Body.Close()

		var departures interface{}
		err = json.NewDecoder(resp.Body).Decode(&departures)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		json.NewEncoder(w).Encode(departures)
	})

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		_, err := os.Stat(filepath.Join(staticDir, r.URL.Path))
		if err != nil {
			http.ServeFile(w, r, filepath.Join(staticDir, "index.html"))
			return
		}
		fs.ServeHTTP(w, r)
	})

	log.Println("Go server is starting to serve:", staticDir, "on port:", port)

	log.Fatal(http.ListenAndServe(":"+port, nil))
}
