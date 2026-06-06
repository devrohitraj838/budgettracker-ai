function Card(props){
    return(
        <div className="card">
            <h3>{props.title}</h3>
            <p>{props.amount}</p>
        </div>
    );
}
export default Card;