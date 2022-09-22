import EmployeesListItem from "../employees-list-item/employees-list-item";

import './employees-list.css';

const EmployeesList = ({ data, onDelete, onToggleRise, onToggleIncrease, onToggleProp }) => {

    // Перебор массива и возврат компонента
    const elements = data.map(item => {
        const { id, ...itemProps } = item
        // item элемент массива - объект с свойствами name, salary, id, increase
        return (
            // <EmployeesListItem name={item.name} salary={item.salary} />
            // Сокращеная передача пропсов, разворачивание свойств объекта
            <EmployeesListItem key={id} {...itemProps} onDelete={() => onDelete(id)} onToggleIncrease={() => onToggleIncrease(id)} onToggleRise={() => onToggleRise(id)} onToggleProp={(e) => onToggleProp(id, e.currentTarget.getAttribute('data-toggle'))}/>
        )
    });

    return (
        <ul className="app-list list-group">
            {/* Вывод массива компонентов на страницу */}
            {elements}
        </ul>
    )
}

export default EmployeesList;