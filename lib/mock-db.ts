
import { UserProfile, Product, RFQ, Lead } from './types';

export const MOCK_USERS: UserProfile[] = [
    {
        id: 'u1',
        role: 'buyer',
        name: 'Rahul Sharma',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul',
        email: 'rahul.manager@construct.com',
        verification_status: 'verified',
        company_name: 'Sharma Heights & Co',
        location: 'Mumbai, MH'
    },
    {
        id: 'u2',
        role: 'vendor',
        name: 'BuildMat Supplies',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=BuildMat',
        email: 'sales@buildmat.com',
        verification_status: 'verified',
        company_name: 'BuildMat Premium Supplies',
        location: 'Pune, MH'
    },
    {
        id: 'u3',
        role: 'pro',
        name: 'Ar. Anjali Desai',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anjali',
        email: 'anjali.arch@designstudio.com',
        verification_status: 'verified',
        lead_credits: 150,
        company_name: 'Desai Architecture Studio',
        location: 'Bangalore, KA',
        bio: 'Award-winning architect with 10+ years of experience in sustainable residential projects.'
    }
];

export const MOCK_PRODUCTS: Product[] = [
    // --- CEMENT ---
    {
        id: 'p1',
        vendor_id: 'u2',
        title: 'UltraTech Super Cement (PPC)',
        description: 'Premium Portland Pozzolana Cement for high durability and strength. Ideal for all general construction.',
        category: 'Cement',
        price_range: '₹380 - ₹410 / bag',
        price: 380,
        unit: 'Bag (50kg)',
        attributes: [
            { key: 'Grade', value: '53 Grade' },
            { key: 'Type', value: 'PPC' },
            { key: 'Setting Time', value: '30 mins' }
        ],
        stock_status: 'in_stock',
        stock: 5000,
        images: ['https://images.unsplash.com/photo-1581094794320-c207594708fe?q=80&w=800&auto=format&fit=crop'],
        min_order_qty: 50
    },
    {
        id: 'p2',
        vendor_id: 'u2',
        title: 'ACC Concrete Plus',
        description: 'High performance cement optimized for concrete applications with faster setting time.',
        category: 'Cement',
        price_range: '₹395 - ₹420 / bag',
        price: 395,
        unit: 'Bag (50kg)',
        attributes: [
            { key: 'Grade', value: '43 Grade' },
            { key: 'Type', value: 'OPC' }
        ],
        stock_status: 'in_stock',
        stock: 2500,
        images: ['https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop'],
        min_order_qty: 50
    },
    {
        id: 'p3',
        vendor_id: 'u2',
        title: 'Ambuja Kawach Water Repellent',
        description: 'Specially formulated water-repellent cement to prevent seepage and dampness.',
        category: 'Cement',
        price_range: '₹450 - ₹480 / bag',
        price: 450,
        unit: 'Bag (50kg)',
        attributes: [
            { key: 'Feature', value: 'Water Repellent' },
            { key: 'Type', value: 'PPC' }
        ],
        stock_status: 'low_stock',
        stock: 120,
        images: ['https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?q=80&w=800&auto=format&fit=crop'],
        min_order_qty: 20
    },

    // --- STEEL & TMT ---
    {
        id: 'p4',
        vendor_id: 'u2',
        title: 'Tata Tiscon SD Rebar (Fe 550D)',
        description: 'High strength TMT bars with superior ductility and earthquake resistance.',
        category: 'Steel & TMT',
        price_range: '₹68 - ₹72 / kg',
        price: 68,
        unit: 'kg',
        attributes: [
            { key: 'Grade', value: 'Fe 550D' },
            { key: 'Diameter', value: '12mm' }
        ],
        stock_status: 'in_stock',
        stock: 10000,
        images: ['https://images.unsplash.com/photo-1535063404120-40ceb47bc042?q=80&w=800&auto=format&fit=crop'],
        min_order_qty: 500
    },
    {
        id: 'p5',
        vendor_id: 'u2',
        title: 'JSW Neosteel TMT Bar (Fe 500D)',
        description: 'Pure steel TMT bars ensuring consistency and high bonding strength with concrete.',
        category: 'Steel & TMT',
        price_range: '₹65 - ₹70 / kg',
        price: 65,
        unit: 'kg',
        attributes: [
            { key: 'Grade', value: 'Fe 500D' },
            { key: 'Diameter', value: '16mm' }
        ],
        stock_status: 'in_stock',
        stock: 8500,
        images: ['https://images.unsplash.com/photo-1610457494553-61159042b325?q=80&w=800&auto=format&fit=crop'],
        min_order_qty: 500
    },
    {
        id: 'p6',
        vendor_id: 'u2',
        title: 'Sail TMT Round Bar 8mm',
        description: 'Reliable government grade steel for stirrups and load bearing structures.',
        category: 'Steel & TMT',
        price_range: '₹62 - ₹66 / kg',
        price: 62,
        unit: 'kg',
        attributes: [
            { key: 'Grade', value: 'Fe 500' },
            { key: 'Diameter', value: '8mm' }
        ],
        stock_status: 'out_of_stock',
        stock: 0,
        images: ['https://images.unsplash.com/photo-1587293852726-70cdb56c2866?q=80&w=800&auto=format&fit=crop'],
        min_order_qty: 1000
    },

    // --- TILES & FLOORING ---
    {
        id: 'p7',
        vendor_id: 'u2',
        title: 'Kajaria Vitrified Tiles (600x600)',
        description: 'Double charged vitrified tiles with high gloss finish. Stain and scratch resistant.',
        category: 'Tiles & Flooring',
        price_range: '₹45 - ₹55 / sq.ft',
        price: 45,
        unit: 'Box (4 tiles)',
        attributes: [
            { key: 'Size', value: '600x600 mm' },
            { key: 'Finish', value: 'Glossy' }
        ],
        stock_status: 'low_stock',
        stock: 50,
        images: ['https://images.unsplash.com/photo-1620619767323-b95a89183081?q=80&w=800&auto=format&fit=crop'],
        min_order_qty: 10
    },
    {
        id: 'p8',
        vendor_id: 'u2',
        title: 'Somany Anti-Skid Bathroom Tiles',
        description: 'Matte finish ceramic tiles designed for wet areas with superior grip.',
        category: 'Tiles & Flooring',
        price_range: '₹35 - ₹45 / sq.ft',
        price: 35,
        unit: 'Box (6 tiles)',
        attributes: [
            { key: 'Size', value: '300x300 mm' },
            { key: 'Finish', value: 'Matte/Anti-Skid' }
        ],
        stock_status: 'in_stock',
        stock: 400,
        images: ['https://images.unsplash.com/photo-1584620868205-c439167b5795?q=80&w=800&auto=format&fit=crop'],
        min_order_qty: 10
    },
    {
        id: 'p9',
        vendor_id: 'u2',
        title: 'Italian Marble (Bottechino Classico)',
        description: 'Imported premium Italian marble slabs for luxurious flooring.',
        category: 'Tiles & Flooring',
        price_range: '₹350 - ₹450 / sq.ft',
        price: 350,
        unit: 'sq.ft',
        attributes: [
            { key: 'Origin', value: 'Italy' },
            { key: 'Thickness', value: '18mm' }
        ],
        stock_status: 'in_stock',
        stock: 2000,
        images: ['https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=800&auto=format&fit=crop'],
        min_order_qty: 100
    },

    // --- PAINTS ---
    {
        id: 'p10',
        vendor_id: 'u2',
        title: 'Asian Paints Royale Luxury Emulsion',
        description: 'Teflon surface protector paint providing smooth finish and washability.',
        category: 'Paints',
        price_range: '₹4500 - ₹4800 / 20L',
        price: 4500,
        unit: 'Bucket (20L)',
        attributes: [
            { key: 'Finish', value: 'Sheen' },
            { key: 'Washable', value: 'Yes' }
        ],
        stock_status: 'in_stock',
        stock: 80,
        images: ['https://images.unsplash.com/photo-1562663474-6cbb3eaa4d14?q=80&w=800&auto=format&fit=crop'],
        min_order_qty: 1
    },
    {
        id: 'p11',
        vendor_id: 'u2',
        title: 'Berger WeatherCoat Anti-Dust',
        description: 'Exterior paint with unique anti-dust technology to keep walls clean.',
        category: 'Paints',
        price_range: '₹3800 - ₹4100 / 20L',
        price: 3800,
        unit: 'Bucket (20L)',
        attributes: [
            { key: 'use', value: 'Exterior' },
            { key: 'Warranty', value: '5 Years' }
        ],
        stock_status: 'in_stock',
        stock: 150,
        images: ['https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=800&auto=format&fit=crop'],
        min_order_qty: 1
    }
];

export const MOCK_RFQS: RFQ[] = [
    {
        id: 'rfq1',
        type: 'product_bulk',
        buyer_id: 'u1',
        title: 'Order for 500 bags of PC Cement',
        details: 'Need delivery by next Tuesday at Goregaon site. Unloading required.',
        status: 'submitted',
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
        quotes: []
    },
    {
        id: 'rfq2',
        type: 'service_request',
        buyer_id: 'u1',
        title: 'Need Structural Audit for Old Building',
        details: 'G+4 building in chembur needs stability certificate.',
        status: 'submitted',
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
        quotes: []
    }
];

export const MOCK_LEADS: Lead[] = [
    {
        id: 'l1',
        type: 'service_inquiry',
        buyer_id: 'u1',
        title: 'Architect required for Villa Project',
        description: 'Planning a 3000 sqft villa in Lonavala. Need modern sustainable designs.',
        location: 'Lonavala, MH',
        status: 'new',
        cost_in_credits: 50,
        contact_details: {
            phone: '+91 98765 43210',
            email: 'client@example.com'
        }
    },
    {
        id: 'l2',
        type: 'service_inquiry',
        buyer_id: 'u4',
        title: 'Interior Design for 3BHK',
        description: 'Renovation project in Bandra. Budget approx 25L.',
        location: 'Bandra, Mumbai',
        status: 'new',
        cost_in_credits: 30,
        contact_details: {
            phone: '+91 98765 12345',
            email: 'bandra.client@example.com'
        }
    },
    {
        id: 'l3',
        type: 'service_inquiry',
        buyer_id: 'u5',
        title: 'Structural Engineer for Commercial Complex',
        description: 'Need structural vetting for a G+10 commercial project in Pune.',
        location: 'Pune, Wakad',
        status: 'new',
        cost_in_credits: 75,
        contact_details: {
            phone: '+91 91234 56780',
            email: 'builder.pune@example.com'
        }
    }
];
