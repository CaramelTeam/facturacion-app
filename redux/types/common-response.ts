export interface CommonResponseI<T> {
    data: T[],
    metadata: {
        page: number,
        perPage: number
    }
}