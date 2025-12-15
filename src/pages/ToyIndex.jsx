import { useSelector } from 'react-redux'
import { Footer } from "../cmps/Footer.jsx"
import { ToyList } from '../cmps/ToyList.jsx'
import { useEffect, useRef, useState } from 'react'
import { loadToys, removeToy } from '../../store/toy.actions.js'
import { OnlineStatus } from '../cmps/OnlineStatus.jsx'
import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { useSearchParams } from 'react-router-dom'
import { toyService } from '../../services/toy.service.js'
import { showErrorMsg, showSuccessMsg } from '../../services/event-bus.service.js'
import { utilService } from '../../services/util.service.js'
import { NoToys } from '../cmps/NoToys.jsx'


export function ToyIndex() {
  const toys = useSelector((state) => state.toys)
  const [searchParams, setSearchParams] = useSearchParams()
  const defaultFilter = toyService.getFilterFromSearchParams(searchParams)
  const [filterBy, setFilterBy] = useState(defaultFilter)
  const isLoading = useSelector((state) => state.isLoading)

  useEffect(() => {
    setSearchParams(filterBy)
    loadToys(filterBy)
      .then(() => { showSuccessMsg('Toys loaded') })
      .catch(err => {
        showErrorMsg('Cannot load toys')
        console.log('Cannot load toys', err)
      })
  }, [filterBy])

  function onRemoveToy(toyId) {
    removeToy(toyId)
      .then(() => console.log('Removing toy', toyId))
      .catch(err => {
        showErrorMsg('Cannot remove toy')
        console.log('Cannot remove toy', err)
      })
  }

  function onSetFilterBy(newFilter) {
    setFilterBy(prevFilter => ({ ...prevFilter, ...newFilter }))
  }

  const debounced = useRef(utilService.debounce(onSetFilterBy, 500)).current

  return (
    <section className="toy-index">
      <ToyFilter filterBy={filterBy} onSetFilterBy={debounced} />
      {!isLoading && toys.length === 0 && <NoToys/>}
      {isLoading ? 'Loading...' : <ToyList toys={toys} onRemoveToy={onRemoveToy} />}
      <hr />
      <Footer />
      <OnlineStatus />
    </section>
  )
}
