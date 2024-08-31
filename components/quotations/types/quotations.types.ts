export interface ProductQuotationInfoI {
    id: number;
    name: string,
    description: string,
    price: number,
    productKey: number,
    unitKey: string,
    unitName: string,
    quantity?: number
    taxes?: any[]
}

export interface QuotationItemsI {
    quantity: number
    product: ProductQuotationInfoI,
}