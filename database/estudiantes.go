package database

type Estudiante struct {
	ID        uint   `gorm:"primarykey"`
	Nombre    string `gorm:"notNull"`
	Apellido  string `gorm:"notNull"`
	Cedula    uint   `gorm:"unique;notNull"`
	Correo    string
	Telefono  string
	Direccion string `gorm:"notNull"`
	Pnf       string `gorm:"notNull"`
	Activo    bool   `gorm:"notNull;default:true"`
	Trayecto  uint   `gorm:"notNull"`
	// proyectos Proyecto[]
}
