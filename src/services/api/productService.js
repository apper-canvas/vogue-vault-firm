import { getApperClient } from "@/services/apperClient";

const productService = {
  getAll: async () => {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error("ApperClient not available");
      }

      const response = await apperClient.fetchRecords('products_c', {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "subcategory_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "sizes_c"}},
          {"field": {"Name": "colors_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "inStock_c"}},
          {"field": {"Name": "stockCount_c"}},
          {"field": {"Name": "featured_c"}},
          {"field": {"Name": "trending_c"}}
        ]
      });

      if (!response.success) {
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error("ApperClient not available");
      }

      const response = await apperClient.getRecordById('products_c', id, {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "subcategory_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "sizes_c"}},
          {"field": {"Name": "colors_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "inStock_c"}},
          {"field": {"Name": "stockCount_c"}},
          {"field": {"Name": "featured_c"}},
          {"field": {"Name": "trending_c"}}
        ]
      });

      if (!response.success) {
        throw new Error(response.message);
      }

      if (!response.data) {
        throw new Error("Product not found");
      }

      return response.data;
    } catch (error) {
      console.error("Error fetching product by ID:", error);
      throw error;
    }
  },

  getByCategory: async (category) => {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error("ApperClient not available");
      }

      const response = await apperClient.fetchRecords('products_c', {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "subcategory_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "sizes_c"}},
          {"field": {"Name": "colors_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "inStock_c"}},
          {"field": {"Name": "stockCount_c"}},
          {"field": {"Name": "featured_c"}},
          {"field": {"Name": "trending_c"}}
        ],
        where: [{
          "FieldName": "category_c",
          "Operator": "EqualTo",
          "Values": [category]
        }]
      });

      if (!response.success) {
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching products by category:", error);
      throw error;
    }
  },

  getFeatured: async () => {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error("ApperClient not available");
      }

      const response = await apperClient.fetchRecords('products_c', {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "subcategory_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "sizes_c"}},
          {"field": {"Name": "colors_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "inStock_c"}},
          {"field": {"Name": "stockCount_c"}},
          {"field": {"Name": "featured_c"}},
          {"field": {"Name": "trending_c"}}
        ],
        where: [{
          "FieldName": "featured_c",
          "Operator": "EqualTo",
          "Values": [true]
        }]
      });

      if (!response.success) {
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching featured products:", error);
      throw error;
    }
  },

  getTrending: async () => {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error("ApperClient not available");
      }

      const response = await apperClient.fetchRecords('products_c', {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "subcategory_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "sizes_c"}},
          {"field": {"Name": "colors_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "inStock_c"}},
          {"field": {"Name": "stockCount_c"}},
          {"field": {"Name": "featured_c"}},
          {"field": {"Name": "trending_c"}}
        ],
        where: [{
          "FieldName": "trending_c",
          "Operator": "EqualTo",
          "Values": [true]
        }]
      });

      if (!response.success) {
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching trending products:", error);
      throw error;
    }
  },

  search: async (query) => {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error("ApperClient not available");
      }

      const response = await apperClient.fetchRecords('products_c', {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "subcategory_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "sizes_c"}},
          {"field": {"Name": "colors_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "inStock_c"}},
          {"field": {"Name": "stockCount_c"}},
          {"field": {"Name": "featured_c"}},
          {"field": {"Name": "trending_c"}}
        ],
        whereGroups: [{
          "operator": "OR",
          "subGroups": [
            {"conditions": [{
              "fieldName": "name_c",
              "operator": "Contains",
              "values": [query]
            }], "operator": ""},
            {"conditions": [{
              "fieldName": "category_c",
              "operator": "Contains",
              "values": [query]
            }], "operator": ""},
            {"conditions": [{
              "fieldName": "description_c",
              "operator": "Contains",
              "values": [query]
            }], "operator": ""}
          ]
        }]
      });

      if (!response.success) {
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      console.error("Error searching products:", error);
      throw error;
    }
  }
};

export default productService;