package main

import (
   "fmt"
   "net/http"
   "time"
)

const port = ":99"

func main() {
   http.HandleFunc("/", func(w http.ResponseWriter, req *http.Request) {
      now := time.Now()
      fmt.Fprint(w, now)
   })
   fmt.Println("localhost" + port)
   http.ListenAndServe(port, nil)
}
