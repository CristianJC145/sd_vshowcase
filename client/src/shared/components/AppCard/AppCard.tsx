import { ReactNode } from 'react'
import styled from 'styled-components';
interface AppCardProps {
    header?: ReactNode,   
    body?: ReactNode,
    footer?: ReactNode,
    children?: ReactNode;
    className?: string;
}
const AppCard: React.FC<AppCardProps>  = ({header, body, footer, children, className}) => {
    const classN = className ? `vs-card ${className}`: 'vs-card';
    const classNames = [classN].filter(Boolean).join(' ')
    return (
        <AppCardStyle>
            <div className={classNames}>
                {header && <div className="vs-card__header">{header}</div>}
                {body && <div className="vs-card__body">{body}</div>}
                {footer && <div className="vs-card__footer">{footer}</div>}
                {children}
            </div>
        </AppCardStyle>
    )
}
export default AppCard;

const AppCardStyle = styled.div `
    .vs-card {
        border-radius: 16px;
        background-color: #fff;
        border: 2px solid rgba(var(--color-gray-300-rgb), 0.1);
        box-shadow: 0 0 20px 0 rgba(0, 0, 0, .05);
        width: 100%;
        overflow: auto;
        padding: var(--p-8);
    }
`