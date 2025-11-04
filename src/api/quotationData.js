export const quotationsData = [
  {
    id: 'QT-2025-001',
    clientName: 'Rajesh Enterprises',
    date: '2025-10-28',
    validTill: '2025-11-27',
    status: 'Sent',
    items: [
      { product: 'MCB Panel Board', hsn: '85371010', qty: 10, rate: 8500, gst: 18 },
      { product: '4 Core Armoured Cable', hsn: '85444290', qty: 500, rate: 120, gst: 18 }
    ],
    subtotal: 145000,
    cgst: 13050,
    sgst: 13050,
    total: 171100
  },
  {
    id: 'QT-2025-002',
    clientName: 'Gujarat Electricals',
    date: '2025-10-29',
    validTill: '2025-11-28',
    status: 'Approved',
    items: [
      { product: 'LED Panel Light 40W', hsn: '94054090', qty: 100, rate: 450, gst: 18 },
      { product: 'Copper Wire 2.5mm', hsn: '85442000', qty: 200, rate: 85, gst: 18 }
    ],
    subtotal: 62000,
    cgst: 5580,
    sgst: 5580,
    total: 73160
  },
  {
    id: 'QT-2025-003',
    clientName: 'Bright Lights Co',
    date: '2025-10-30',
    validTill: '2025-11-29',
    status: 'Pending',
    items: [
      { product: 'Street Light LED 100W', hsn: '94054090', qty: 50, rate: 2500, gst: 18 },
      { product: 'Junction Box IP65', hsn: '85389099', qty: 60, rate: 180, gst: 18 }
    ],
    subtotal: 135800,
    cgst: 12222,
    sgst: 12222,
    total: 160244
  }
];
