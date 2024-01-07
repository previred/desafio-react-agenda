import React from "react";
import { Layout, Row, Typography } from "antd";
import AddUser from "../../organisms/AddUser";
import UserList from "../../organisms/UserList";

const { Title, Text } = Typography;
const { Content } = Layout;

function UserContactList() {
  return (
    <Layout
      style={{
        background: "#fff",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Content
        style={{
          padding: "80px 0",
          maxWidth: "1200px",
          width: "100%",
        }}
      >
        <Row gutter={[0, 0]}>
          <Title style={{ fontSize: 36, color: "#464646", marginBottom: 8 }}>
            Agenda Previred - Mi agenda de contactos laboral
          </Title>
          <Text type='secondary' style={{ fontSize: 18, marginTop: 0 }}>
            Aquí podrá encontrar o buscar a todos sus contactos agregados,
            agregar nuevos contactos y eliminar contactos no deseados.
          </Text>
        </Row>
        <Row
          gutter={[0, 8]}
          style={{ marginTop: "24px", marginBottom: "24px" }}
        >
          <AddUser />
        </Row>
        <Row gutter={[0, 8]}>
          <UserList />
        </Row>
      </Content>
    </Layout>
  );
}

export default UserContactList;
