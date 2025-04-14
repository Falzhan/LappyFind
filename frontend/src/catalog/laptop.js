import { create } from "zustand";

export const useLaptopStore = create((set) => ({
  laptops: [],
  setLaptops: (laptops) => set({ laptops }),

  // Add a new laptop
  addLaptop: async (newLaptop) => {
    if (!newLaptop.name || !newLaptop.specs || !newLaptop.image || !newLaptop.price || !newLaptop.uploader || !newLaptop.condition) {
      return { success: false, message: "Please fill in all fields." };
    }
    const res = await fetch("/api/laptops", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newLaptop.name,
        specs: newLaptop.specs,
        price: newLaptop.price,
        condition: newLaptop.condition,
        image: newLaptop.image,
        uploader: newLaptop.uploader,
        source: newLaptop.source,
      }),
    });
    const data = await res.json();
    set((state) => ({ laptops: [...state.laptops, data.data] }));
    return { success: true, message: "Laptop added successfully" };
  },

  // Fetch all laptops
  fetchLaptops: async () => {
    const res = await fetch("/api/laptops");
    const data = await res.json();
    set({ laptops: data.data });
  },

  // Delete a laptop
  deleteLaptop: async (pid) => {
    const res = await fetch(`/api/laptops/${pid}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };

    set((state) => ({
      laptops: state.laptops.filter((laptop) => laptop._id !== pid),
    }));
    return { success: true, message: data.message };
  },

  // Update a laptop
  updateLaptop: async (pid, updatedLaptop) => {
    const res = await fetch(`/api/laptops/${pid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedLaptop),
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };

    set((state) => ({
      laptops: state.laptops.map((laptop) => (laptop._id === pid ? data.data : laptop)),
    }));
    return { success: true, message: data.message };
  },

  // Upvote a laptop
  upvoteLaptop: async (pid) => {
    const res = await fetch(`/api/laptops/${pid}/upvote`, {
      method: "POST",
    });
    const data = await res.json();
    if (!res.ok) return { success: false, message: data.message };

    set((state) => ({
      laptops: state.laptops.map((laptop) =>
        laptop._id === pid ? { ...laptop, upvotes: laptop.upvotes + 1 } : laptop
      ),
    }));
    return { success: true, message: data.message };
  },

  // Downvote a laptop
  downvoteLaptop: async (pid) => {
    const res = await fetch(`/api/laptops/${pid}/downvote`, {
      method: "POST",
    });
    const data = await res.json();
    if (!res.ok) return { success: false, message: data.message };

    set((state) => ({
      laptops: state.laptops.map((laptop) =>
        laptop._id === pid ? { ...laptop, downvotes: laptop.downvotes + 1 } : laptop
      ),
    }));
    return { success: true, message: data.message };
  },
}));