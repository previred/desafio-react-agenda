import { gray } from '@ant-design/colors';
import { BookOutlined, LinkOutlined, MailOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons";
import { Divider, Flex, Typography } from "antd";
import React from "react";
import { Link } from 'react-router-dom';

const { Text, Link: TextLink } = Typography;

const HomeScreen: React.FC = () => {
    return (
        <Flex className="w100 h100" justify="center" align="center">
            <Flex justify="center" align="center">
                <div>
                    <Text style={{ fontSize: 16, color: gray[2] }}>Bienvenido a</Text>
                    <br />
                    <br />
                    <Flex align="center">
                        <BookOutlined style={{ fontSize: 20, marginRight: 5, color: gray[4] }} />
                        <Text style={{ color: gray[4] }} className="mr-6"><span className="text-20">A</span>genda</Text>
                        <Text className="text-20 bold" style={{ color: "#fbba00" }}>PREVI</Text>
                        <Text className="text-20 bold" style={{ color: "#502d7d" }}>RED</Text>
                    </Flex>
                    <br />
                    <Link to="/users" className="text-14"><LinkOutlined style={{ marginRight: 5 }} />Ir a lista de contactos</Link>
                </div>
                <Divider type="vertical" style={{ height: 120, margin: '0 30px' }} />
                <div>
                    <UserOutlined className="mr-6" style={{ color: gray[3] }} /><Text type="secondary" className="text-16">Cristian Peña Montes</Text>
                    <br />
                    <MailOutlined className="mr-6" style={{ color: gray[3] }} /><TextLink href="mailto:chris.pmontes@gmail.com">chris.pmontes@gmail.com</TextLink>
                    <br />
                    <PhoneOutlined className="mr-6" style={{ color: gray[3] }} /><Text type="secondary">+569 950 39 099</Text>
                    <br />
                    <Text type="secondary" style={{ color: gray[2] }}>Postula a: <span style={{ color: gray[5] }}>Ingeniero Desarrollo Frontend</span></Text>
                </div>
            </Flex>
        </Flex>
    )
}


export default HomeScreen;