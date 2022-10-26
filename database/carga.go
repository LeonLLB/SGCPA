package database

import (
	"gorm.io/gorm"
)

type Carga struct {
	ID        int     `gorm:"primarykey" json:"id,omitempty"`
	PNF       string  `gorm:"notNull" json:"pnf"`
	Trayecto  int     `gorm:"notNull" json:"trayecto"`
	Periodo   string  `gorm:"notNull" json:"periodo"`
	DocenteID int     `gorm:"notNull" json:"docenteId"`
	Turno     string  `gorm:"notNull" json:"turno"`
	Horario1  string  `gorm:"notNull" json:"horario1"`
	Horario2  string  `json:"horario2,omitempty"`
	Aula      uint    `gorm:"notNull" json:"aula"`
	Docente   Docente `gorm:"references:ID" json:"docente,omitempty"`
	// docente Docente @relation(fields:[docenteID],references:[id])
}

func (c *Carga) Create(nc Carga) map[string]interface{} {
	m := make(map[string]interface{})
	GetDB().Transaction(func(db *gorm.DB) error {
		crg := nc
		r := db.Create(&crg)
		if r.Error != nil {
			m["error"] = r.Error
			return r.Error
		} else {
			m["id"] = crg.ID
			m["rows"] = r.RowsAffected
			return nil
		}
	})
	return m
}

func (c *Carga) GetAll() []Carga {
	db := GetDB()
	var crgs []Carga
	db.Preload("Docente").Find(&crgs)
	return crgs
}

func (c *Carga) GetOne(id int) Carga {
	db := GetDB()
	var crg Carga
	db.First(&crg, Carga{ID: id})
	return crg
}

func (c *Carga) Update(id int, uc Carga) map[string]interface{} {
	db := GetDB()
	m := make(map[string]interface{})

	r := db.
		Model(&Carga{}).
		Where(Carga{ID: id}).
		Updates(uc)

	if r.Error != nil {
		m["error"] = r.Error
	} else {
		m["id"] = id
		m["rows"] = r.RowsAffected
	}
	return m
}

func (c *Carga) Delete(id int) map[string]interface{} {
	db := GetDB()
	r := db.Delete(&Carga{}, id)
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
