import { useSelector } from 'react-redux'
import { Footer } from "../cmps/Footer.jsx"
import { ToyList } from '../cmps/ToyList.jsx'
import {useEffect} from 'react'
import { loadToys, removeToy } from '../../store/toy.actions.js'
import { OnlineStatus } from '../cmps/OnlineStatus.jsx'



// const { Link, useSearchParams } = ReactRouterDOM
// const { useSelector } = ReactRedux
// const { useNavigate } = ReactRouter



export function ToyIndex() {
    const toys = useSelector((state) => state.toys)
    const isLoading = useSelector((state) => state.isLoading)
    // const navigate = useNavigate()



    // const [searchParams, setSearchParams] = useSearchParams()

    // const defaultFilter = todoService.getFilterFromSearchParams(searchParams)

    // const [filterBy, setFilterBy] = useState(defaultFilter)

    useEffect(() => {
        // setSearchParams(filterBy)
        loadToys()
        .catch(err => {
            // showErrorMsg('Cannot load todos')
        })
        
    }, [])

    function onRemoveToy(toyId) {
        removeToy(toyId)
        .then(console.log('Removing toy', toyId))
        
        // navigate(`/todo/${todoId}/remove`)
    }
    
    return (
        <section className="toy-index">
            {/* <TodoFilter filterBy={filterBy} onSetFilterBy={setFilterBy} />
            <div>
                <Link to="/todo/edit" className="btn" >Add Todo</Link>
            </div> */}
            <h2>Toys List</h2>
            {!isLoading && toys.length === 0 && <p>No toys found</p>}
            {isLoading?'Loading...':<ToyList toys={toys} onRemoveToy={onRemoveToy}/>}
            <hr />
            
            <Footer />
            <OnlineStatus/>
        </section>
    )
}