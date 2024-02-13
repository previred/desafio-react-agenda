

import styled from 'styled-components';


export const StyledLoading = styled.div`
    $animation: 0.3s cubic-bezier(0.19, 1, 0.22, 1) forwards;

    animation: fade-in $animation;
    -webkit-animation: fade-in $animation;
    transition: 0.3s cubic-bezier(0.19, 1, 0.22, 1);
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, .5);
    display: flex;
    align-items: center;
    z-index: 99999;
    overflow: hidden;

    >div {
        pointer-events: none;
        margin: auto;
    }

    &.closed {
        animation: fade-out $animation;
        -webkit-animation: fade-out $animation;
    }

    @keyframes blinker {
    50% {
        opacity: 0.1;
    }
    }

    @keyframes fade-in {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
    }

    @-webkit-keyframes fade-in {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
    }

    @keyframes fade-out {
    0% {
        opacity: 1;
    }

    100% {
        opacity: 0;
    }
    }

    @-webkit-keyframes fade-out {
    0% {
        opacity: 1;
    }

    100% {
        opacity: 0;
    }
    }
`;