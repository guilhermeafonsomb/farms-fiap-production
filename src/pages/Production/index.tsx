import { Apple, Carrot, Leaf } from "lucide-react";
import { useState } from "react";
import { useProducts } from "../../hooks/useProducts";

export const Production = () => {
  const [tab, setTab] = useState<"aguardando" | "produção" | "colhido">(
    "produção"
  );

  const { data: products, isPending } = useProducts();

  const filteredProducts = products?.filter(
    (product) => product.status === tab
  );

  const iconMap = {
    Verdura: <Leaf size={20} color="#121C0D" />,
    Legume: <Carrot size={20} color="#121C0D" />,
    Fruta: <Apple size={20} color="#121C0D" />,
    Outro: <Leaf size={20} color="#121C0D" />,
  };

  return (
    <section>
      {isPending && <p>Carregando...</p>}
      <div className="max-w-5xl mx-auto w-full">
        <p className="text-black text-2xl font-bold mb-6">
          Produção de Alimentos
        </p>

        <div className="flex-row mb-3 border-b border-gray-200 h-14">
          <button
            className={`mr-6 pb-2 border-b-[3px] ${
              tab === "produção" ? " border-black" : "border-gray-200"
            }`}
            onClick={() => setTab("produção")}
          >
            <p
              className={`font-bold my-auto ${
                tab === "produção" ? "text-black" : "text-primary-500"
              }`}
            >
              Em Produção
            </p>
          </button>

          <button
            className={`mr-6 pb-2 border-b-[3px] ${
              tab === "aguardando" ? " border-black" : "border-gray-200"
            }`}
            onClick={() => setTab("aguardando")}
          >
            <p
              className={`font-bold my-auto ${
                tab === "aguardando" ? "text-black" : "text-primary-500"
              }`}
            >
              Aguardando
            </p>
          </button>

          <button
            className={`pb-2 border-b-[3px] ${
              tab === "colhido" ? " border-black" : "border-gray-200"
            }`}
            onClick={() => setTab("colhido")}
          >
            <p
              className={`font-bold my-auto ${
                tab === "colhido" ? "text-black" : "text-primary-500"
              }`}
            >
              Já Colhido
            </p>
          </button>
        </div>

        {filteredProducts?.map((product) => (
          <div className="flex-row items-center rounded-lg py-3 px-4 mb-3">
            <div className="bg-primary-100 p-3 rounded-lg mr-3">
              {iconMap?.[product.type as keyof typeof iconMap] ||
                iconMap["Outro"]}
            </div>
            <div>
              <div className="font-medium text-base text-black">
                {product.name}
              </div>
              <div className="text-primary-500 text-sm">
                {product.quantity} itens
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
