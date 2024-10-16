"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { ResetSchema } from "@/schemas";
import { handleRequestNewPassword } from "@/services/create/requestNewPassword";

import { WrapperForm } from "./WrapperForm";

export const FormToRequestNewPassword = () => {
      const [error, setError] = useState<string>("");
      const [success, setSuccess] = useState<string>("");

      const [isPending, startTransition] = useTransition();

      const {
            register,
            getValues,
            handleSubmit,
            formState: { errors },
            clearErrors,
      } = useForm<z.infer<typeof ResetSchema>>({
            resolver: zodResolver(ResetSchema),
            defaultValues: { email: "" },
      });

      const onSubmit = (values: z.infer<typeof ResetSchema>) => {
            startTransition(() => {
                  handleRequestNewPassword(values)
                        .then((data) => {
                              if (data.error) {
                                    setError(data?.error);
                              }

                              if (data.success) {
                                    setSuccess(data?.success);
                              }
                        });
            });
      };

      const cleanMessages = () => {
            clearErrors();
            setSuccess("");
            setError("");
      };

      return (
            <WrapperForm
                  titleForm={isPending ? ("Enviando Email...") : !success ? ("Esqueceu sua senha? Não se preocupe.") : ("")}
                  descriptionForm={!isPending && !success ? ("Insira seu e-mail e clique no botão `Enviar Email` para receber instruções de redefinição de senha") : ("")}
            >
                  <form
                        className={"w-full space-y-4"}
                        onSubmit={handleSubmit(onSubmit)}
                        onChange={cleanMessages}
                  >
                        <div className="flex flex-col space-y-1 items-start">
                              <label htmlFor="email" className="font-semibold">Email</label>
                              <input
                                    id="email"
                                    className={`w-full px-4 py-2 pl-12 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out ${isPending ? "bg-gray-100 cursor-not-allowed" : ""}`}
                                    type={"email"}
                                    placeholder={"seuemail@exemplo.com"}
                                    {...register("email")}
                                    disabled={isPending}
                                    autoComplete={"off"}
                              />
                              {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                        </div>

                        <div className={"flex flex-col"} >
                              {error ? (
                                    <p className="w-full p-2 bg-rose-50 font-semibold rounded-md text-rose-700">{error}</p>
                              ) : success ? (
                                    <div className="flex flex-col space-y-4">
                                    <p className="w-full p-2 bg-teal-50 font-medium rounded-md text-teal-700">{success}</p>
                                    <Link
                                          href={"https://mail.google.com/mail/u/0/#inbox"}
                                          className={"w-full bg-slate-800 hover:bg-slate-800 border-slate-950 hover:border-slate-900 text-white px-3 py-2 rounded-md"}
                                    >
                                          Ir Para o Gmail
                                    </Link>
                              </div>
                              ) : (
                                    <button
                                          type={"submit"}
                                          disabled={isPending || getValues("email") === ""}
                                          className={"w-full bg-slate-800 hover:bg-slate-900 border-slate-950 hover:border-slate-900 px-3 py-2 text-white rounded-md cursor-pointer"}
                                    >
                                          Enviar Email
                                    </button>
                              )}
                        </div>
                  </form>

                  {!isPending && (
                        <Link href={"/auth/login"} className="text-tremor-default text-blue-600 p-4 underline">
                              Voltar ao Login
                        </Link>
                  )}
            </WrapperForm>
      );
};