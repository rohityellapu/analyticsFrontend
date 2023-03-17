import React, { useEffect, useState } from 'react'
import Filter from './Filter';

function Sidebar({ setData, data, events, setEvents }) {

    const [filters, setfilters] = useState(
        {
            browser: null,
            operating_system: null,
            device_category: null,
            referrer: null,
            country: null,
            region: null,
            city: null
        }

    )
    const [addFilters, setaddFilters] = useState([])

    function handleInput(e) {

        const { value } = e.target;

        setEvents(prev => (
            { ...prev, [value]: true }
        ))

    }
    function handleDelete(e, event) {


        setEvents(prev => (
            { ...prev, [event]: false }
        ))
    }
    function addFilter() {
        setaddFilters(prev => (
            [...prev, prev.length + 1]
        ))
    }
    useEffect(() => {
        let tempData = [...data.unfiltered]
        console.log(tempData, filters)
        for (let key in filters) {
            console.log(key, filters[key])
            if (!filters[key]) continue;
            else {
                tempData = tempData.filter((x) => {
                    return x[key] == filters[key]
                })
            }
        }
        console.log(tempData)
        setData(prev => (
            { ...prev, filtered: [...tempData] }
        ))
    }, [filters])
    return (
        <div className='basis-1/3 flex h-screen border-r-2 border-gray-300'>
            <section className='basis-1/12 bg-blue-900'></section>
            <section className='basis-11/12  p-4'>
                <div className="users border-b-2 border-gray-300 pb-4">
                    <header className='flex justify-between p-2'>
                        <h1>All Users</h1>
                        <button onClick={ addFilter } className='p-1 px-3 border-[1px] rounded-full border-gray-300'>+ Filter</button>
                    </header>
                    <section className=''>
                        { addFilters.map((x, i) => {
                            return <Filter setfilters={ setfilters } id={ i } setaddFilters={ setaddFilters } key={ x } x={ x } data={ data } filters={ filters } />
                        }) }
                    </section>
                </div>
                <div className="event mt-4 p-2">
                    <h1 className='m-2 text-lg font-semibold'>Events performed in following order</h1>
                    <section className='flex flex-col gap-2'>
                        { Object.keys(events).filter(x => events[x] == true).map((event, i) => (
                            <div className='p-1 m-1 flex justify-between'> <p key={ i }><span className='p-1 m-1 border-[1px] border-gray-200'>Click</span><span className='p-1 m-1 border-[1px] border-gray-200'>{ event }</span></p> <button onClick={ (e) => handleDelete(e, event) }> <img src="https://img.icons8.com/ios-glyphs/256/trash--v3.png" alt="" className='h-6 w-6' /></button></div>

                        )) }
                    </section>
                    <select onInput={ handleInput } name="events" id="cars" className='m-4 p-1 hover:cursor-pointer border-[1px] border-gray-200 px-2 focus:outline-none'>
                        <option value="" selected disabled>Select</option>
                        { Object.keys(events).filter(x => events[x] == false).map((event, i) => (
                            <option key={ i } value={ event }>{ event }</option>
                        )) }

                    </select>

                </div>
            </section>
        </div>
    )
}

export default Sidebar