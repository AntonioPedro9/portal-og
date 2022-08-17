import { React, useState, useEffect } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";

import api from "../services/api";
import generatePdf from "../services/generatePdf";
import formatCurrency from "../utils/formatCurrency";

export default function Container() {
  // Configurações da máquina
  const [memoryAmount, setMemoryAmount] = useState("");
  const [cpuAmount, setCpuAmount] = useState("");
  const [storageAmount, setStorageAmount] = useState("");
  const [machineAmount, setMachineAmount] = useState(1);

  // Preço das configurações da máquina
  const [memoryCapex, setMemoryCapex] = useState(0);
  const [cpuCapex, setCpuCapex] = useState(0);
  const [storageCapex, setStorageCapex] = useState(0);
  const [memoryOpex, setMemoryOpex] = useState(0);
  const [cpuOpex, setCpuOpex] = useState(0);

  // Valores de CAPEX e OPEX
  const [capex, setCapex] = useState(0);
  const [opex, setOpex] = useState(0);
  const [totalCapex, setTotalCapex] = useState(0);
  const [totalOpex, setTotalOpex] = useState(0);

  // Fila de compra que será usada no PDF
  const [table, setTable] = useState([["CAPEX", "OPEX", "Memória (GB)", "CPU", "Armazenamento (GB)", "Quantidade"]]);

  /**
   * Puxa pela API os valores para fazer o orçamento de um container
   */
  useEffect(() => {
    api
      .get("/getPrices/container")
      .then((response) => {
        const prices = response.data;

        setMemoryCapex(prices.memory_capex);
        setCpuCapex(prices.cpu_capex);
        setStorageCapex(prices.storage_capex);
        setMemoryOpex(prices.memory_opex);
        setCpuOpex(prices.cpu_opex);
      })
      .catch(() => {
        alert("Servidor Fora do Ar.");
      });
  }, []);

  /**
   * Faz o orçamento toda vez que a memória, CPU, armazenamneto ou quantidade de máquinas é alterada
   */
  useEffect(() => {
    setCapex((memoryCapex * memoryAmount + cpuCapex * cpuAmount + storageCapex * storageAmount) * machineAmount);
    setOpex((memoryOpex * memoryAmount + cpuOpex * cpuAmount) * machineAmount);
  }, [memoryAmount, cpuAmount, storageAmount, machineAmount]);

  /**
   * Adiciona as inforamções do container na tabela e atualiza o preço total
   */
  function addContainerToTable() {
    const newRow = [formatCurrency(capex), formatCurrency(opex), memoryAmount, cpuAmount, storageAmount, machineAmount];

    setTable([...table, newRow]);
    setTotalCapex(totalCapex + capex);
    setTotalOpex(totalOpex + opex);
    setMemoryAmount("");
    setCpuAmount("");
    setStorageAmount("");
    setMachineAmount(1);

    alert("Container Adicionado ao Orçamento.");
  }

  /**
   * Envia a tabela e o preço total para a função de gerar PDF
   */
  function handleSubmit(event) {
    event.preventDefault();

    generatePdf(table, totalCapex, totalOpex);

    // Limpa a fila de compra e os valores de CAPEX e OPEX
    setTable([["CAPEX", "OPEX", "Memória (GB)", "CPU", "Armazenamento (GB)", "Quantidade"]]);
    setCapex(0);
    setTotalCapex(0);
    setOpex(0);
    setTotalOpex(0);
  }

  return (
    <div className="container">
      <Card className="m-3" style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>Orçamento Container</Card.Title>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="my-3">
              <Form.Label>Memória RAM (GB):</Form.Label>
              <Form.Control type="number" value={memoryAmount} onChange={(e) => setMemoryAmount(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Quantidade de CPUs:</Form.Label>
              <Form.Control type="number" value={cpuAmount} onChange={(e) => setCpuAmount(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Armazenamento (GB):</Form.Label>
              <Form.Control type="number" value={storageAmount} onChange={(e) => setStorageAmount(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Número de Máquinas:</Form.Label>
              <Form.Control type="number" value={machineAmount} onChange={(e) => setMachineAmount(e.target.value)} />
            </Form.Group>

            <Button variant="secondary" style={{ width: "100%" }} className="mb-3" onClick={addContainerToTable}>
              Adicionar ao Orçamento
            </Button>

            <Alert variant="warning">
              <strong>CAPEX:</strong> {formatCurrency(capex)}
              <br />
              <strong>OPEX:</strong> {formatCurrency(opex)}
              <br />
              <strong>Preço Total:</strong> {formatCurrency(capex + opex)}
            </Alert>

            <Button variant="primary" type="submit" style={{ width: "100%" }}>
              Finalizar e Gerar PDF
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
