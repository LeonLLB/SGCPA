package database

type Docente struct {
	ID        uint   `gorm:"primarykey" json:"id"`
	Nombre    string `gorm:"notNull" json:"nombre"`
	Apellido  string `gorm:"notNull" json:"apellido"`
	Cedula    uint   `gorm:"unique;notNull" json:"cedula"`
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
