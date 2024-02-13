import React, { useCallback, useEffect, useImperativeHandle, useRef, useState, } from 'react';
import ReactDOM from 'react-dom';
import { StyledLoading } from './style';
import { Spin } from 'antd';

export type LoadingProps = {
    className?: string;
    active?: boolean;
    wrapperId?: string;
    style?: React.CSSProperties;
    text?: string;
};

export interface LoadingRefObject {
    active: boolean,
    setActive: (active: boolean) => void;
}

const Loading = React.forwardRef<LoadingRefObject, LoadingProps>(({ className, active: defaultActive, wrapperId, style, text }, ref) => {
    const [active, setActive] = useState(false);
    const elementRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<Element>();

    const setOpened = useCallback((value: boolean) => {
        if (value === active) return;
        if (!value) setTimeout(() => {
            setActive(value);
        }, 300);
        else setActive(value);
    }, [active]);

    useEffect(() => {
        // * wrapper por defecto si no existe
        let loadingContainer = wrapperId ? document.getElementById(wrapperId) : document.getElementById('loading-container');
        if (!loadingContainer) {
            loadingContainer = document.createElement('div');
            loadingContainer.setAttribute('id', 'loading-container');
            document.body.prepend(loadingContainer);
        }

        loadingContainer.style.position = 'relative';
        wrapperRef.current = loadingContainer;
    }, [wrapperId]);

    useEffect(() => {
        if (defaultActive !== undefined) setOpened(defaultActive);
    }, [defaultActive, setOpened]);

    useImperativeHandle(ref, () => ({
        active,
        setActive: setOpened,
    }));

    if (!active || !wrapperRef.current) return null;
    const cls = `loading ${className}`.trim();

    return ReactDOM.createPortal((
        <StyledLoading ref={elementRef} className={cls} style={{ position: wrapperId ? 'absolute' : undefined, ...style }}>
            <Spin tip={text ?? "Loading..."} size="large">
                <div style={{ minWidth: 120, minHeight: 120 }} />
            </Spin>
        </StyledLoading>
    ), wrapperRef.current);
});

Loading.defaultProps = {
    className: '',
    active: false,
};

Loading.displayName = 'Loading';

export default Loading;
