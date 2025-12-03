export function ToyPreview({toy}) {
    const inStock = toy.inStock? 'In stock': 'Sold out'
    return (
        <article className="toy-preview">
            <h4>Toy : {toy.name}</h4>
            <img className="toy-image" src={toy.imgUrl} alt="image of the toy" />
            <h5>Price : {toy.price}</h5>
            <h6>{inStock}</h6>
        </article>
    )   
}
