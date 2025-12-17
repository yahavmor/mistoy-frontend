export function ToyPreview({toy}) {
    const inStock = toy.inStock? 'in-stock': 'sold-out'
    return (
        <article className="toy-preview">
            <h2 className="toy-name">{toy.name}</h2>
            <img className="toy-image" src={toy.imgUrl} alt="image of the toy" />
            <h5 className="toy-price">Price:{toy.price}</h5>
            <h3 className={inStock}>{inStock}</h3>
            <div className="toy-labels">
            {toy.labels.map(label => (
                <p key={label}>{label}</p>
            ))}
            </div>

        </article>
    )   
}
