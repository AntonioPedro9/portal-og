import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

import getTodaysDate from "../utils/getTodaysDate";
import getExpirationDate from "../utils/getExpirationDate";
import formatCurrency from "../utils/formatCurrency";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

/**
 * Recebe a fila de compra e o preço final CAPEX e OPEX para gerar o PDF
 *
 * @param {array} table
 * @param {number} totalCapex
 * @param {number} totalOpex
 */
export default function generatePdf(table, totalCapex, totalOpex) {
  const docDefinitios = {
    content: [
      { text: "Orçamento", style: "header" },

      `Data da Simulação: ${getTodaysDate()}`,
      `Validade da Simulação: ${getExpirationDate()}`,
      `Valor CAPEX: ${formatCurrency(totalCapex)}`,
      `Valor OPEX: ${formatCurrency(totalOpex)}`,
      `Valor Total: ${formatCurrency(totalCapex + totalOpex)}`,

      {
        style: "table",
        table: {
          body: table,
        },
      },
    ],

    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10],
      },
      table: {
        margin: [0, 5, 0, 15],
      },
    },
  };

  pdfMake.createPdf(docDefinitios).download("Orçamento.pdf");
}
