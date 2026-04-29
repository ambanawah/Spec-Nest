
import { NextResponse } from 'next/server';

const mockProductDetails = [
    {
        id: 1,
        name: 'ROG Strix SCAR 18 (2024)',
        price: '3899.99',
        image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrd4q0KvDDszC-zJtxRa_T69F10rg1Rg8SGVFube03-jOviva9NJ2FJDiAEDPez53FP-1W3CQjg71Jcu66Sg2Lr9ECXlXNeNopraN3rcfI700Qxo75C9lCAOKbqGdbmMSiH3BWABd4HxhayYhhxSTkbyN_lgi1KLzXWi_wWp8bAcu_7QfQo9-mOt_qznGqIwO41fxJMSn9sh-lpmOTLqyaZdA9Zr9SgyJ5MQPxu2QpBW9JI3YCwBM95IGFhtr0Pg5MoyR72AlVZnS4',
        details: {
            brand: 'ASUS',
            processor: 'Intel® Core™ i9-14900HX',
            memory: '32GB DDR5 5600MHz',
            storage: '2TB NVMe Gen4',
            graphics_card: 'NVIDIA GeForce RTX 4090',
            screen_size: '18 inches',
            resolution: '2560 x 1600',
            weight: '3.10 kg'
        }
    },
    {
        id: 2,
        name: 'Razer Blade 16 Mercury',
        price: '4299.00',
        image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCqUugcdjvs4a5KldoXdQ5-2oZW-jiwLv4c_T4_ywiKfY0jToWLujDkVBKIKIPkt3BPjEhZqFF8XE9OTk26eqUTOpR2sEAlxN0FkaEAf-wRn5M4LeJmu7uGDj21EgOaLwdg3zB5hCFKfQ_eSmDBWdG3n_V1TW1MEiM3OEyiml4W0ROd_7yyRaMS5vd3xtDj7vyIETTp3sYqK9rbx5Pd7l1LlfGqEDpZv8OkkGwU6ac87qjHkR7NcLPN40LN6MNWIYnBIZDHQJZA__I-/',
        details: {
            brand: 'Razer',
            processor: 'Intel® Core™ i9-14900HX',
            memory: '64GB DDR5 5200MHz',
            storage: '4TB NVMe Gen4',
            graphics_card: 'NVIDIA GeForce RTX 4090',
            screen_size: '16 inches',
            resolution: '3840 x 2400',
            weight: '2.45 kg'
        }
    },
];

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const ids = searchParams.get('ids')?.split(',') || [];

  if (ids.length === 0) {
    return NextResponse.json([]);
  }
  
  const productDetails = mockProductDetails.filter(p => ids.includes(p.id.toString()));

  return NextResponse.json(productDetails);
}
