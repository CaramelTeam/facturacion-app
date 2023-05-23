export interface TableProps {
    tableCells: string[];
    tableData: [
        {
            cliente: string;
            cancelacion: string;
            fecha: string;
            tipo: string;
            total: string;
            folio: number;
            pago: string;
            history: any;
        }
    ];
}