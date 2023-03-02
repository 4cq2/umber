package main

import (
  "fmt"
  "net/http"
)

const port = ":99"

func main() {
   file := http.FileServer(http.Dir("docs"))
   http.Handle("/", http.StripPrefix("/umber", file))
   fmt.Println("localhost" + port)
   http.ListenAndServe(port, nil)
}
