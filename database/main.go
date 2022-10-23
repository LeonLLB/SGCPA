package database

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func GetDB() *gorm.DB {
	db, err := gorm.Open(sqlite.Open("sgcpa.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}
	return db
}

// Migrates all Database structs defined in this package to the database
func MigrateAll() {

	GetDB().AutoMigrate(
		&Estudiante{},
		&Docente{},
		&PNF{},
	)

}
