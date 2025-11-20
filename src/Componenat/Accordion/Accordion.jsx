import { useEffect, useState } from 'react';
import FAQ from './fac.json';
import './Accordion.css'

function Accordion() {
    const [data, setData] = useState([]);
    const [activId, setActiveId] = useState(false);


    useEffect(() => {
        setData(FAQ)
    }, []);

    const handleButton = (id) => {
        setActiveId((prevId) => (prevId === id ? false : id));
    }

    return (
        <>
            <h1 className="accordion-title">The Accordion</h1>
            <ul className="accordion-container">
                {data.map((curEle) => {
                    const isActive = curEle.id === activId;
                    return (
                        <li key={curEle.id} className="accordion-item">
                            <div className="accordion-grid">
                                <strong className="accordion-question">{curEle.question}</strong>
                                <button
                                    onClick={() => handleButton(curEle.id)}
                                    className={`accordion-btn ${isActive ? "active-btn" : ""}`}
                                >
                                    {isActive ? "Close" : "Show"}
                                </button>
                            </div>
                            {isActive && <p className="accordion-answer">{curEle.answer}</p>}
                        </li>
                    );
                })}
            </ul>

        </>
    )
}

export default Accordion 
