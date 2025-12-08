import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { toyService } from '../../services/toy.service';


export function ToyFilter({ filterBy, onSetFilterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const allLabels = toyService.labels


    useEffect(() => {
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break
            case 'checkbox':
                value = target.checked
                break
            case 'select-multiple':
                value = Array.from(target.selectedOptions, option => option.value)
                break
            default:
                break
        }

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilterBy(filterByToEdit)
    }

    const { name, price, labels, inStock } = filterByToEdit

    return (
        <section className="toy-filter card">
            <header className="toy-filter__header">
                <h2> Filter Toys</h2>
            </header>
            <form onSubmit={onSubmitFilter} className="toy-filter__form">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        value={name}
                        onChange={handleChange}
                        type="search"
                        placeholder="Search by name..."
                        id="name"
                        name="name"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input
                        value={price}
                        onChange={handleChange}
                        type="number"
                        placeholder="Minimum price"
                        id="price"
                        name="price"
                    />
                </div>

                <div className="form-group checkbox-group">
                    <label htmlFor="inStock">In stock</label>
                    <input
                        type="checkbox"
                        name="inStock"
                        id="inStock"
                        checked={inStock}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <div className="select-multi">
                        <label htmlFor="labels">Labels</label>
                        <Select
                            multiple
                            name="labels"
                            id="labels"
                            value={labels}               
                            onChange={handleChange}
                            >
                            {allLabels.map(label => (
                                <MenuItem key={label} value={label}>
                                {label}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>
                </div>
                <button className="btn btn-secondary">Apply</button>
                <Link to="/toy/edit/" className="btn btn-primary"> Add Toy</Link>

            </form>

        </section>
    )
}
