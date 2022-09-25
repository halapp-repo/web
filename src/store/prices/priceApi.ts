import axios from 'axios';
import { Price } from '../../models/price';

export class PriceApi {
    baseUrl: string;
    constructor() {
        const baseUrl = process.env.REACT_APP_LISTING_BASE_URL
        if (!baseUrl) {
            throw new Error("REACT_APP_LISTING_BASE_URL is not set!")
        }
        this.baseUrl = baseUrl
    }

    async fetchPrice(location: string, type: string, date?: string): Promise<Price[]> {
        await axios.get(`/prices`, {
            baseURL: this.baseUrl,
            params: {
                location,
                type,
                ...(date ? {
                    date
                } : null)
            }
        }).then(response => console.log(response))
        return []
    }
}