import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

/**
 * Recebe a fila de compra e o preço final para gerar o PDF
 *
 * @param {array} table
 * @param {string} totalPrice
 */
export default function generatePdf(table, totalPrice) {
  /**
   * Pega a data atual e a data de validade
   */
  let date = new Date();
  let day = date.getDay();
  let month = date.getMonth();
  let expirationMonth = date.getMonth() + 1;
  let year = date.getFullYear();

  /**
   * Faz a formatação da data
   */
  if (day < 10) day = "0" + day;
  if (month < 10) month = "0" + month;
  if (expirationMonth < 10) expirationMonth = "0" + expirationMonth;

  /**
   * Define a estrutura e estilização do PDF
   */
  const docDefinitios = {
    content: [
      { text: "Orçamento", style: "header" },

      `Data da simulação: ${day}/${month}/${year}`,
      `Validade da simulação: ${day}/${expirationMonth}/${year}`,
      `Valor total: R$ ${totalPrice}`,

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
