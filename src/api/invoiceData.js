export const invoicesData = [
  {
    id: 'INV-2025-001',
    quotationId: 'QT-2025-001',
    clientName: 'Rajesh Enterprises',
    clientGstin: '24AAAAA0000A1Z5',
    date: '2025-10-30',
    dueDate: '2025-11-29',
    status: 'Paid',
    items: [
      { product: 'MCB Panel Board', hsn: '85371010', qty: 10, rate: 8500, gst: 18 },
      { product: '4 Core Armoured Cable', hsn: '85444290', qty: 500, rate: 120, gst: 18 }
    ],
    subtotal: 145000,
    cgst: 13050,
    sgst: 13050,
    total: 171100,
    paymentMethod: 'Bank Transfer'
  },
  {
    id: 'INV-2025-002',
    quotationId: 'QT-2025-002',
    clientName: 'Gujarat Electricals',
    clientGstin: '24BBBBB1111B1Z5',
    date: '2025-10-31',
    dueDate: '2025-11-30',
    status: 'Pending',
    items: [
      { product: 'LED Panel Light 40W', hsn: '94054090', qty: 100, rate: 450, gst: 18 },
      { product: 'Copper Wire 2.5mm', hsn: '85442000', qty: 200, rate: 85, gst: 18 }
    ],
    subtotal: 62000,
    cgst: 5580,
    sgst: 5580,
    total: 73160,
    paymentMethod: 'Pending'
  },
  {
    id: 'INV-2025-003',
    quotationId: null,
    clientName: 'Shree Electronics',
    clientGstin: '24CCCCC2222C1Z5',
    date: '2025-11-01',
    dueDate: '2025-12-01',
    status: 'Overdue',
    items: [
      { product: 'Distribution Board', hsn: '85371010', qty: 5, rate: 12000, gst: 18 }
    ],
    subtotal: 60000,
    cgst: 5400,
    sgst: 5400,
    total: 70800,
    paymentMethod: 'Cash'
  }
];
