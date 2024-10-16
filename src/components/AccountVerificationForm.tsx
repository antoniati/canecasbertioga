"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState, useTransition } from "react";

import { newVerification } from "@/services/create/accountVerification";

import { WrapperForm } from "./WrapperForm";

export const AccountVerificationForm = () => {
      const [error, setError] = useState<string | undefined>();
      const [success, setSuccess] = useState<string | undefined>();

      const searchParams = useSearchParams();

      const token = searchParams.get("token");

      const [isPending, startTransition] = useTransition();

      const onSubmit = useCallback(() => {
            if (success || error) return;

            if (!token) {
                  setError("Token inválido ou inexistente");
                  return;
            }

            startTransition(() => {
                  newVerification(token)
                        .then((data) => {
                              setSuccess(data.success);
                              setError(data.error);
                        })
                        .catch(() => {
                              setError("Erro interno do Servidor");
                        });
            });
      }, [token, success, error]);

      useEffect(() => {
            onSubmit();
      }, [onSubmit]);

      return (
            <WrapperForm
                  titleForm={success || error ? "" : "Confirming Email..."}
                  descriptionForm=""
            >
                  <div>
                        {success || error ? (
                              <div className="flex flex-col space-y-4">
                                    <p className="p-4 bg-teal-50 text-teal-700 rounded-md">
                                          Sua conta foi confirmada com sucesso! Agora você pode fazer login na sua conta e aproveitar uma experiência de compra aprimorada.
                                    </p>
                                    <Link
                                          href={"/auth/login"}
                                          className="bg-blue-600 hover:bg-blue-700 w-full rounded-md px-3 py-2 text-white"
                                    >
                                          Fazer o Login
                                    </Link>
                              </div>
                        ) : isPending && (
                              <p className="p-4 bg-gray-50 text-gray-700 rounded-md">
                                    Estamos confirmando sua conta. Por favor, aguarde...
                              </p>
                        )}
                  </div>
            </WrapperForm>
      );
};