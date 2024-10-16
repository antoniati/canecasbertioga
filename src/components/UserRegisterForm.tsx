"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import * as z from "zod";

import { UserRegisterSchema } from "@/schemas";
import "react-phone-input-2/lib/style.css";
import { registerUser } from "@/services/create/registerUser";

import { EyeHiddenIcon, EyeIcon } from "./Icons";
import { WrapperForm } from "./WrapperForm";

export const UserRegisterForm = () => {
      const [error, setError] = useState<string>("");
      const [success, setSuccess] = useState<string>("");
      const [isPending, startTransition] = useTransition();
      const [showPassword, setShowPassword] = useState(false);

      const {
            register,
            watch,
            setValue,
            handleSubmit,
            formState: { errors },
            clearErrors,
      } = useForm<z.infer<typeof UserRegisterSchema>>({ resolver: zodResolver(UserRegisterSchema) });

      const onSubmit = (values: z.infer<typeof UserRegisterSchema>) => {
            startTransition(() => {
                  registerUser(values)
                        .then((data) => {
                              if (data.error) {
                                    setError(data.error);
                              } else if (data.success) {
                                    setSuccess(data.success);
                              }
                        }).catch(() =>
                              setError("Erro interno do Servidor"),
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
                  titleForm={!success ? "Crie sua Conta Cliente na Canecas Bertioga" : "Email de Confirmação Enviado com Sucesso"}
                  descriptionForm={!success ? "Cadastre-se agora e tenha acesso a ofertas exclusivas!" : ""}
            >
                  <form
                        className={"w-full space-y-4 pb-4"}
                        onSubmit={handleSubmit(onSubmit)}
                        onChange={cleanMessages}
                  >
                        {!success && (
                              <div className={"w-full flex flex-col space-y-4 items-start"}>
                                    <div className="w-full flex flex-col space-y-1 items-start">
                                          <label htmlFor="customerName" className="font-semibold text-sm">Nome</label>
                                          <input
                                                id="customerName"
                                                className={`w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out ${isPending ? "bg-gray-100 cursor-not-allowed" : ""}`}
                                                type={"text"}
                                                placeholder={"Digite seu nome"}
                                                {...register("customerName")}
                                                disabled={isPending}
                                                autoComplete={"off"}
                                          />
                                          {errors.customerName && <span className="text-red-500 text-sm ml-1">{errors.customerName.message}</span>}
                                    </div>
                                    <div className="w-full flex flex-col space-y-1 items-start">
                                          <span className="font-semibold text-sm">Número para Contato</span>
                                          <PhoneInput
                                                country={"br"}
                                                value={watch("phone")}
                                                onChange={(phone) => setValue("phone", phone)}
                                                inputStyle={{ width: "100%", border: "solid", borderWidth: "1px", borderColor: "#6B7280" }}
                                          />
                                    </div>
                                    <div className="w-full flex flex-col space-y-1 items-start">
                                          <label htmlFor="email" className="font-semibold text-sm">Email</label>
                                          <input
                                                id="email"
                                                className={`w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out ${isPending ? "bg-gray-100 cursor-not-allowed" : ""}`}
                                                type={"email"}
                                                placeholder={"seuemail@exemplo.com"}
                                                {...register("email")}
                                                disabled={isPending}
                                                autoComplete={"off"}
                                          />
                                          {errors.email && <span className="text-red-500 text-sm ml-1">{errors.email.message}</span>}
                                    </div>
                                    <div className="w-full flex flex-col space-y-1 items-start relative">
                                          <label htmlFor="password" className="font-semibold text-sm">Senha</label>
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
                                                      className="absolute right-3 top-2"
                                                >
                                                      {showPassword ? <EyeHiddenIcon w="20" h="20" /> : <EyeIcon w="20" h="20" />}
                                                </button>
                                          </div>
                                          {errors.password && <span className="text-red-500 text-sm ml-1">{errors.password.message}</span>}
                                    </div>
                              </div>
                        )}

                        <div className={"flex flex-col"} >
                              {error ? (
                                    <p className="w-full p-2 bg-rose-50 font-medium rounded-md text-rose-500">{error}</p>
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
                                    <div className={"flex flex-col space-y-4"}>
                                          <button
                                                type={"submit"}
                                                className={"w-full bg-gradient-to-r from-gray-800 to-gray-900 text-white px-3 py-2 rounded-full hover:shadow-lg transition-transform transform hover:scale-105 duration-300"}
                                          >
                                                Cadastrar
                                          </button>
                                          <h3 className={"text-sm text-gray-500"}>
                                                Ao se cadastrar você concorda com nossos <Link href={"/"} className="text-blue-500 hover:text-blue-600">Termos e Condições</Link>,
                                                <Link href={"/"} className="text-blue-500 hover:text-blue-600">Políticas de Privacidade</Link> e <Link href={"/"} className="text-blue-500 hover:text-blue-600">Política de Cookies</Link>.
                                          </h3>
                                    </div>
                              )}
                        </div>
                  </form>

                  <div className="text-center flex flex-col sm:flex-row p-4 border-t border-slate-200 w-full justify-center gap-2">
                        <p> Já tem uma conta ?&nbsp;</p>
                        <Link href={"/auth/login"} className='text-tremor-default text-blue-600 underline'>
                              Faça o Login
                        </Link>
                  </div>
            </WrapperForm>
      );
};
