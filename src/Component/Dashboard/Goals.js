
import React, { useState, useContext, useEffect } from 'react';
import toast from "react-hot-toast";
import { AppContext } from '../../context/AppContext';
import { Sidebar } from './Sidebar';
import { AutoComplete } from 'antd';
import { Select } from 'antd';


export const Goals = () => {
    const { URL, user, setHeartedTags, setLikedItems, APP_NAME, setTitle, keywords, heartedTags, style, setStyle } = useContext(AppContext);
    const [isLoading, setIsLoading] = useState(true);
    const [values, setValues] = useState([]);

    useEffect(() => {
        setTitle(`Liked${APP_NAME}`);
        fetch(`${URL}api/web/react-items?user_id=${user ? user.data.id : ""}&user_token=${user.data.user_token}&type=like`)
            .then((response) => response.json())
            .then((actualData) => { setLikedItems(actualData); setIsLoading(false) })
        setIsLoading(false)

    }, []);


    const handleSubmit = () => {
        var data = { user_id: user.data.user_token, values: values };
        console.log(data);
        fetch(`${URL}api/web/goals`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json()).then(json => {
            console.log(json);
            if (json.success) {
                toast.success(json.message);
                fetch(`${URL}api/web/getgoals`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ user_token: user.data.user_token })
                })
                    .then((response) => response.json())
                    .then((actualData) => { setHeartedTags(JSON.parse(actualData[0].keywords)); })
            }
        }).catch(err => {
            toast.error("Something went wrong!");
            console.log(err);
        })

    }



    return (
        <div>
            <div className="container-fluid px-0">
                <div className="row">

                    <div className="col-xl-3 col-lg-3 col-md-4 col-2"><Sidebar pageid={'goals'} /></div>

                    <div className="col-xl-9 col-lg-9 col-md-8 col-10 ps-md-0" >
                        <div className='row w-100 mx-0 px-0'>
                            <div className="col-12 mx-0 px-0 text-center">
                                <div class="container-fluid">
                                    <div class="row shadow-sm">
                                        <div class="col-md-12 py-3">
                                            <div className="d-flex justify-content-between">
                                                <h1 class="text-uppercase text-black m-0">Like</h1>

                                                <div>
                                                    {/* <Segmented
                                                        onChange={(e) => dispatch(setStyle(e))}
                                                        defaultValue={style}
                                                        options={[
                                                            {
                                                                value: 'List',
                                                                icon: <BarsOutlined />,
                                                            },
                                                            {
                                                                value: 'Kanban',
                                                                icon: <AppstoreOutlined />,
                                                            },
                                                        ]}
                                                    /> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="itemz mt-3">
                                    <div className="row">
                                        <div className="col-12">

                                            <div class="wrapper mx-auto pt-3">
                                                <div >

                                                    {/* <AutoComplete
                                                        style={{ width: 200 }}
                                                        options={options}
                                                        placeholder="try to type `b`"
                                                        filterOption={(inputValue, option) =>
                                                            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                                        }


                                                    /> */}
                                                    {heartedTags.length != 0

                                                        ?

                                                        <Select
                                                            mode="multiple"
                                                            allowClear
                                                            style={{ width: '100%' }}
                                                            placeholder="Please select"
                                                            defaultValue={heartedTags}
                                                            onChange={(e) => setValues(e)}
                                                            options={keywords ? keywords : []}
                                                        />


                                                        :


                                                        <Select
                                                            mode="multiple"
                                                            allowClear
                                                            style={{ width: '100%' }}
                                                            placeholder="Please select"
                                                            defaultValue={[]}
                                                            onChange={(e) => setValues(e)}
                                                            options={keywords ? keywords : []}
                                                        />



                                                    }


                                                    <div class="btn-group">
                                                        <button type="submit" class="btn submit" onClick={handleSubmit}>Submit</button>
                                                        <button class="btn cancel">Reset</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
