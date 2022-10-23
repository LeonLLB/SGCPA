package database

import (
	"fmt"

	"gorm.io/gorm"
)

type PNF struct {
	ID     uint   `gorm:"primarykey" json:"id,omitempty"`
	Nombre string `gorm:"notNull;uniqueIndex:pnf_unique" json:"nombre"`
	Codigo string `gorm:"notNull;uniqueIndex:pnf_unique" json:"codigo"`
}

func (p *PNF) Create(np PNF) map[string]interface{} {
	m := make(map[string]interface{})
	GetDB().Transaction(func(db *gorm.DB) error {
		pnf := np
		r := db.Create(&pnf)
		if r.Error != nil {
			m["error"] = r.Error
			return r.Error
		} else {
			m["id"] = pnf.ID
			m["rows"] = r.RowsAffected
			return nil
		}
	})
	return m
}

func (p *PNF) GetAll() []PNF {
	db := GetDB()
	var pnfs []PNF
	r := db.Find(&pnfs)
	if r.Error != nil {
		fmt.Print(r.Error)
	}
	return pnfs
}

func (p *PNF) Delete(id int) map[string]interface{} {
	db := GetDB()
	r := db.Delete(&PNF{}, id)
	m := make(map[string]interface{})
	if r.Error != nil {
		m["error"] = r.Error
		m["ok"] = false
		return m
	}
	m["rows"] = r.RowsAffected
	m["ok"] = true
	return m
}
