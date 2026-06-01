import { useState } from "react";
function Counter(){
    const [money,setmoney] = useState(0);
    return(
        <div>
            <h2>{money}</h2>
        <button onClick={() => setmoney(money + 1000) } >
        increase
        </button>
        </div>
    );
}
export default Counter;