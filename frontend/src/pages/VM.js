import { React, useState, useEffect } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";

import api from "../services/api";
import generatePdf from "../services/generatePdf";
import formatCurrency from "../utils/formatCurrency";

export default function VM() {
  const [memoryAmount, setMemoryAmount] = useState("");
  const [cpuAmount, setCpuAmount] = useState("");
  const [storageAmount, setStorageAmount] = useState("");
  const [machineAmount, setMachineAmount] = useState(1);

  const [memoryPrice, setMemoryPrice] = useState(0);
  const [cpuPrice, setCpuPrice] = useState(0);
  const [storagePrice, setStoragePrice] = useState(0);

  const [budget, setBudget] = useState(0);
  const [capex, setCapex] = useState(0);
  const [opex, setOpex] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [table, setTable] = useState([["Preço", "Memória (GB)", "CPU", "Armazenamento (GB)", "Quantidade"]]);

  /**
   * Puxa pela API os valores para fazer o orçamento de uma VM
   */
  useEffect(() => {
    api.get("/getPrices/vm").then((response) => {
      const prices = response.data;

      if (prices) {
        setMemoryPrice(prices.memory_price);
        setCpuPrice(prices.cpu_price);
        setStoragePrice(prices.storage_price);
      } else {
        alert("Servidor fora do ar.");
      }
    });
  }, []);

  /**
   * Faz o orçamento toda vez que a memória, CPU, armazenamneto ou quantidade de máquinas é alterada
   */
  useEffect(() => {
    setBudget((memoryPrice * memoryAmount + cpuPrice * cpuAmount + storagePrice * storageAmount) * machineAmount);
  }, [memoryAmount, cpuAmount, storageAmount, machineAmount]);

  /**
   * Adiciona as inforamções da VM na tabela e atualiza o preço total
   */
  function addVmToTable() {
    const newRow = [formatCurrency(budget), memoryAmount, cpuAmount, storageAmount, machineAmount];

    setTable([...table, newRow]);
    setTotalPrice(totalPrice + budget);
    setMemoryAmount("");
    setCpuAmount("");
    setStorageAmount("");
    setMachineAmount(1);

    alert("VM adicionada a fila de compra.");
  }

  /**
   * Envia a tabela e o preço total para a função de gerar PDF
   */
  async function handleSubmit(event) {
    event.preventDefault();
    generatePdf(table, formatCurrency(totalPrice));
  }

  return (
    <div className="container">
      <Card className="m-3" style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>Orçamento VM</Card.Title>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="my-3">
              <Form.Label>Memória RAM (GB)</Form.Label>
              <Form.Control type="number" value={memoryAmount} onChange={(e) => setMemoryAmount(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Quantidade de CPUs</Form.Label>
              <Form.Control type="number" value={cpuAmount} onChange={(e) => setCpuAmount(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Armazenamento (GB)</Form.Label>
              <Form.Control type="number" value={storageAmount} onChange={(e) => setStorageAmount(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Número de máquinas</Form.Label>
              <Form.Control type="number" value={machineAmount} onChange={(e) => setMachineAmount(e.target.value)} />
            </Form.Group>

            <Button variant="secondary" style={{ width: "100%" }} className="mb-3" onClick={addVmToTable}>
              Adicionar a fila
            </Button>

            <Alert variant="warning">
              <strong>Valor total:</strong> {formatCurrency(budget)}
            </Alert>

            <Button variant="primary" type="submit" style={{ width: "100%" }}>
              Finalizar e gerar PDF
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
