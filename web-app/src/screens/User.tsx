import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../interface";
import { useParams } from "react-router-dom";
import { IUser } from "../redux/types/contacts";
import { Card, Empty, Flex } from "antd";

const UserScreen: React.FC = () => {
    const params = useParams();
    const { users } = useSelector((state: RootState) => state.contacts);

    const user: IUser | null | undefined = useMemo(() => {
        if (params['id'] && !isNaN(parseInt(params['id']))) {
            return users.find(f => f.id === parseInt(params['id'] as string));
        }
        return null;
    }, [params, users]);

    return (
        <Flex justify="center">
            {
                user ?
                    <Card
                        hoverable
                        style={{ width: 400 }}
                        cover={<img alt="user_photo" src={user.photo} />}
                    >
                        <Card.Meta title={user.name} description={user.description} />
                    </Card>

                    :
                    <Empty description="Usuario no encontrado en la lista de contactos" />
            }
        </Flex>
    )
}


export default UserScreen;