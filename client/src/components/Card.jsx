function Card(props) {
  return (
    <div className="card">
      <h3>{props.title}</h3>

      <p className={props.amount < 0 ? "negative" : ""}>
        {props.isMoney ? `₹${props.amount}` : props.amount}
      </p>
    </div>
  );
}

export default Card;