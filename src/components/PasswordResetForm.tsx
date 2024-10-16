"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { WrapperForm } from "@/components/WrapperForm";
import { NewPasswordSchema } from "@/schemas";
import { handleResetPassword } from "@/services/create/passwordReset";

import { EyeHiddenIcon, EyeIcon } from "./Icons";

export const PasswordResetForm = () => {
      const [error, setError] = useState<string>("");
      const [success, setSuccess] = useState<string>("");
      const [showPassword, setShowPassword] = useState(false);

      const [isPending, startTransition] = useTransition();

      const searchParams = useSearchParams();

      const token = searchParams.get("token");

      const {
            register,
            handleSubmit,
            formState: { errors },
            clearErrors,
      } = useForm<z.infer<typeof NewPasswordSchema>>({
            resolver: zodResolver(NewPasswordSchema),
      });

      const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
            startTransition(() => {
                  handleResetPassword(values, token)
                        .then((data) => {
                              if (data.error) {
                                    setError(data.error);
                              }

                              if (data.success) {
                                    setSuccess(data.success);
                              }
                        });
            });
      };

      const cleanMessages = () => {
            clearErrors("password");
            setSuccess("");
            setError("");
      };

      return (
            <WrapperForm
                  titleForm={!success && !isPending ? ("Redefinição de Senha") : isPending ? ("Atualizando Senha...") : ("")}
                  descriptionForm={!isPending && !success ? ("Insira uma nova senha segura para atualizar sua senha.") : ""}
            >
                  <form
                        className={"w-full space-y-4"}
                        onSubmit={handleSubmit(onSubmit)}
                        onChange={cleanMessages}
                  >
                        {!success && (
                              <div className="w-full flex flex-col space-y-1 items-start relative">
                                    <label htmlFor="password" className="font-semibold">Senha</label>
                                    <div className="w-full flex items-center relative">
                                          <input
                                                id="password"
                                                className="w-full rounded-md"
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
                                    {errors.password && <span className="text-red-500">{errors.password.message}</span>}
                              </div>
                        )}

                        <div className={"flex flex-col space-y-4"} >
                              {error ? (
                                    <p className="w-full p-2 bg-rose-50 font-medium rounded-md text-rose-700">{error}</p>
                              ) : success ? (
                                    <p className="w-full p-2 bg-teal-50 font-medium rounded-md text-teal-700">{success}</p>
                              ) : (
                                    <button
                                          type={"submit"}
                                          disabled={isPending}
                                          className={"w-full bg-slate-800 hover:bg-slate-900 border-slate-950 hover:border-slate-900 px-3 py-2 text-white rounded-md"}
                                    >
                                          Atualizar Senha
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