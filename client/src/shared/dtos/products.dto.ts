export interface ProductDto {
    category_id: number;
    condition_id: number;
    description: string;
    id:number
    images: string[];
    product_name: string;
    price: number;
    seller: SellerDto[];
    state: number;
    stock : string;
    user_id: number;
    shipping: number;
}

export interface SellerDto {
    name: string;
}