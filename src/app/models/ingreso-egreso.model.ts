export class IngresoEgreso {

    constructor(
        public description: string,
        public quantity: number,
        public type: string,
        public uid?: string
    ) { }
}