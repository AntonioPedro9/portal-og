import React from "react";
import { Card, Dropdown, Button } from "react-bootstrap";

export default function Home() {
  return (
    <div className="container">
      <Card className="m-3" style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>Orçamento</Card.Title>

          <Card.Text>Faça uma simulação de um orçamento para gerar seu PDF.</Card.Text>

          <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              Simular orçamento
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="/vm">VM</Dropdown.Item>
              <Dropdown.Item href="/container">Container</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Card.Body>
      </Card>

      <Card className="m-3" style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>Solicitação</Card.Title>

          <Card.Text>Anexe o PDF gerado no Jira para concluir sua solicitação.</Card.Text>

          <a href="https://jira.algartelecom.com.br:8443/secure/Dashboard.jspa" target="blank">
            <Button variant="primary">Navegar até o Jira</Button>
          </a>
        </Card.Body>
      </Card>
    </div>
  );
}
