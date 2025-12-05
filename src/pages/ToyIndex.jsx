import { useSelector } from 'react-redux'
import { Footer } from "../cmps/Footer.jsx"
import { ToyList } from '../cmps/ToyList.jsx'
import {useEffect, useState} from 'react'
import { loadToys, removeToy } from '../../store/toy.actions.js'
import { OnlineStatus } from '../cmps/OnlineStatus.jsx'
import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { Link , useNavigate, useSearchParams } from 'react-router-dom'
import { toyService } from '../../services/toy.service.js'
import {showErrorMsg, showSuccessMsg} from '../../services/event-bus.service.js'



export function ToyIndex() {
    const toys = useSelector((state) => state.toys)
    const isLoading = useSelector((state) => state.isLoading)
    const navigate = useNavigate()
    
    const [searchParams, setSearchParams] = useSearchParams()
    const defaultFilter = toyService.getFilterFromSearchParams(searchParams)


    const [filterBy, setFilterBy] = useState(defaultFilter)



    useEffect(() => {
        setSearchParams(filterBy)
        loadToys(filterBy)
        .then(()=>{showSuccessMsg('Toys loaded')})
        .catch(err => {
            showErrorMsg('Cannot load toys')
            console.log('Cannot load toys', err)
        })
        
    }, [filterBy])

    function onRemoveToy(toyId) {
        removeToy(toyId)
        .then(console.log('Removing toy', toyId))
        .catch(err => {
            showErrorMsg('Cannot remove toy')
            console.log('Cannot remove toy', err)
        })
    }
    
    return (
        <section className="toy-index">
            <ToyFilter filterBy={filterBy} onSetFilterBy={setFilterBy} />
            <h2>Toys List</h2>
            {!isLoading && toys.length === 0 && <p>No toys found</p>}
            {isLoading?'Loading...':<ToyList toys={toys} onRemoveToy={onRemoveToy}/>}
            <hr/>
            <Footer />
            <OnlineStatus/>
        </section>
    )
}