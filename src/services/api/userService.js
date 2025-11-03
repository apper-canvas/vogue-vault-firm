import { getApperClient } from "@/services/apperClient";
import { useSelector } from "react-redux";

const userService = {
  getProfile: async () => {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error("ApperClient not available");
      }

      // Get current user ID from Redux store - this would need to be passed in or accessed differently
      // For now, we'll fetch all user records and let RLS handle filtering
      const response = await apperClient.fetchRecords('users_c', {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "email_c"}},
          {"field": {"Name": "firstName_c"}},
          {"field": {"Name": "lastName_c"}},
          {"field": {"Name": "phone_c"}},
          {"field": {"Name": "addresses_c"}},
          {"field": {"Name": "CreatedOn"}}
        ],
        pagingInfo: {"limit": 1, "offset": 0}
      });

      if (!response.success) {
        throw new Error(response.message);
      }

      if (!response.data || response.data.length === 0) {
        throw new Error("User profile not found");
      }

      return response.data[0];
    } catch (error) {
      console.error("Error fetching user profile:", error);
      throw error;
    }
  },

  updateProfile: async (profileData) => {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error("ApperClient not available");
      }

      // First get current profile to get the ID
      const currentProfile = await userService.getProfile();
      
      const updateData = {
        Id: currentProfile.Id,
        firstName_c: profileData.firstName_c || profileData.firstName,
        lastName_c: profileData.lastName_c || profileData.lastName,
        phone_c: profileData.phone_c || profileData.phone
      };

      const response = await apperClient.updateRecord('users_c', {
        records: [updateData]
      });

      if (!response.success) {
        throw new Error(response.message);
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to update ${failed.length} user records:${JSON.stringify(failed)}`);
          failed.forEach(record => {
            if (record.message) throw new Error(record.message);
          });
        }
        
        return successful.length > 0 ? successful[0].data : null;
      }
    } catch (error) {
      console.error("Error updating user profile:", error);
      throw error;
    }
  },

  getAddresses: async () => {
    try {
      const profile = await userService.getProfile();
      const addressesString = profile.addresses_c;
      
      if (!addressesString) {
        return [];
      }

      try {
        return JSON.parse(addressesString);
      } catch (parseError) {
        console.error("Error parsing addresses:", parseError);
        return [];
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
      throw error;
    }
  },

  addAddress: async (address) => {
    try {
      const currentAddresses = await userService.getAddresses();
      const newAddress = {
        Id: Date.now(),
        ...address,
        isDefault: currentAddresses.length === 0
      };

      const updatedAddresses = [...currentAddresses, newAddress];
      
      await userService.updateProfile({
        addresses_c: JSON.stringify(updatedAddresses)
      });

      return newAddress;
    } catch (error) {
      console.error("Error adding address:", error);
      throw error;
    }
  }
};

export default userService;