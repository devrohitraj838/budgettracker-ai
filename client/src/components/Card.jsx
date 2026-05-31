function Card(props){
    return(
        <div>
            <h3>{props.title}</h3>
            <p>{props.amount}</p>
        </div>
    );
}
export default Card;