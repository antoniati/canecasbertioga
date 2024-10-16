"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { LoginSchema } from "@/schemas";
import { loginSession } from "@/services/create/loginSession";

import { EyeHiddenIcon, EyeIcon } from "./Icons";
import { WrapperForm } from "./WrapperForm";

export const UserLoginForm = () => {
      const [error, setError] = useState<string>("");
      const [success, setSuccess] = useState<string>("");
      const [showTwoFactor, setShowTwoFactor] = useState(false);
      const [showPassword, setShowPassword] = useState(false);

      const [isPending, startTransition] = useTransition();

      const searchParams = useSearchParams();
      const callbackUrl = searchParams.get("callbackUrl");

      const {
            register,
            handleSubmit,
            formState: { errors },
            clearErrors,
      } = useForm<z.infer<typeof LoginSchema>>({
            resolver: zodResolver(LoginSchema),
            defaultValues: { email: "", password: "" },
      });

      const onSubmit = (values: z.infer<typeof LoginSchema>) => {
            startTransition(() => {
                  loginSession(values, callbackUrl)
                        .then((data) => {
                              if (data?.error) {
                                    setError(data.error);
                              }

                              if (data?.success) {
                                    setSuccess(data.success);
                              }

                              if (data?.twoFactor) {
                                    setShowTwoFactor(true);
                              }
                        })
                        .catch(() =>
                              setError("Error interno do servidor"),
                        );
            });
      };

      const cleanMessages = () => {
            clearErrors();
            setSuccess("");
            setError("");
      };

      return (
            <WrapperForm
                  titleForm={showTwoFactor ? "Autenticação de dois fatores" : "Bem-vindo de volta"}
                  descriptionForm={showTwoFactor ? "Por favor, insira o código de autenticação que enviamos para seu e-mail" : "Faça o Login com seu email e senha"}
            >
                  <form
                        className={"w-full space-y-4"}
                        onSubmit={handleSubmit(onSubmit)}
                        onChange={cleanMessages}
                  >
                        {showTwoFactor && (
                              <div className="flex flex-col space-y-1 items-start mt-4">
                                    <label htmlFor="code" className="font-semibold">Código de Dois Fatores</label>
                                    <input
                                          id="code"
                                          className={`w-full px-4 py-2 pl-12 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out ${isPending ? "bg-gray-100 cursor-not-allowed" : ""}`}
                                          type={"text"}
                                          placeholder={"123456"}
                                          {...register("code")}
                                          disabled={isPending}
                                          autoComplete={"off"}
                                    />
                                    {errors.code && <span className="text-red-500">{errors.code.message}</span>}
                              </div>
                        )}

                        {!showTwoFactor && (
                              <div className="w-full flex flex-col mt-4 space-y-2">
                                    <div className="w-full flex flex-col space-y-1 items-start">
                                          <label htmlFor="email" className="font-semibold">Email</label>
                                          <input
                                                id="email"
                                                className={`w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out ${isPending ? "bg-gray-100 cursor-not-allowed" : ""}`}
                                                type={"email"}
                                                placeholder={"seuemail@exemplo.com"}
                                                {...register("email")}
                                                disabled={isPending}
                                                autoComplete={"off"}
                                          />
                                          {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                                    </div>

                                    <div className="w-full flex flex-col space-y-1 items-start relative">
                                          <label htmlFor="password" className="font-semibold">Senha</label>
                                          <div className="w-full flex items-center relative">
                                                <input
                                                      id="password"
                                                      className={`w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out ${isPending ? "bg-gray-100 cursor-not-allowed" : ""}`}
                                                      type={showPassword ? "text" : "password"}
                                                      placeholder={"******"}
                                                      {...register("password")}
                                                      disabled={isPending}
                                                      autoComplete={"off"}
                                                />
                                                <button
                                                      type="button"
                                                      onClick={() => setShowPassword(!showPassword)}
                                                      className="absolute right-3 top-2 text-gray-500"
                                                >
                                                      {showPassword ? <EyeHiddenIcon w="24" h="24" /> : <EyeIcon w="24" h="24" />}
                                                </button>
                                          </div>
                                          {errors.password && <span className="text-red-500">{errors.password.message}</span>}
                                    </div>

                                    {!isPending && (
                                          <Link
                                                href={"/auth/reset"}
                                                className={"text-start text-blue-600 pb-2"}
                                          >
                                                <span className={"text-sm"}>
                                                      Esqueceu a Senha?
                                                </span>
                                          </Link>
                                    )}
                              </div>
                        )}

                        <div className={"flex flex-col"} >
                              {error ? (
                                    <p className="w-full p-2 bg-rose-50 font-medium rounded-md text-rose-500">{error}</p>
                              ) : success ? (
                                    <p className="w-full p-2 bg-emerald-200 font-medium rounded-md text-green-500">{success}</p>
                              ) : (
                                    <button
                                          className={
                                                clsx(

                                                      showTwoFactor
                                                            ? "w-full bg-slate-800 hover:bg-slate-900 border-slate-950 hover:border-slate-900"
                                                            : "w-full bg-gradient-to-r from-blue-500 to-blue-700 py-2 px-3 text-white rounded-full hover:shadow-lg transition-transform transform hover:scale-105 duration-300",
                                                      isPending ? "bg-gray-100 cursor-not-allowed" : "",
                                                )
                                          }
                                          type={"submit"}
                                          disabled={isPending}
                                    >
                                          {!showTwoFactor ? "Entrar" : "Confirmar"}
                                    </button>
                              )}
                        </div>
                  </form>

                  <div className="text-center flex flex-col sm:flex-row p-4" style={{ gap: "5px" }}>
                        <h3>Não tem uma Conta?</h3>
                        <Link href={"/auth/register"} className='text-tremor-default text-blue-600 underline'>
                              Junte-se a Nós
                        </Link>
                  </div>
            </WrapperForm>
      );
};