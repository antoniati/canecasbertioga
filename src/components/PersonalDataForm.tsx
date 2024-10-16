"use client";

import { User } from "@prisma/client";
import PhoneInput from "react-phone-input-2";

import { usePersonalDataFormSubmission } from "@/hooks/usePersonalDataFormSubmission";

export const PersonalDataForm: React.FC<{ userData: User }> = ({ userData }): JSX.Element => {
    const {
        errors,
        handleSubmit,
        register,
        setValue,
        watch,
        onSubmit,
        isPending,
        cleanMessages,
        success,
        setSuccess,
        error,
    } = usePersonalDataFormSubmission({ userData: userData });

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            onChange={cleanMessages}
        >
            <div className="flex flex-col items-start space-y-4">
                <div className="w-full flex flex-col space-y-1 items-start">
                    <label htmlFor="customerName" className="font-semibold">Nome</label>
                    <input
                        id="customerName"
                        className="w-full rounded-md"
                        type={"text"}
                        placeholder={"Digite seu nome"}
                        {...register("customerName")}
                        disabled={isPending}
                        autoComplete={"off"}
                    />
                    {errors.customerName && <span className="text-red-500">{errors.customerName.message}</span>}
                </div>
                <div className="w-full flex flex-col space-y-1 items-start">
                    <span className="font-semibold">Número para Contato</span>
                    <PhoneInput
                        country={"br"}
                        value={watch("phone")}
                        onChange={(phone) => setValue("phone", phone)}
                        inputStyle={{ width: "100%", border: "solid", borderWidth: "1px", borderColor: "#6B7280" }}
                    />
                </div>
                <div className="w-full flex flex-col space-y-1 items-start">
                    <label htmlFor="email" className="font-semibold">Email</label>
                    <input
                        id="email"
                        className="w-full rounded-md"
                        type={"email"}
                        placeholder={"seuemail@exemplo.com"}
                        {...register("email")}
                        disabled={isPending}
                        autoComplete={"off"}
                    />
                    {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                </div>
            </div>

            {error && (
                <p className="p-2 bg-rose-50 text-rose-700">{error}</p>
            )}

            {success && (
                <div className="w-full flex flex-col space-y-4 items-start mt-4">
                    <p className="w-full bg-teal-50 text-teal-700 p-2 rounded-md font-semibold">{success}</p>
                    <button
                        type="button"
                        disabled={isPending}
                        className="w-full bg-blue-600 hover:bg-blue-700  rounded-md transistion-all duration-300 text-white px-3 py-2"
                        onClick={() => setSuccess("")}
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
        </form >
    );
};