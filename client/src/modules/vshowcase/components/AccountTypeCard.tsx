import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface AccountTypeCardProps {
    imageSrc: string;
    title: string;
    description: string;
    children?: ReactNode;
  }

const AccountTypeCard: React.FC<AccountTypeCardProps> = ({ imageSrc, title, description, children}) => {
  return (
    <AccountTypeCardStyle>
      <div className="account-type-card">
        <img className="vs-card-img" src={imageSrc} alt="Referencia" />
        <h2 className='vs-card-title'>{title}</h2>
        <p className="vs-card-info">{description}</p>
        {children}
      </div>
    </AccountTypeCardStyle>
  );
};

export default AccountTypeCard;

const AccountTypeCardStyle = styled.div `
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