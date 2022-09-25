import { Price } from '../../models/price'

export interface PriceState {
    [date: string]: Price[]
}