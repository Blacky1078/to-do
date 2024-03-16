export interface Reg {
    firstName: string,
    lastName: string,
    email: string,
    password: string
}

export interface log {
    email: string
}

export type createtodo = {
    id?: any,
    email?: string,
    title?: string,
    desc?: string,
    dT?: string,
    status?: string
}

export interface Column {
    field: string,
    header: string
}
let email!: string
let title!: string
let desc!: string
let dT!: string
let status!: string

export let todo = [
    email,
    title,
    desc,
    dT,
    status
]

export function changer (to: string,ti: string,de: string,td: string,st: string){
    todo[0] = to,
    todo[1] = ti,
    todo[2] = de,
    todo[3] = td,
    todo[4] = st
}
