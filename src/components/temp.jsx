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

import React, { useState } from 'react'
import PostTime from './PostTime'
import Bar from './Bar'

function Main({ user2data, loading, setApi, api, user2events, exportToCsv }) {
    const [computed, setcomputed] = useState((new Date()).getTime())
    function handleToggle(e) {
        if (e.target.innerText == 'Today') {
            setApi('http://localhost:3005?past=1')
        }
        else if (e.target.innerText == '7D') {
            setApi('http://localhost:3005?past=7')
        }
        else if (e.target.innerText == '3M') {
            setApi('http://localhost:3005?past=90')
        }
        else if (e.target.innerText == '6M') {
            setApi('http://localhost:3005?past=180')
        }
        else {
            setApi('http://localhost:3005?past=30')
        }
        setcomputed((new Date()).getTime())
    }

    return (
        <div className='basis-2/3 p-3'>
            <section className='pl-8'>

                <h1 className='text-xl font-bold p-1 pb-0'>Untitled funnel</h1>
                <p className='text-sm p-1'>No description</p>
            </section>
            <section className='flex justify-between items-center p-4 m-4 text-md shadow-lg shadow-gray-400 border-gray-300 rounded-lg border-[1px]'>
                <div className="filter border-[1px] border-gray-400 border-opacity-75 rounded-md">
                    <button className='border-r-[1px] p-1 border-gray-400 px-2'>Custom</button>
                    <button onClick={ handleToggle } style={ { background: `${api[api.length - 1] == '1' ? 'skyblue' : 'white'}` } } className='border-r-[1px] border-gray-400 px-2 p-1'>Today</button>
                    <button onClick={ handleToggle } style={ { background: `${api[api.length - 1] == '7' ? 'skyblue' : 'white'}` } } className='border-r-[1px] border-gray-400 px-2 p-1'>7D</button>
                    <button onClick={ handleToggle } style={ { background: `${api[api.length - 2] == '3' ? 'skyblue' : 'white'}` } } className='border-r-[1px] border-gray-400 px-2 p-1'>30D</button>
                    <button onClick={ handleToggle } style={ { background: `${api[api.length - 2] == '9' ? 'skyblue' : 'white'}` } } className='border-r-[1px] border-gray-400 px-2 p-1'>3M</button>
                    <button onClick={ handleToggle } style={ { background: `${api[api.length - 2] == '8' ? 'skyblue' : 'white'}` } } className='px-2 p-1'>6M</button>
                </div>
                <div className="refresh flex gap-2 items-center justify-center">
                    <button onClick={ handleToggle } className='flex items-center bg-blue-900 text-white p-1 px-3 rounded-full hover:saturate-150 gap-1 active:scale-95'> <img src={ require('../images/refresh.png') } className='h-3 w-3' alt="" /> Refresh</button>
                    <p className='text-sm'>Computed <PostTime date={ computed } /></p>
                </div>
            </section>
            { loading && <div className='w-full flex items-center justify-center p-5'>
                <img className='h-12 w-12' src={ require('../images/loading.gif') } alt="" />
            </div> }

            <div className='p-4 m-4 text-md shadow-lg shadow-gray-400 border-gray-300 rounded-lg border-[1px]'>
                <p className='m-2 p-1 rounded-md px-3 bg-blue-900 text-white w-fit'>Bar</p>
                { Object.keys(user2events).filter(x => user2events[x] == true).length == 0 && <p>Select an Event to show Data.</p> }
                <div className='flex flex-col gap-2 justify-between items-center'>


                    { Object.keys(user2events).filter(x => user2events[x] == true).map((event, i) => {
                        return <Bar data={ user2data } key={ event + i } event={ event } />
                    }) }
                </div>
            </div>
            <div className='p-4 m-4 text-md shadow-lg shadow-gray-400 border-gray-300 rounded-lg border-[1px]'>
                <button onClick={ exportToCsv } className='flex gap-1 items-center hover:scale-105 active:scale-95 duration-500'> <img src="https://img.icons8.com/external-regular-kawalan-studio/256/external-export-arrows-regular-kawalan-studio.png" className='
                h-5 w-5' alt="" /> Export to CSV</button>
            </div>

        </div>
    )
}

import React, { useState } from 'react'

function Filter({ filters, x, setfilters, id, setaddFilters, data }) {
    const [filtervalues, setfiltervalues] = useState(['Chrome', 'Safari'])
    const [filterName, setName] = useState('')
    function handleFilter(e) {
        const { value } = e.target;
        setName(value)
        let temp = [...data.filtered]
        let options = new Set()
        switch (value) {

            case 'browser':
                setfiltervalues(['Chrome', 'Safari', 'Firefox']);
                break;
            case 'operating_system':
                setfiltervalues(['iPhone', 'Windows', 'Linux', 'Macintosh', 'X11', 'Android 12'])
                break;
            case 'country':
                options.clear()
                for (let record of temp) {
                    options.add(record.country)
                }
                setfiltervalues([...options])

                break;
            case 'region':

                options.clear()
                for (let record of temp) {
                    options.add(record.region)
                }
                setfiltervalues([...options])
                // if (filters['country']) {

                // }
                // setfiltervalues(['Telangana', 'Maharashtra','Tamil Nadu', 'Andhra Pradesh'])
                break;
            case 'city':
                options.clear()
                for (let record of temp) {
                    options.add(record.region)
                }
                setfiltervalues([...options])
                // setfiltervalues(['Bengaluru', 'Hyderabad', 'Mumbai', 'Kolkata'])
                break;
            case 'device_category':
                setfiltervalues(['Desktop', 'Mobile'])

        }
        e.target.disabled = true
    }
    function handleFilterValue(e) {
        const { value } = e.target;
        setfilters(prev => (
            { ...prev, [filterName]: value }
        ))
        e.target.disabled = true
    }
    function handleDelete() {
        setfilters(prev => (
            { ...prev, [filterName]: null }
        ))
        setaddFilters(prev => {
            let temp = [...prev];
            temp.splice(id, 1);
            return temp;
        })
    }
    return (
        <div className='flex gap-1 items-center justify-between'>
            <span className='p-1 m-2 px-3 border-[1px] border-gray-200'>Where</span>
            <select className='w-20' name={ `filterName${x}` } onInput={ handleFilter } id="">
                <option value="" disabled selected>Select</option>
                { Object.keys(filters).map(x1 => {
                    return <option value={ x1 }>
                        { x1 }
                    </option>
                }) }
            </select>
            <span className='p-1 px-3 m-2 border-[1px] border-gray-200'>=</span>
            <select className="w-20" onInput={ handleFilterValue } name="filer_value" id="">
                <option value="" disabled selected>Select</option>
                { filtervalues.map(x => {
                    return <option value={ x }>{ x }</option>
                }) }
            </select>
            <button className='w-10' onClick={ handleDelete }> <img src="https://img.icons8.com/ios-glyphs/256/trash--v3.png" alt="" className='h-6 w-6' /></button>
        </div>
    )
}

export default Filter
