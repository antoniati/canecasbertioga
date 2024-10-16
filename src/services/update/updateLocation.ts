"use server";

import { pusherServer } from "@/lib/pusher";

export const updateLocation = async (lat: number, lng: number) => {
    try {
        // Envia a nova localização via Pusher
        await pusherServer.trigger("order-channel", "location-update", {
            lat,
            lng,
        });

        return { success: true };
    } catch (error) {
        console.error("Erro ao atualizar a localização:", error);
        return { success: false, error: "Erro ao atualizar a localização" };
    }
};