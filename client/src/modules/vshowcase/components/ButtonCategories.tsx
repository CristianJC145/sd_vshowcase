import AppIcon from "../../../shared/components/AppIcon"
import styled from "styled-components"
// import { useButtonContext } from "../../../shared/contexts/ButtonContext"

interface ButtonCategoriesProps {
    icon?: string,
    label: string,
    ariaLabel: string
}
const ButtonCategories: React.FC<ButtonCategoriesProps>= ({icon, label, ariaLabel})=>{
    // const {selectedButton, setSelectedButton, defaultSelectedButton, setDefaultSelectedButton} = useButtonContext();

    // useEffect(()=>{
    //     if(defaultSelectedButton === label) {
    //         setSelectedButton(label);
    //         setDefaultSelectedButton(null);
    //     }
    // })

    // const handleClick = () => {
    //     setSelectedButton(label);
    //     // Llamar a la función de filtro aquí con el parámetro de categoría
    // };

    return (
        <ButtonCategoriesStyle>
            <div className="vs-categories-btn">
                <button className='vs-btn-action' aria-label={ariaLabel}>
                    <AppIcon icon={icon}></AppIcon>
                </button>
                <span className="vs-btn-label">{label}</span>
            </div>
        </ButtonCategoriesStyle>
    )
}
export default ButtonCategories

const ButtonCategoriesStyle = styled.div `
    .vs-categories-btn {
        display: flex;
        align-items: center;
        text-decoration: none;
        border-radius: 40px ;
        border: 2px solid var(--color-body);
        box-shadow: 0 0 8px rgba(0, 0, 0, 0.01);
        padding: var(--p-2);
        cursor: pointer;
        background-color: #fff;
        color: var(--color-gray-900);
    }
    .selected {
        background-color: var(--color-primary);
        color: #fff;
    }
    .vs-btn-action {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 999px;
        box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
        background-color: #fff;
        color: var(--color-gray-900);
        border: 1px solid rgba(var(--color-gray-400), 0.8);
    }
    .vs-btn-label {
        color: inherit;
        line-height: 2rem;
        margin: 0 1rem;
        font-weight: bold;
        text-wrap: nowrap;
    }
`