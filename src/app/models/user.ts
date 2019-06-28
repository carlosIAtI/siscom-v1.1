export class User{
    constructor(
        public _id: string,
        public nombre: string,
        public apellidos: string,
        public correo: string,
        public fecha_nacimiento: string,
        public telefono: string,
        public escuela: string,
        public cp: string,
        public sucursal: string,
        public password: string,
        public role: string

    ){}

}