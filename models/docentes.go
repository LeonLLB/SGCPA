package models

type Docente struct {
	ID        uint   `gorm:"primarykey"`
	Nombre    string `gorm:"notNull"`
	Apellido  string `gorm:"notNull"`
	Cedula    uint   `gorm:"unique;notNull"`
	Correo    string
	Telefono  string
	Direccion string `gorm:"notNull"`
	Activo    bool   `gorm:"notNull;default:true"`
	// cargaAcademica CargaAcademica[]
	// asesorDe Jurado[] @relation("docente")
	// metodologoDe Jurado[] @relation("metodologo")
	// academicoDe Jurado[] @relation("academico")
	// adicionalDe Jurado[] @relation("adicional")
}
