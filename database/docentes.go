package database

import (
	"fmt"

	"gorm.io/gorm"
)

type Docente struct {
	ID        int    `gorm:"primarykey" json:"id"`
	Nombre    string `gorm:"notNull" json:"nombre"`
	Apellido  string `gorm:"notNull" json:"apellido"`
	Cedula    int    `gorm:"unique;notNull" json:"cedula"`
	Correo    string `json:"correo"`
	Telefono  string `json:"telefono"`
	Direccion string `gorm:"notNull" json:"direccion"`
	Activo    bool   `gorm:"notNull;default:true" json:"activo"`
	// cargaAcademica CargaAcademica[]
	// asesorDe Jurado[] @relation("docente")
	// metodologoDe Jurado[] @relation("metodologo")
	// academicoDe Jurado[] @relation("academico")
	// adicionalDe Jurado[] @relation("adicional")
}

func (d *Docente) Create(nd Docente) map[string]interface{} {
	m := make(map[string]interface{})
	GetDB().Transaction(func(db *gorm.DB) error {
		dcnt := nd
		r := db.Create(&dcnt)
		if r.Error != nil {
			m["error"] = r.Error
			return r.Error
		} else {
			m["id"] = dcnt.ID
			m["rows"] = r.RowsAffected
			return nil
		}
	})
	return m
}

func (d *Docente) GetAll() []Docente {
	db := GetDB()
	var dcnts []Docente
	r := db.Find(&dcnts)
	if r.Error != nil {
		fmt.Print(r.Error)
	}
	return dcnts
}

func (d *Docente) GetOne(id int) Docente {
	db := GetDB()
	dcnt := Docente{ID: id}
	r := db.First(&dcnt)
	if r.Error != nil {
		fmt.Print(r.Error)
	}
	return dcnt
}

func (d *Docente) Update(id int, ud Docente) map[string]interface{} {
	db := GetDB()
	m := make(map[string]interface{})

	r := db.
		Model(&Docente{}).
		Where(Docente{ID: id}).
		Updates(ud)

	if r.Error != nil {
		m["error"] = r.Error
	} else {
		m["id"] = id
		m["rows"] = r.RowsAffected
	}
	return m
}

func (d *Docente) Filter(do Docente) []Docente {
	db := GetDB()
	var dcnts []Docente

	var r *gorm.DB

	if do.Cedula >= 1 {
		r = db.
			Where(map[string]interface{}{"cedula": do.Cedula}).
			Where("nombre LIKE ?", "%"+do.Nombre+"%").
			Where("apellido LIKE ?", "%"+do.Apellido+"%").
			Where("correo LIKE ?", "%"+do.Correo+"%").
			Where("telefono LIKE ?", "%"+do.Telefono+"%").
			Where("direccion LIKE ?", "%"+do.Direccion+"%").
			Find(&dcnts)
	} else {
		r = db.
			Where("nombre LIKE ?", "%"+do.Nombre+"%").
			Where("apellido LIKE ?", "%"+do.Apellido+"%").
			Where("correo LIKE ?", "%"+do.Correo+"%").
			Where("telefono LIKE ?", "%"+do.Telefono+"%").
			Where("direccion LIKE ?", "%"+do.Direccion+"%").
			Find(&dcnts)
	}
	if r.Error != nil {
		fmt.Print(r.Error)
	}
	return dcnts
}

func (d *Docente) Delete(id int) map[string]interface{} {
	db := GetDB()
	r := db.Delete(&Docente{}, id)
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
