"use client";

import { User } from "@prisma/client";
import { useState } from "react";

import { useDataSecurityFormSubmission } from "@/hooks/useDataSecurityFormSubmission";

import { EyeHiddenIcon, EyeIcon } from "./Icons";

export const DataSecurityForm: React.FC<{ userData: User }> = ({ userData }): JSX.Element => {
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    const {
        errors,
        handleSubmit,
        register,
        onSubmit,
        isPending,
        cleanMessages,
        success,
        setSuccess,
        error,
        isTwoFactorEnabled,
        setHasChanges,
    } = useDataSecurityFormSubmission({ userData: userData });

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            onChange={cleanMessages}
        >
            <div className="border border-slate-200 rounded-md mb-4">
                <div className="border bg-gray-100 px-4 py-3 ">
                    <label
                        htmlFor="isTwoFactorEnabled"
                        className="px-1 text-tremor-default font-semibold"
                    >
                        2FA - Autenticação de Dois Fatores
                    </label>
                </div>
                <div className="flex sm:flex-row flex-col items-start justify-between gap-[20px] p-4 text-gray-500">
                    <p
                        id="feature-1-description"
                        className="w-full sm:w-2/4 leading-6 text-tremor-content dark:text-dark-tremor-content"
                    >
                        {isTwoFactorEnabled ? (
                            "A autenticação de dois fatores está habilitada."
                        ) : (
                            "A autenticação de dois fatores está desabilitada."
                        )}
                    </p>
                    {/* <Switch
                        id="isTwoFactorEnabled"
                        name="isTwoFactorEnabled"
                        aria-hidden="true"
                        aria-describedby="feature-1-description"
                        checked={isTwoFactorEnabled}
                        onChange={(value) => {
                            setIsTwoFactorEnabled(value);
                            setValue("isTwoFactorEnabled", value);
                            handleFieldChange();
                        }}
                        className={`${isTwoFactorEnabled ? 'bg-blue-600' : 'bg-gray-200'}
                relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none`}
                    >
                        <span
                            className={`${isTwoFactorEnabled ? 'translate-x-6' : 'translate-x-1'}
                   inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                        />
                    </Switch> */}
                </div>
            </div>
            <section className="border border-slate-200 rounded-md">
                <div className="border bg-gray-100 px-4 py-3 ">
                    <label
                        htmlFor="isTwoFactorEnabled"
                        className="px-1 text-tremor-default font-semibold"
                    >
                        Redefinição de Senha
                    </label>
                </div>
                <div className="w-full flex flex-col space-y-1 items-start relative p-2">
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
                            {showPassword ? <EyeHiddenIcon w="24" h="24" /> : <EyeIcon w="24" h="24" />}
                        </button>
                    </div>
                    {errors.password && <span className="text-red-500">{errors.password.message}</span>}
                </div>
                <div className="w-full flex flex-col space-y-1 items-start relative p-2">
                    <label htmlFor="confirmPassword" className="font-semibold">Nova Senha</label>
                    <div className="w-full flex items-center relative">
                        <input
                            id="confirmPassword"
                            className="w-full rounded-md"
                            type={showNewPassword ? "text" : "password"}
                            placeholder={"******"}
                            {...register("confirmPassword")}
                            disabled={isPending}
                            autoComplete={"off"}
                        />
                        <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-3 top-2"
                        >
                            {showNewPassword ?  <EyeHiddenIcon w="24" h="24" /> : <EyeIcon w="24" h="24" />}
                        </button>
                    </div>
                    {errors.confirmPassword && <span className="text-red-500">{errors.confirmPassword.message}</span>}
                </div>

            </section>

            {error && (
                <p className="w-full bg-rose-50 text-rose-700">{error}</p>
            )}

            {success && (
                <div className="w-full flex flex-col space-y-4 items-start">
                    <p className="w-full bg-teal-50 text-teal-700 p-2 rounded-md">{success}</p>
                    <button
                        type="button"
                        disabled={isPending}
                        className="w-full rounded-md bg-blue-600 hover:bg-blue-700 transistion-all duration-300 text-white"
                        onClick={() => {
                            setSuccess("");
                            setHasChanges(true);
                        }}
                    >
                        OK
                    </button>
                </div>
            )}

            {!success && (
                <button
                    type="submit"
                    className={"mt-4 rounded-md transition-all duration-300 px-3 py-2 w-full text-white bg-blue-600 hover:bg-blue-700 cursor-pointer"}
                >
                    <span className="text-[16px] font-medium tracking-wide">
                        Atualizar
                    </span>
                </button>
            )}
        </form>
    );
};