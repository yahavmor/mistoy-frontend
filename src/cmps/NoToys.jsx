export function NoToys() {
  return (
    <div className="no-toys-container">
      <h2 className="no-toys-title">No Toys Found</h2>
      <p className="no-toys-text">Looks like your toy box is empty...</p>
      <div className="no-toys-ghost">
        <img src="logo.png"></img>
      </div>
    </div>
  )
}
