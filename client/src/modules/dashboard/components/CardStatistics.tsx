import React from "react"
import AppIcon from "../../../shared/components/AppIcon"
import styled from "styled-components"

interface CardStatisticProps {
    label : string,
    value : number | string,
    icon : string,
}
const CardStatistic : React.FC<CardStatisticProps> = ({label, value, icon}) =>{
    return (
        <CardStatisticStyle>
            <div className="vs-card-statistic">
                <div className="d-flex align-center justify-content-between">
                    <span className="vs-statistic-label">{label}</span>
                    <AppIcon className="vs-statistic-icon" icon={icon}></AppIcon>
                </div>
                <h3 className="vs-statistic-value">{value}</h3>
            </div>
        </CardStatisticStyle>
    )
}
export default CardStatistic

const CardStatisticStyle = styled.div`
    .vs-card-statistic {
        display: flex;
        flex-direction: column;
        padding: var(--p-6);
        background-color: #fff;
        border-radius: 16px;
        box-shadow: 1px 9px 20px rgba(0, 0, 0, 0.05);
        border: 2px solid rgba(var(--color-gray-300-rgb), 0.1);
    }
    .vs-statistic-label {
        color: var(--color-gray-800);
        font-size: 16px;
        margin-bottom: 1rem;    
    }
    .vs-statistic-value {
        font-weight: bold;
        color: var(--color-gray-800);
        margin-bottom: 0;
    }
    .vs-statistic-icon {
        color: var(--color-primary);
        font-size: 20px;
    }

    @media (min-width: 992px) {
        .vs-statistic-icon {
            font-size: 22px;
        }
        .vs-statistic-label {
            font-size: 18px
        }
    }
`