import { getApperClient } from "@/services/apperClient";

const orderService = {
  createOrder: async (orderData) => {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error("ApperClient not available");
      }

      const orderRecord = {
        orderNumber_c: `VO${Date.now().toString().slice(-8)}`,
        items_c: JSON.stringify(orderData.items),
        subtotal_c: orderData.subtotal,
        shipping_c: orderData.shipping,
        tax_c: orderData.tax,
        total_c: orderData.total,
        shippingAddress_c: JSON.stringify(orderData.shippingAddress),
        status_c: "Processing"
      };

      const response = await apperClient.createRecord('orders_c', {
        records: [orderRecord]
      });

      if (!response.success) {
        throw new Error(response.message);
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to create ${failed.length} orders:${JSON.stringify(failed)}`);
          failed.forEach(record => {
            if (record.message) throw new Error(record.message);
          });
        }
        
        return successful.length > 0 ? successful[0].data : null;
      }
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  },

  getUserOrders: async () => {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error("ApperClient not available");
      }

      const response = await apperClient.fetchRecords('orders_c', {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "orderNumber_c"}},
          {"field": {"Name": "items_c"}},
          {"field": {"Name": "subtotal_c"}},
          {"field": {"Name": "shipping_c"}},
          {"field": {"Name": "tax_c"}},
          {"field": {"Name": "total_c"}},
          {"field": {"Name": "shippingAddress_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "CreatedOn"}}
        ],
        orderBy: [{"fieldName": "CreatedOn", "sorttype": "DESC"}]
      });

      if (!response.success) {
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching user orders:", error);
      throw error;
    }
  },

  getOrderById: async (orderId) => {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error("ApperClient not available");
      }

      const response = await apperClient.getRecordById('orders_c', orderId, {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "orderNumber_c"}},
          {"field": {"Name": "items_c"}},
          {"field": {"Name": "subtotal_c"}},
          {"field": {"Name": "shipping_c"}},
          {"field": {"Name": "tax_c"}},
          {"field": {"Name": "total_c"}},
          {"field": {"Name": "shippingAddress_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "CreatedOn"}}
        ]
      });

      if (!response.success) {
        throw new Error(response.message);
      }

      return response.data;
    } catch (error) {
      console.error("Error fetching order by ID:", error);
      throw error;
    }
  }
};

export default orderService;