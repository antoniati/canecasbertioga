import "leaflet/dist/leaflet.css";
import React, { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

export const OrderFormMap = () => {
    const [location, setLocation] = useState<[number, number] | null>(null);

    // Obter localização do cliente
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLocation([latitude, longitude]);
                },
                (error) => {
                    console.error("Erro ao obter localização:", error);
                },
            );
        } else {
            console.error("Geolocalização não é suportada pelo seu navegador.");
        }
    }, []);

    return (
        <div className="w-full h-screen">
            <h2 className="text-lg font-semibold mb-4">Selecione o Endereço de Entrega</h2>

            {/* Formulário para informações adicionais */}
            <form className="mb-8">
                <div className="hidden">
                    <label htmlFor="address" className="block font-medium mb-2">Endereço</label>
                    <input
                        type="text"
                        id="address"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Digite seu endereço completo"
                    />
                </div>
                <div className="hidden">
                    <label htmlFor="city" className="block font-medium mb-2">Cidade</label>
                    <input
                        type="text"
                        id="city"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Cidade"
                    />
                </div>
                <div className="hidden">
                    <label htmlFor="state" className="block font-medium mb-2">Estado</label>
                    <input
                        type="text"
                        id="state"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Estado"
                    />
                </div>
            </form>

            {/* Mapa */}
            {location ? (
                <MapContainer
                    center={location}
                    zoom={13}
                    scrollWheelZoom={false}
                    style={{ height: "400px", width: "100%" }}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={location}></Marker>
                </MapContainer>
            ) : (
                <p>Carregando mapa...</p>
            )}
        </div>
    );
};