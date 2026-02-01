
export type Role = 'buyer' | 'vendor' | 'pro';

export interface UserProfile {
    id: string;
    role: Role;
    name: string;
    avatar: string;
    email: string; // for display only
    verification_status: 'verified' | 'pending' | 'unverified';
    lead_credits?: number; // For pros
    company_name?: string; // For vendors/pros
    location?: string;
    bio?: string;
}

export interface ProductAttribute {
    key: string;
    value: string;
}

export interface Product {
    id: string;
    vendor_id: string;
    title: string;
    description: string;
    category: string;
    price_range: string; // e.g., "₹350 - ₹380 / bag"
    price: number; // Added for sorting/filtering
    unit: string;
    attributes: ProductAttribute[];
    stock_status: 'in_stock' | 'low_stock' | 'out_of_stock';
    stock: number; // Added for numeric inventory check
    images: string[];
    min_order_qty?: number;
}

export interface PortfolioItem {
    id: string;
    pro_id: string;
    project_name: string;
    location: string;
    images: string[];
    tags: string[];
    description: string;
}

export type RFQType = 'product_bulk' | 'service_request';
export type RFQStatus = 'submitted' | 'quoted' | 'accepted' | 'completed';

export interface RFQ {
    id: string;
    type: RFQType;
    buyer_id: string;
    target_vendor_id?: string; // If direct request
    title: string;
    details: string; // JSON string or text
    status: RFQStatus;
    created_at: string;
    quotes?: Quote[];
}

export interface Quote {
    id: string;
    rfq_id: string;
    vendor_id: string;
    price: number;
    notes: string;
    created_at: string;
}

export interface Lead {
    id: string;
    type: 'service_inquiry';
    buyer_id: string;
    pro_id?: string; // If assigned
    title: string;
    description: string;
    location: string;
    status: 'new' | 'unlocked' | 'contacted';
    cost_in_credits: number;
    contact_details?: {
        phone: string;
        email: string;
    };
}
