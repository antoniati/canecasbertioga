"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import * as z from "zod";
import "react-phone-input-2/lib/style.css";

import { useUserData } from "@/hooks/useUserData";
import { OrderSchema } from "@/schemas";
import { registerOrder } from "@/services/create/registerOrder";

import { GeoIcon } from "./Icons";

interface OrderFormProps {
      cartProducts: string[];
      clearCart: () => void;
}

const formatZipCode = (value: string) => {
      const cleaned = value.replace(/\D/g, "");
      if (cleaned.length > 5) {
            return `${cleaned.slice(0, 5)}-${cleaned.slice(5, 8)}`;
      }
      return cleaned;
};

const fetchAddressFromZip = async (zip: string) => {
      try {
            const response = await fetch(`https://viacep.com.br/ws/${zip}/json/`);
            const data = await response.json();
            if (data.erro) throw new Error("CEP não encontrado");
            return data;
      } catch (error) {
            console.error("Erro ao buscar o endereço:", error);
            return null;
      }
};

export const OrderForm = ({ cartProducts, clearCart }: OrderFormProps) => {
      const [error, setError] = useState<string>("");
      const [isPending, setIsPending] = useState<boolean>(false);
      const [transitioning, startTransition] = useTransition();
      const { user } = useUserData();


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
      }, [location]);

      const {
            watch,
            setValue,
            handleSubmit,
            formState: { errors },
            clearErrors,
      } = useForm<z.infer<typeof OrderSchema>>({
            resolver: zodResolver(OrderSchema),
            defaultValues: { cartProducts: [] },
      });

      useEffect(() => {
            if (user) {
                  setValue("customerName", user.customerName ?? "Cliente Novo");
                  setValue("email", user.email ?? "email@clientenovo.com");
                  setValue("phone", user.phone ?? "0000000");
            }
      }, [user, setValue]);

      const onSubmit = (values: z.infer<typeof OrderSchema>) => {
            setIsPending(true);
            const dataToSend = {
                  ...values,
                  cartProducts,
            };

            startTransition(() => {
                  registerOrder(dataToSend)
                        .then((data) => {
                              if (data?.error) setError(data.error);
                              else if (data.url) {
                                    window.location = data.url;
                                    clearCart();
                              }
                        })
                        .catch(() => setError("Erro ao enviar o formulário."))
                        .finally(() => setIsPending(false));
            });
      };

      const cleanMessages = () => {
            clearErrors();
            setError("");
      };

      const onZipChange = async (zip: string) => {
            const formattedZip = formatZipCode(zip);
            setValue("zip", formattedZip);
            if (formattedZip.length === 9) {
                  const addressData = await fetchAddressFromZip(zip.replace(/\D/g, ""));
                  if (addressData) {
                        setValue("street", addressData.logradouro || "");
                        setValue("city", addressData.localidade || "");
                        setValue("state", addressData.uf || "");

                        if (addressData.localidade.toLowerCase() !== "bertioga" || addressData.uf !== "SP") {
                              setError("Entregas disponíveis apenas para Bertioga, SP.");
                        } else {
                              setError("");
                        }
                  } else {
                        setError("CEP inválido ou não encontrado.");
                  }
            }
      };

      // Função para pegar a localização do cliente
      const handleUseCurrentLocation = () => {
            if (!navigator.geolocation) {
                  setError("Geolocalização não é suportada pelo seu navegador.");
                  return;
            }

            navigator.geolocation.getCurrentPosition(
                  (position) => {
                        const { latitude, longitude } = position.coords;

                        if (latitude && longitude) {
                              // Realize a busca de endereço a partir das coordenadas
                              fetchAddressFromCoordinates(latitude, longitude);
                        } else {
                              setError("Não foi possível obter sua localização.");
                        }
                  },
                  (err) => {
                        if (err.code === err.PERMISSION_DENIED) {
                              setError("Permissão de localização negada.");
                        } else {
                              setError("Não foi possível encontrar seu endereço.");
                        }
                  },
            );
      };

      // Função para buscar o endereço com base na latitude e longitude
      const fetchAddressFromCoordinates = async (latitude: number, longitude: number) => {
            try {
                  const response = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
                  );
                  const data = await response.json();

                  if (data && data.address) {
                        // Aqui você preenche os campos do formulário com os dados retornados
                        setValue("street", data.address.road || "");
                        setValue("city", data.address.city || "Bertioga");
                        setValue("state", data.address.state || "");
                        setValue("zip", data.address.postcode || "");

                        setError(""); // Limpa qualquer mensagem de erro
                  } else {
                        setError("Não foi possível encontrar seu endereço.");
                  }
            } catch (error) {
                  setError("Erro ao buscar o endereço a partir da sua localização.");
                  console.error(error);
            }
      };

      return (
            <section className="w-full p-6 lg:p-8 rounded-lg shadow-lg bg-white">
                  <header className=" border-b pb-2 mb-4 flex flex-col sm:flex-row justify-between gap-4">
                        <h1 className="font-semibold text-lg">Escolha o Local da Entrega</h1>

                        <button
                              type="button"
                              onClick={handleUseCurrentLocation}
                              className="w-auto flex items-center gap-2 text-blue-600 hover:text-blue-700 py-2"
                        >
                              <GeoIcon w="24" h="24" />
                              <span>Usar Localização Atual</span>
                        </button>
                  </header>
                  <form
                        className="space-y-4"
                        onSubmit={handleSubmit(onSubmit)}
                        onChange={cleanMessages}
                  >
                        {/* CEP */}
                        <label htmlFor="zip" className="block text-sm font-semibold text-gray-700">CEP</label>
                        <div className="relative flex-1">
                              <input
                                    id="zip"
                                    className={`w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out ${isPending ? "bg-gray-100 cursor-not-allowed" : ""}`}
                                    type="text"
                                    value={watch("zip")}
                                    onChange={(e) => onZipChange(e.target.value)}
                                    disabled={isPending}
                                    maxLength={9}
                                    placeholder="12345-678"
                              />
                        </div>
                        {/* Cidade */}
                        <div className="hidden">
                              <label htmlFor="city" className="block text-sm font-semibold text-gray-700">Cidade</label>
                              <input
                                    id="city"
                                    className={`w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out ${isPending ? "bg-gray-100 cursor-not-allowed" : ""}`}
                                    type="text"
                                    value={watch("city")}
                                    onChange={(e) => setValue("city", e.target.value)}
                                    disabled={isPending}
                              />
                        </div>
                        {/* Estado */}
                        <div className="hidden">
                              <label htmlFor="state" className="block text-sm font-semibold text-gray-700">Estado</label>
                              <input
                                    id="state"
                                    className={`w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out ${isPending ? "bg-gray-100 cursor-not-allowed" : ""}`}
                                    type="text"
                                    value={watch("state")}
                                    onChange={(e) => setValue("state", e.target.value)}
                                    disabled={isPending}
                                    maxLength={2}
                              />
                        </div>
                        {/* Rua */}
                        <div className="w-full flex gap-2 items-center">
                              <div className="w-full">
                                    <label htmlFor="street" className="block text-sm font-semibold text-gray-700">Rua</label>
                                    <input
                                          id="street"
                                          className={`w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out ${isPending ? "bg-gray-100 cursor-not-allowed" : ""}`}
                                          type="text"
                                          value={watch("street")}
                                          onChange={(e) => setValue("street", e.target.value)}
                                          disabled={isPending}
                                    />
                              </div>
                              <div className="w-2/5">
                                    <label htmlFor="streetNumber" className="block text-sm font-semibold text-gray-700">Complemento</label>
                                    <input
                                          id="streetNumber"
                                          className={`w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out ${isPending ? "bg-gray-100 cursor-not-allowed" : ""}`}
                                          type="text"
                                          value={watch("streetNumber")}
                                          onChange={(e) => setValue("streetNumber", e.target.value)}
                                          disabled={isPending}
                                    />
                              </div>
                        </div>

                        {/* Telefone */}
                        <div className="">
                              <label className="block text-sm font-semibold text-gray-700">Telefone</label>
                              <div className={`w-full py-1 border border-gray-300 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-blue-500 transition duration-300 ease-in-out ${isPending ? "bg-gray-100 cursor-not-allowed" : ""}`}>
                                    <PhoneInput
                                          country={"br"}
                                          value={watch("phone")}
                                          onChange={(phone) => setValue("phone", phone)}
                                          inputStyle={{
                                                width: "100%",
                                                border: "none",
                                                boxShadow: "none", // remove qualquer sombra padrão
                                          }}
                                          disabled={isPending}
                                    />
                              </div>
                              {errors.phone && <p className="text-red-600 text-sm">{errors.phone.message}</p>}
                        </div>
                        {/* Nome */}
                        <div className="hidden">
                              <label htmlFor="customerName" className="block text-sm font-semibold text-gray-700">Nome</label>
                              <input
                                    id="customerName"
                                    className="block mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    type="text"
                                    value={watch("customerName")}
                                    onChange={(e) => setValue("customerName", e.target.value)}
                                    disabled={isPending}
                              />
                        </div>
                        {/* Email */}
                        <div className="hidden">
                              <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Seu Email</label>
                              <input
                                    id="email"
                                    className="block mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    type="email"
                                    value={watch("email")}
                                    onChange={(e) => setValue("email", e.target.value)}
                                    disabled={isPending}
                              />
                        </div>            

                        {/* Mensagem de erro */}
                        {error && (
                              <p className="text-red-600 text-sm mt-2">{error}</p>
                        )}

                        {/* Botão de submissão */}
                        <div className="border-t pt-4 w-full flex justify-end">
                              <button
                                    type="submit"
                                    className="w-full sm:w-auto text-center px-14 bg-[#0074d4] text-white font-semibold py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                                    disabled={isPending || transitioning}
                              >
                                    Finalizar Compra
                              </button>
                        </div>
                  </form>
            </section>
      );
};
