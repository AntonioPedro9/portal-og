const XLSX = require("xlsx");

module.exports = {
  /**
   * /getPrices/vm:
   *   get:
   *     description: Pega os valores da planilha para fazer orçamento de uma VM
   *     responses:
   *       '200':
   *         description: Valores foram obtidos com sucesso
   *       '400':
   *         description: Falha na obtenção dos valores
   */
  async vm(request, response) {
    try {
      const workbook = XLSX.readFile("prices.xlsx");
      const worksheet = workbook.Sheets["Calculo Vmware HCI"];

      const vmPrices = {
        memory_capex: worksheet["E19"]["v"] / 2,
        cpu_capex: worksheet["E20"]["v"] / 2,
        storage_capex: worksheet["B15"]["v"] * 2,
        memory_opex: worksheet["E23"]["v"] / 2,
        cpu_opex: worksheet["E24"]["v"] / 2,
      };

      return response.status(200).json(vmPrices);
    } catch (error) {
      return response.status(400);
    }
  },

  /**
   * /getPrices/container:
   *   get:
   *     description: Pega os valores da planilha para fazer orçamento de um container
   *     responses:
   *       '200':
   *         description: Valores foram obtidos com sucesso
   *       '400':
   *         description: Falha na obtenção dos valores
   */
  async container(request, response) {
    try {
      const workbook = XLSX.readFile("prices.xlsx");
      const worksheet = workbook.Sheets["Calculo Container"];

      const containerPrices = {
        memory_capex: worksheet["E17"]["v"] / 2,
        cpu_capex: worksheet["E18"]["v"] / 2,
        storage_capex: worksheet["B13"]["v"] * 2,
        memory_opex: worksheet["E21"]["v"] / 2,
        cpu_opex: worksheet["E22"]["v"] / 2,
      };

      return response.status(200).json(containerPrices);
    } catch (error) {
      return response.status(400);
    }
  },
};
