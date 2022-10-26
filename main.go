package main

import (
	"embed"

	database "main/database"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {

	database.MigrateAll()
	// Create an instance of the app structure
	app := NewApp()
	docente := database.Docente{}
	pnf := database.PNF{}
	carga := database.Carga{}

	// Create application with options
	err := wails.Run(&options.App{
		Title:            "Sistema de Gestión de Proyectos Académicos - UTD Francisco Tamayo",
		Width:            1024,
		Height:           720,
		Assets:           assets,
		BackgroundColour: &options.RGBA{R: 255, G: 255, B: 255, A: 1},
		OnStartup:        app.startup,
		Bind: []interface{}{
			app,
			&docente,
			&pnf,
			&carga,
		},
		DisableResize: true,
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
