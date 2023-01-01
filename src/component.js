function Col(props){
    return(
    <div class="col">
        <img src={props.url} width='80%'/>
        <h4>{props.title}</h4>
        <p>{props.price}</p>
    </div>
    );
}

export default Col;