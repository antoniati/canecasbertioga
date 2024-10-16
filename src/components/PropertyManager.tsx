import { TrashIcon } from "./Icons";

export type PropsOfProperties = {
    name: string;
    value: string[];
};

type PropertyManagerProps = {
    title: string;
    properties: PropsOfProperties[];
    setProperties: (updatedProperties: PropsOfProperties[]) => void;
};

export const PropertyManager: React.FC<PropertyManagerProps> = ({ title, properties, setProperties }) => {
    const addProperty = () => {
        // Cria um novo array com a nova propriedade
        const updatedProperties = [...properties, { name: "", value: [] }];
        // Atualiza o estado diretamente com o array
        setProperties(updatedProperties);
    };

    const removeProperty = (index: number) => {
        // Remove a propriedade no índice específico
        const updatedProperties = properties.filter((_, i) => i !== index);
        setProperties(updatedProperties);
    };

    const handlePropertyNameChange = (index: number, newName: string) => {
        // Atualiza o nome da propriedade no índice específico
        const updatedProperties = [...properties];
        updatedProperties[index].name = newName;
        setProperties(updatedProperties);
    };

    const handlePropertyValueChange = (index: number, newValues: string) => {
        // Usar o ponto e vírgula ';' como separador de valores
        const valuesArray = newValues ? newValues.split(";").map((value) => value.trim()) : [];

        // Atualiza os valores da propriedade no índice específico
        const updatedProperties = [...properties];
        updatedProperties[index].value = valuesArray;
        setProperties(updatedProperties);
    };

    return (
        <div className="space-y-1 border border-slate-400 rounded-md">
            <h3 className="text-sm font-bold text-slate-800 ml-1 bg-gray-50 p-2 rounded-md">
                {title}
            </h3>
            {properties.length > 0 &&
                properties.map((property, index) => (
                    <div key={index} className="flex items-center justify-start space-x-2 p-2">
                        <div className="w-full flex sm:flex-row flex-col items-start justify-start" style={{ gap: "5px" }}>
                            <input
                                className="w-2/4 rounded-md p-2 border border-gray-300 outline-none"
                                type="text"
                                value={property.name}
                                onChange={(e) => handlePropertyNameChange(index, e.target.value)}
                                placeholder="Nome"
                            />
                            <input
                                className="w-2/4 rounded-md p-2 border border-gray-300 outline-none"
                                type="text"
                                value={property.value.join(", ")}
                                onChange={(e) => handlePropertyValueChange(index, e.target.value)}
                                placeholder="Valores separados por vírgula"
                            />
                        </div>
                        <button
                            type="button"
                            className={"border p-2 rounded-md text-gray-700 hover:bg-slate-100 border-gray-500"}
                            onClick={() => removeProperty(index)}
                        >
                            <TrashIcon w="20" h="20" />
                        </button>
                    </div>
                ))}
            <button
                type="button"
                className="p-2"
                onClick={addProperty}
            >
                + Adicionar {title}
            </button>
        </div>
    );
};