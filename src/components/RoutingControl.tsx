"use client";

import L from "leaflet";
import "leaflet-routing-machine";
import { useEffect, useState, useCallback } from "react";
import { useMap } from "react-leaflet";

type Location = {
    lat: number;
    lng: number;
};

interface RoutingControlProps {
    currentLocation: Location;
    destinationLocation: Location;
}

const RoutingControl = ({ currentLocation, destinationLocation }: RoutingControlProps) => {
    const map = useMap();
    const [routingControl, setRoutingControl] = useState<L.Routing.Control | null>(null);

    const setupRoutingControl = useCallback(() => {
        // Se o mapa não estiver disponível, não continuar
        if (!map) return;

        // Remover o controle de roteamento anterior, se existir
        if (routingControl) {
            map.removeControl(routingControl);
        }

        // Adicionar o controle de roteamento
        const control = L.Routing.control({
            waypoints: [
                L.latLng(currentLocation.lat, currentLocation.lng),
                L.latLng(destinationLocation.lat, destinationLocation.lng),
            ],
            routeWhileDragging: true,
            lineOptions: {
                styles: [{ color: "#473BF0", opacity: 0.8, weight: 6 }],
                extendToWaypoints: false,
                missingRouteTolerance: 0,
            },
        }).addTo(map);

        // Atualizar o estado com o controle de roteamento
        setRoutingControl(control);
    }, [map, routingControl, currentLocation, destinationLocation]);

    useEffect(() => {
        // Função para lidar com mudança de visibilidade da aba
        const handleVisibilityChange = () => {
            if (document.visibilityState === "visible") {
                setupRoutingControl(); // Recarregar o controle quando a aba for reativada
            }
        };

        // Adicionar o event listener quando o componente for montado
        document.addEventListener("visibilitychange", handleVisibilityChange);

        // Adicionar o controle de roteamento na montagem inicial
        setupRoutingControl();

        // Limpar o controle e remover o listener quando o componente for desmontado
        return () => {
            if (routingControl) {
                map?.removeControl(routingControl);
            }
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, [setupRoutingControl, routingControl, map]);

    return null;
};

export default RoutingControl;