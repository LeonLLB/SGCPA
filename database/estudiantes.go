package database

type Estudiante struct {
	ID        int    `gorm:"primarykey"`
	Nombre    string `gorm:"notNull"`
	Apellido  string `gorm:"notNull"`
	Cedula    int    `gorm:"unique;notNull"`
	Correo    string
	Telefono  string
	Direccion string `gorm:"notNull"`
	Pnf       string `gorm:"notNull"`
	Activo    bool   `gorm:"notNull;default:true"`
	Trayecto  uint   `gorm:"notNull"`
	// proyectos Proyecto[]
}
