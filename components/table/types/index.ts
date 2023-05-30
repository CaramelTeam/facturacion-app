export interface TableProps {
    tableCells: string[];
    tableData: dataBody[];
}

export interface dataBody {
    id: string;
    owner: OwnerI;
    cancellation_status: string;
    expidition_date: string;
    type: string;
    total: string;
    folio_number: number;
    payment_status: string;
    items?: ItemI[] | undefined;
    url_files: string;
}

export interface ItemI {
    price: number,
    total: number,
    quantity: number,
    invoiceId: string,
    product: string
    productKey: number
}

export interface OwnerI {
    legal_name: string,
}
// interface ProductsI {
//     productKey: number
//     name: string
// }
