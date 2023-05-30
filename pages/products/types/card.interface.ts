export interface CardI {
    id?: number;
    name: string;
    description: string;
    productKey: string;
    unitName: string;
    unitKey: string;
    price: string;
    handleProduct: () => void;
}
