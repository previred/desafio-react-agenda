import React from "react";
import { Typography } from 'antd';

const { Text, Title } = Typography;

export const ScheduleTitle = (): JSX.Element => (
  <>
    <Title level={3}>Agenda Previred - Mi agenda de contactos laboral</Title>
    <Text>Aquí podrá encontrar o buscar todos sus contactos agregados, agregar nuevos contactos y eliminar contactos no deseados.</Text>
  </>
)