import AppButton from '../../../shared/components/Buttons/AppButton';
import CardComponent from '../components/AccountTypeCard';
import gif from '../../../assets/images/urban-842.gif'
import gif_buy from '../../../assets/images/buy.gif'
import styled from 'styled-components';

function RegisterLanding() {
    return (
        <RegisterLandingStyle>
            <div className="account-selection-page">
                <div className="account-cards">
                    <CardComponent
                        imageSrc={gif}
                        title="Crear Cuenta Empresarial"
                        description="Vende y administra tus productos con un dashboard para las empresas."
                    >
                        <AppButton to={`/register/count/business?type=business`} label='Continuar'></AppButton>
                    </CardComponent>

                    <CardComponent
                        imageSrc={gif_buy}
                        title="Crear Cuenta Personal"
                        description="Compra tus productos con una amplia gama de facilidades de pago."
                    >
                    <AppButton to={`/register/count/personal?type=personal`} label='Continuar'></AppButton>
                    </CardComponent>
                </div>
            </div>
        </RegisterLandingStyle>
    )
}

export default RegisterLanding;

const RegisterLandingStyle = styled.div`
    .account-selection-page {
        margin: 2rem auto;
    }
    .account-cards {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.5rem;
        gap: 1.5rem;
    }
    
    .account-type-card {
        max-width: 290px;
        box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.25);
        border-radius: 8px;
        padding: 20px;
        text-align: center;
        text-decoration: none;
        cursor: pointer;
    }
    
    .account-type-card img {
        width: 100%;
        height: 180px;
        margin-bottom: 10px;
        object-fit: cover;
    }
    .vs-card-title {
        color: var(--color-primary);
    }
    .vs-card-info {
        font-size: 14px;
        color: var(--color-gray-400);
    }
    @media (min-width: 768px) {
        .account-selection-page {
        width: 600px;
        }
        .account-cards {
        flex-direction: row;
        }
    }
`