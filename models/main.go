package models

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

type Test struct {
	ID     uint `gorm:"primarykey"`
	Code   string
	Price  uint
	Pingas uint
}

func GetDB() *gorm.DB {
	db, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}
	return db
}

// Migrates all Database structs defined in this package to the database
func MigrateAll() {

	GetDB().AutoMigrate(
		&Test{},
		&Estudiante{},
		&Docente{},
	)

}
