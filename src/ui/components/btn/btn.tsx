// src/components/Header.tsx
import React from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import './btn.css'

interface BtnProps {
    value: string;
    type:string | any;
    onClick: () => void;
}

const Btn: React.FC<BtnProps> = ({ value, onClick ,type}) => {
    return (
        <div className="btn-container">
            <Button type={type} icon={<PlusOutlined />} onClick={onClick}>
                {value}
            </Button>
        </div>
    );
};

export default Btn;

