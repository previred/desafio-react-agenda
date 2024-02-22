import { Col, Row, Typography } from "antd";

export const PageInfo = () => {
  const { Text } = Typography;
  return (
    <Row>
      <Col span={24}>
        <Text strong style={{ fontSize: 36 }}>
          Agenda Previred - mi agenda de contactos laboral
        </Text>
      </Col>
      <Col span={24}>
        <Text type="secondary">
          Aquí podrá encontrar o buscar a todos sus contactos agregados, agregar
          nuevos contactos y eliminar contactos no deseados
        </Text>
      </Col>
    </Row>
  );
};
