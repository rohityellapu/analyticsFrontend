import React, { useEffect, useState } from 'react'

function Bar({ data, event }) {
    let [clicks, setClicks] = useState([...data.filtered]);
    useEffect(() => {
        console.log(event);
        if (event != 'Home') {
            let temp = [...data.filtered]
            let filtered = temp.filter((x) => {

                return x.event_data != null
            });
            filtered = filtered.filter(x => {
                let y = JSON.parse(x.event_data);
                return y[0].event_name == event
            })
            setClicks(filtered);
        }
        else {
            setClicks([...data.filtered])
        }
    }, [data])

    return (
        <>
            <section className='m-2 w-full'>

                <div className="bar">
                    <div className="w-full rounded-lg flex items-center gap-2 justify-center">
                        <div className="flex flex-col p-1">
                            <p>{ event }</p>
                            <p>{ clicks.length }{ `(${((clicks.length / data.filtered.length) * 100).toFixed(1)}%)` }</p>
                        </div>

                        <div className="bg-blue-900 h-16  text-xl font-medium text-blue-100 text-center items-center flex justify-center leading-none rounded-lg w-1" style={ { minWidth: `${(clicks.length * 80 / data.filtered.length).toFixed(1)}%` } }></div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Bar