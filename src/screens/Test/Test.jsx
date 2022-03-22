import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { test_data } from '../../redux/consts';

const Test = () => {

    let dispatch = useDispatch()
    let initial = useSelector((s) => s.test_data.initial);

    useEffect(() => {
        console.log(initial, "initial")
    }, [initial])

    useEffect(() => {
        dispatch({
            type: test_data,
            payLoad: {
                initial: {
                    id: '1',
                    name: 'john',
                    email: 'john@john.com',
                },
            },
        });
    }, [dispatch])

    return (
        <div>Test</div>
    )
}

export default Test