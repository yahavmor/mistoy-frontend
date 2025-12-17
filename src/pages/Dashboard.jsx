import { Doughnut, Line } from 'react-chartjs-2'
import {Chart as ChartJS,ArcElement,Tooltip,Legend,LineElement,PointElement,CategoryScale,LinearScale,Filler} from 'chart.js'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { loadToys } from '../../store/toy.actions'
import { toyService } from '../../services/toy.service'
import { utilService } from '../../services/util.service'

ChartJS.register(ArcElement,Tooltip,Legend,LineElement,PointElement,CategoryScale,LinearScale,Filler)

export function Dashboard() {
  const toys = useSelector(state => state.toys)
  const labels = toyService.labels

  const inStockToys = toys.filter(toy => toy.inStock)

  const percent = labels.map(label => {
    const count = inStockToys.filter(toy => toy.labels.includes(label)).length
    return (count / inStockToys.length) * 100
  })

  const totals = labels.map(label => {
    const filtered = toys.filter(toy => toy.labels.includes(label))
    return filtered.reduce((sum, toy) => sum + toy.price, 0)
  })

  useEffect(() => {
    loadToys()
  }, [])

  const pricesPerLabelData = {
    labels,
    datasets: [
      {
        label: 'Prices in dollar',
        data: totals,
        backgroundColor: labels.map(() => utilService.getRandomColor()),
        borderColor: 'black',
        borderWidth: 1
      }
    ]
  }

  const inventoryByLabel = {
    labels,
    datasets: [
      {
        label: 'Percentage',
        data: percent,
        backgroundColor: labels.map(() => utilService.getRandomColor()),
        borderColor: 'black',
        borderWidth: 1
      }
    ]
  }

  const lineData = {
    labels,
    datasets: [
      {
        label: 'Toy Sales',
        data: totals,
        borderColor: utilService.getRandomColor(),
        backgroundColor: 'transparent',
        tension: 0.4,
        fill: true
      }
    ]
  }

  return (
    <section className="dashboard">
      <h1 className="dashboard-header">Welcome To Dashboard Panel</h1>

      <div className="charts">
        <div className="chart-container">
          <label>Prices per label</label>
          <Doughnut data={pricesPerLabelData} />
        </div>

        <div className="chart-container">
          <label>Inventory by label</label>
          <Doughnut data={inventoryByLabel} />
        </div>
      </div>

      <div className="line-chart">
        <label>Price per label</label>
        <Line data={lineData} />
      </div>
    </section>
  )
}
