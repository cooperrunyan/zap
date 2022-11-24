package main

import (
	"os"
	"os/exec"
)


func main() {
	exec.Command(os.Args[1], os.Args[2:]...).Start()
}
