import React from 'react';
import styled from 'styled-components';

import AppButton from '../../shared/components/Buttons/AppButton';
interface AppFooterProps {
    style? : object
}


const AppFooter:React.FC<AppFooterProps> = ({style}) => {
    return (
        <AppFooterStyles>
            <footer style={style}>
                <div className="vs-footer-left" >
                    <span>@ 2024 Vshowcase. Todos los derechos reservados</span>
                </div>

                <div className="vs-footer-right" >
                    <AppButton icon="fa-brands fa-instagram" variant='dark' ariaLabel='Instagram'></AppButton>
                    <AppButton icon="fa-brands fa-youtube" variant='dark' ariaLabel='Youtube'></AppButton>
                    <AppButton icon="fa-brands fa-twitter" variant='dark' ariaLabel='X'></AppButton>
                </div>
            </footer>
        </AppFooterStyles>
    )
}
export default AppFooter

const AppFooterStyles = styled.div`
footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 2px solid var(--color-body);
    padding: var(--p-8);
    flex-direction: column;
    gap: 1rem;
    background-color: #fff;
}
.vs-footer-left {
    margin-left: 0;
    font-weight: 600;
    color: var(--color-gray-400);
}
.vs-footer-right {
    margin-right: 0;
    display: flex;
    flex-direction: row;
    gap: 1rem;
}
@media (min-width: 768px) {
    footer {
        flex-direction: row;
    }
    .vs-footer-left {
        margin-left: 2rem;
    }
    .vs-footer-right {
        margin-right: 2rem;
    }
}
`