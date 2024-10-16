import { UseFormSetValue } from "react-hook-form";
import { z } from "zod";

import { ProductSchema } from "@/schemas";

export const handlePriceChangeToBRL = (
    inputName: keyof z.infer<typeof ProductSchema>,
    setValue: UseFormSetValue<z.infer<typeof ProductSchema>>,
) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    // Remove todos os caracteres não numéricos
    const numericValue = inputValue.replace(/[^\d]/g, "");

    // Converte para número (dividido por 100 para considerar duas casas decimais)
    const valueAsNumber = Number(numericValue) / 100;

    // Formata para Real Brasileiro
    let formattedValue = valueAsNumber.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });

    // Se o valor estiver vazio, define como string vazia
    if (numericValue === "") {
        formattedValue = "";
    }

    // Atualiza o valor no campo de input
    event.target.value = formattedValue;

    // Atualiza o valor no formulário
    setValue(inputName, formattedValue);
};