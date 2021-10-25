import { Role } from './role';

export interface User {
    email: string
    fullName: string
    UserId: number
    registerDate: Date
    Role: Role
}
