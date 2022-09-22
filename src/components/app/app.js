import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [
                { name: 'John Smith', salary: '1000', increase: false, rise: true, id: 1 },
                { name: 'Alex Minik.', salary: '3000', increase: true, rise: false, id: 2 },
                { name: 'Carl With.', salary: '5000', increase: false, rise: false, id: 3 },
            ], 
            term: '',
            filter: 'all'
        }
        this.maxId = 4;
    }

    // Удаление элемента списка по клику на кнопку удалить
    deleteItem = (id) => {
        // 1 вариант 
        // this.setState(({data}) => {
        //     // Нахождение индекса
        //     const index = data.findIndex(elem => elem.id === id);
        //     // удалить объект который нашли из state
        //     const before = data.slice(0, index)
        //     const after = data.slice(index + 1)
        //     const newArr = [...before, ...after]
        //     return {
        //         data: newArr
        //     }
        // })
        
        // 2 вариант
        this.setState(({ data }) => {
            return {
                data: data.filter(item => item.id !== id)
            }
        })
    }

    // Добавление елемента списка 
    addItem = (name, salary) => {
        const newItem = {
            name,
            salary,
            increase: false,
            rise: false,
            id: this.maxId++
        }
        this.setState(({ data }) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        });
    }

    // Кнопка с печенькой, переключение состояния
    onToggleIncrease = (id) => {
        // 1 вариант
        // this.setState(({data}) => {
        //     const index = data.findIndex(elem => elem.id === id);
        //     const old = data[index]
        //     const newItem = {...old, increase: !old.increase}
        //     const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)]

        //     return {
        //         data: newArr
        //     }
        // })

        // 2 вариант
        this.setState(({ data }) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {
                        ...item,
                        increase: !item.increase
                    }
                }
                return item
            })
        }))
    }

    onToggleRise = (id) => {
        this.setState(({ data }) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {
                        ...item,
                        rise: !item.rise
                    }
                }
                return item
            })
        }))
    }

    // 1 метод вместо двух onToggleRise, onToggleIncrease
    onToggleProp = (id, prop) => {
        this.setState(({ data }) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {
                        ...item,
                        [prop]: !item[prop]
                    }
                }
                return item
            })
        }))
    }

    // Метод для поиска
    searchEmp = (items, term) => {
        if (term.length === 0) {
            return items
        }

        return items.filter(item => {
            return item.name.toLowerCase().indexOf(term) > -1
        })
    }

    onUpdateSearch = (term) => {
        this.setState({
            term: term.toLowerCase()
        })
    }

    // Фильтр
    filterPost = (items, filter) => {
        switch (filter) {
            case 'rise':
                return items.filter(item => item.rise)
            case 'moreThen1000':
                return items.filter(item => item.salary > 1000)
            default: 
                return items
        }
    }

    // Метод выбора фильтра
    onFilterSelect = (filter) => {
        this.setState(({ filter }))
    }


    render() {
        const {data, term, filter} = this.state;
        const employees = this.state.data.length;
        const increased = this.state.data.filter(item => item.increase).length;
        // const visibleData = this.searchEmp(data, term)
        const visibleData = this.filterPost(this.searchEmp(data, term), filter)
        


        return (
            <div className="app">
                <AppInfo employees={employees} increased={increased}/>

                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter filter={filter} onFilterSelect={this.onFilterSelect}/>
                </div>

                {/* Передача массива в компонент */}
                <EmployeesList data={visibleData} onDelete={this.deleteItem} onToggleIncrease={this.onToggleIncrease} onToggleRise={this.onToggleRise} onToggleProp={this.onToggleProp}/>
                <EmployeesAddForm addItem={this.addItem} />
            </div>
        );
    }
}

export default App;
