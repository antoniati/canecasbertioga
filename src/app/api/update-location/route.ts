import { pusherServer } from "@/lib/pusher";

export async function POST(req: Request) {
  try {
    const { lat, lng } = await req.json(); // Lê o corpo da requisição e converte em JSON

    // Verificar se os parâmetros necessários estão presentes
    if (!lat || !lng) {
      return new Response(JSON.stringify({ message: "Latitude and Longitude are required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Enviar os dados da nova localização pelo canal do Pusher
    await pusherServer.trigger("order-channel", "location-update", {
      lat,
      lng,
    });

    return new Response(JSON.stringify({ message: "Location updated successfully" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Failed to update location" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}