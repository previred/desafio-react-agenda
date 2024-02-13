import { notification } from "antd";
import React, { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { setUsers } from "../redux/actions/contacts";
import { fetchWithoutToken } from "../utils/fetch";

const HomeScreen = React.lazy(() => import('../screens/Home'));
const ListScreen = React.lazy(() => import('../screens/List'));
const UserScreen = React.lazy(() => import('../screens/User'));

export const AppRouter: React.FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        fetchWithoutToken('users', null, 'GET').then(({ ok, data, message }) => {
            if (ok) dispatch(setUsers(data));
            else notification.error({ message: 'Error al obtener contactos', description: message, placement: 'top' });
        })
    }, [dispatch]);


    return (
        <BrowserRouter>
            <Suspense fallback={<div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>}>
                <Routes>
                    <Route path='/home' element={<HomeScreen />} />
                    <Route path='/users' element={<ListScreen />} />
                    <Route path='/users/:id' element={<UserScreen />} />
                    <Route path='*' element={<Navigate replace to='/home' />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    )
}