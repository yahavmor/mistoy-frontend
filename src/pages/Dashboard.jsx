import { Doughnut } from 'react-chartjs-2';


import {Chart as ChartJS,ArcElement,Tooltip,Legend} from 'chart.js';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { loadToys } from '../../store/toy.actions';
import { showErrorMsg, showSuccessMsg } from '../../services/event-bus.service';
import { labels, toyService } from '../../services/toy.service';
import { utilService } from '../../services/util.service';


ChartJS.register(ArcElement, Tooltip, Legend);
  
export function Dashboard(){
    const toys = useSelector((state) => state.toys)

    useEffect(() => {
        loadToys()
          .then(() => { showSuccessMsg('Toys loaded') })
          .catch(err => {
            showErrorMsg('Cannot load toys')
            console.log('Cannot load toys', err)
          })
      }, [])
        
    const labels = toyService.labels
    const inStockToys = toys.filter(toy => toy.inStock)

    const precent = labels.map(label => {
    const filteredToysByLabel = inStockToys.filter(toy => toy.labels.includes(label))
    return  (filteredToysByLabel.length / inStockToys.length) * 100
    })



    const totals = labels.map(label => {
    const filteredToys = toys.filter(toy => toy.labels.includes(label))
    const totalPrice = filteredToys.reduce((sum, toy) => sum + toy.price, 0)
    return totalPrice
    })
    

    const pricesPerLabelData = {
        labels: labels,
        datasets: [
          {
            label:'Prices in dollar',
            data: totals, 
            backgroundColor: labels.map(() => utilService.getRandomColor()),
            borderColor: 'black',
            borderWidth: 1,
          },
        ],
    };
    const inventoryByLabel = {
        labels: labels,
        datasets: [
          {
            label:'presentage',
            data: precent, 
            backgroundColor: labels.map(() => utilService.getRandomColor()),
            borderColor: 'black',
            borderWidth: 1,
          },
        ],
    };
    
    return (
        <section className='dashboard'>
            <h1 className='dashboard-header'>Welcome To Dashboard Pannel</h1>
            <div className='charts'>
                    <div className="chart-container">
                        <label>Prices per label</label>
                        <Doughnut data={pricesPerLabelData} />
                    </div>

                    <div className="chart-container">
                        <label>Inventory by label</label>
                        <Doughnut data={inventoryByLabel} />
                    </div>
            </div>
        </section>

    ) 
}