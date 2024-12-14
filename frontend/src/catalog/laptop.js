import { create } from "zustand";

export const useLaptopStore = create((set) => ({
	laptops: [],
	setLaptops: (laptops) => set({ laptops }),
	addLaptop: async (newLaptop) => {
		if (!newLaptop.name || !newLaptop.specs|| !newLaptop.image || !newLaptop.price) {
			return { success: false, message: "Please fill in all fields." };
		}
		const res = await fetch("/api/laptops", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newLaptop),
		});
		const data = await res.json();
		set((state) => ({ laptops: [...state.laptops, data.data] }));
		return { success: true, message: "Laptop added successfully" };
	},
	fetchLaptops: async () => {
		const res = await fetch("/api/laptops");
		const data = await res.json();
		set({ laptops: data.data });
	},
	deleteLaptop: async (pid) => {
		const res = await fetch(`/api/laptops/${pid}`, {
			method: "DELETE",
		});
		const data = await res.json();
		if (!data.success) return { success: false, message: data.message };

		// update the ui immediately, without needing a refresh
		set((state) => ({ laptops: state.laptops.filter((laptop) =>laptop._id !== pid) }));
		return { success: true, message: data.message };
	},
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

		// update the ui immediately, without needing a refresh
		set((state) => ({
			laptops: state.laptops.map((laptop) => (laptop._id === pid ? data.data : laptop)),
		}));

		return { success: true, message: data.message };
	},
}));
