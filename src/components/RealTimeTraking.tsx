"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import { pusherClient } from "@/lib/pusher";

const RoutingControl = dynamic(() => import("./RoutingControl"), { ssr: false });
const MapContainer = dynamic(() => import("react-leaflet").then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then(mod => mod.Popup), { ssr: false });

type Location = {
  lat: number;
  lng: number;
};

interface RealTimeTrackingProps {
  currentLocation: Location;
  destinationLocation: Location;
}

export const RealTimeTracking = ({ currentLocation, destinationLocation }: RealTimeTrackingProps) => {
  const [location, setLocation] = useState<Location>(currentLocation);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Verifica se o componente está montado no cliente

    if (typeof window !== "undefined") {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const L = require("leaflet");
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
      });
    }

    // Subscrição ao canal 'order-channel'
    const channel = pusherClient.subscribe("order-channel");

    // Escutar o evento 'location-update'
    channel.bind("location-update", (data: { lat: number; lng: number }) => {
      setLocation({ lat: data.lat, lng: data.lng });
    });

    // Limpar a subscrição ao desmontar o componente
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, []);

  if (!isMounted) {
    return null; // Evita renderização no servidor
  }

  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden">
      <MapContainer
        center={[location.lat, location.lng]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[location.lat, location.lng]}>
          <Popup>Localização atual do entregador</Popup>
        </Marker>
        <Marker position={[destinationLocation.lat, destinationLocation.lng]}>
          <Popup>Destino Final!</Popup>
        </Marker>
        <RoutingControl currentLocation={location} destinationLocation={destinationLocation} />
      </MapContainer>
    </div>
  );
};
