import {FC, ReactElement, useState} from "react"

interface AppProps {
    total: number
}

const App: FC<AppProps> = ({ total }) : ReactElement => {
    const [count, setCount] = useState(total)
    return (
        <div>
            <h1>React + ts is working {count}</h1>
            <button onClick={() => setCount(count => count+1)}>
                +1
            </button>
        </div>
    )
}

export default App
