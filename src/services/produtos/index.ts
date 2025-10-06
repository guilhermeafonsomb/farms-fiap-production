import { type Models } from "appwrite";

import { tablesDB } from "../../lib/appwrite";

const DATABASE_ID = "68d021ad002fe84e49fb";
const COLLECTION_ID_ESTOQUE = "estoque";

export type Produto = Models.Row & {
  rowId: string;
  nome: string;
  quantidade: number;
  categoria: string;
  status: "aguardando" | "produção" | "colhido";
};

export type ProdutoSale = Models.Row & {
  rowId: string;
  nome: string;
  quantidade: number;
  categoria: string;
  lucro: number;
  vendas: number;
};

export type ProdutoByPeriod = Models.Row & {
  nome: string;
  lucro: number;
  vendas: number;
  periodo: "Semanal" | "Mensal" | "Anual";
};

export async function fetchProducts() {
  try {
    const response = await tablesDB.listRows<Produto>({
      databaseId: DATABASE_ID,
      tableId: COLLECTION_ID_ESTOQUE,
    });

    return response.rows.map((doc) => ({
      id: doc.$id,
      name: doc.nome,
      quantity: doc.quantidade,
      type: doc.categoria,
      status: doc.status,
    }));
  } catch (error) {
    console.error("Erro ao buscar produtos do estoque:", error);
    throw error;
  }
}
