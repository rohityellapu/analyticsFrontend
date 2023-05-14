import React, { useState } from 'react'

function Filter({ user2, filters, x, setfilters, id, setaddFilters, data, i }) {
    const [filtervalues, setfiltervalues] = useState([])
    const [filterName, setName] = useState('')
    function handleFilter(e) {
        const { value } = e.target;
        setName(value)
        let temp = user2 ? [...data.user2filtered] : [...data.filtered]
        let options = new Set()
        switch (value) {

            case 'browser':
                options.clear()
                for (let record of temp) {
                    options.add(record.browser)
                }
                setfiltervalues([...options])
                break;
            case 'operating_system':
                options.clear()
                for (let record of temp) {
                    options.add(record.operating_system)
                }
                setfiltervalues([...options])
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
                break;
            case 'city':
                options.clear()
                for (let record of temp) {
                    options.add(record.region)
                }
                setfiltervalues([...options])

                break;
            case 'device_category':
                options.clear()
                for (let record of temp) {
                    options.add(record.device_category)
                }
                setfiltervalues([...options])
                break;
            case 'week_start_date':
                options.clear()
                for (let record of temp) {
                    options.add(record.week_start_date)
                }
                setfiltervalues([...options])
                break;
            case 'month_start_date':
                options.clear()
                for (let record of temp) {
                    options.add(record.month_start_date)
                }
                setfiltervalues([...options])
                break;
            case 'quarter_start_date':
                options.clear()
                for (let record of temp) {
                    options.add(record.quarter_start_date)
                }
                setfiltervalues([...options])
                break;
            case 'hour':
                options.clear()
                for (let record of temp) {
                    options.add(record.hour)
                }
                setfiltervalues([...options])
                break;
            case 'channel':
                options.clear()
                for (let record of temp) {
                    options.add(record.channel)
                }
                setfiltervalues([...options])
                break;
            case 'referrer':
                options.clear()
                for (let record of temp) {
                    options.add(record.referrer)
                }
                setfiltervalues([...options])
                break;



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
        <div className='flex justify-between'>
            <div className='flex gap-1 items-center justify-center'>
                <span className='p-1 m-2 px-3'>{ i > 0 ? 'and' : 'where' }</span>
                <select className='w-32 border-[1px] border-gray-300 text-gray-500 rounded-md px-1' name={ `filterName${x}` } onInput={ handleFilter } id="">
                    <option value="" disabled selected>Select...</option>
                    { Object.keys(filters).map(x1 => {
                        return <option value={ x1 }>
                            { x1 }
                        </option>
                    }) }
                </select>
                <span className='p-1 px-3 m-2'>=</span>
                <select className="w-32 border-[1px] border-gray-300 text-gray-500 rounded-md px-1" onInput={ handleFilterValue } name="filer_value" id="">
                    <option value="" disabled selected>Select</option>
                    { filtervalues.map(x => {
                        return <option value={ x }>{ x }</option>
                    }) }
                </select>

            </div>
            <button className='w-10' onClick={ handleDelete }> <img src={ require('../images/delete.png') } alt="" className='h-6 w-6' /></button>
        </div>
    )
}

export default Filter