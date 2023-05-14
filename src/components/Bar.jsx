import React, { useEffect, useState } from 'react'

function Bar({ user2, data, event, isStacked, stacks }) {
    let [clicks, setClicks] = useState(user2 ? [...data.user2filtered] : [...data.filtered]);
    useEffect(() => {
        // For all other events, conversed by home event
        if (event != 'Home') {
            let temp = user2 ? [...data.user2filtered] : [...data.filtered]
            let filtered = temp.filter((x) => {

                return x.event_data != null
            });

            filtered = filtered.filter(x => {
                let y = JSON.parse(x.event_data);
                return y[0].event_name == event
            })

            setClicks([...filtered]);
        }
        else {

            setClicks(user2 ? [...data.user2filtered] : [...data.filtered])
        }

    }, [data])

    return (
        <>
            <section className='w-full'>

                <div className="bar w-full">
                    <div className="rounded-lg flex items-center gap-2 justify-center">
                        <div className="flex flex-col text-xs">
                            <p>{ event }</p>
                            <p>{ clicks.length }{ `(${((clicks.length / (user2 ? data.user2filtered.length : data.filtered.length)) * 100).toFixed(1)}%)` }</p>
                        </div>

                        <div className="bg-[#437EEB] h-16 text-xl font-medium text-blue-100 text-center items-center flex justify-center leading-none rounded-md" style={ { minWidth: `${(clicks.length * 80 / (user2 ? data.user2filtered.length : data.filtered.length)).toFixed(1)}%` } }>

                            { isStacked && stacks.map((stack, i, arr) => {
                                return <div key={ stack[0] } style={ { width: `${stack[2]}%` } } className={ `bg-blue-${(5 - i) + 2}00 h-16 ${i == 0 && 'rounded-l-md'} ${i == arr.length - 1 && 'rounded-r-md'}` } ></div>
                            }) }
                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}

export default Bar