import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { toyService } from "../../services/toy.service.js"
import { useSelector} from "react-redux"


export function ToyEdit() {
  const { toyId } = useParams()
  const navigate = useNavigate()
  const [toyToEdit, setToyToEdit] = useState(null)

  useEffect(() => {
    if (toyId) {
      toyService.get(toyId)
      .then(setToyToEdit)
    } else {
      setToyToEdit(toyService.getEmptyToy())
    }
  }, [toyId])

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
    }
    setToyToEdit(prevToy => ({ ...prevToy, [field]: value }))
  }

  function onSaveToy(ev) {
    ev.preventDefault()
    toyService.save(toyToEdit)
      .then(() => navigate('/toy'))
      .catch(err => console.log('err:', err))
  }
    function onBack() {
        navigate('/toy')
    }

  if (!toyToEdit) return <div>Loading...</div>

  const { name, price, inStock } = toyToEdit

  return (
    <section className="toy-edit">
      <form onSubmit={onSaveToy}>
        <label htmlFor="name">Name:</label>
        <input onChange={handleChange} value={name} type="text" name="name" id="name" />

        <label htmlFor="price">Price:</label>
        <input onChange={handleChange} value={price} type="number" name="price" id="price" />

        <label htmlFor="inStock">In Stock:</label>
        <input
          onChange={handleChange}
          checked={inStock}
          type="checkbox"
          name="inStock"
          id="inStock"
        />

        <button>Save</button>
        <button onClick={onBack}>Back</button>
      </form>
    </section>
  )
}
