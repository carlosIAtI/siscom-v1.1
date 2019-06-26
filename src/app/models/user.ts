export class User{
    constructor(
        public _id: string,
        public nombre: string,
        public apellidos: string,
        public fecha_nacimiento: string,
        public correo: string,
        public password: string,
        public role: string

    ){}

}