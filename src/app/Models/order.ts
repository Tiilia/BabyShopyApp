import { CartElement } from './cart-element';
import { UserAddress } from './user-address';

export interface Order {
    OrderId?: number
    UserId: number
    OrderDate: Date
    Status: string
    UserAddress: UserAddress
    CartElements: CartElement[]
}
