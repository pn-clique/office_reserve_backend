export default {
    components: {
      schemas: {
        AuthLogin: {
          type: 'object',
          properties: {
            auth: {
              type: 'object',
              properties: {
                type: { type: 'string' },
                token: { type: 'string' },
              },
            },
            user: {
              type: 'object',
              $ref: '#/components/schemas/Auth',
            },
          },
        },
        Auth: {
          type: 'object',
          properties: {
            email: { type: 'string' },
            password: { type: 'string' },
          },
        },
        User: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            email: { type: 'string' },
            name: { type: 'string' },
            phone: { type: 'string' },
            createdAt: { type: 'string' },
            updatedAt: { type: 'string' },
          },
        },
        Places: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            capacity: { type: 'number' },
            photo: { type: 'string' },
            Booking: [{ type: 'string' }],
            createdAt: { type: 'string' },
            updatedAt: { type: 'string' },
          },
        },
        Modality: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            duration: { type: 'int' },
            price: { type: 'float' },
            description: { type: 'string' },
            Booking: [{ type: 'string' }],
            createdAt: { type: 'string' },
            updatedAt: { type: 'string' },
          },
        },
        Bookings: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            user_id: { type: 'string' },
            place_id: { type: 'string' },
            modality_id: { type: 'string' },
            init_date: { type: 'string' },
            final_date: { type: 'string' },
            start_time: { type: 'string' },
            end_time: { type: 'string' },
            status: { type: 'string' },
            description: { type: 'string' },
            reference: { type: 'string' },
            createdAt: { type: 'string' },
            updatedAt: { type: 'string' },
          },
        },
        PurchaseOrder: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            booking_id: { type: 'string' },
            total_price: { type: 'number' },
            createdAt: { type: 'string' },
            updatedAt: { type: 'string' },
          },
        },
      },
    },
  };