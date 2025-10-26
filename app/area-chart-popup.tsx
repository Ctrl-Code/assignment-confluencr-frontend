'use client';

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useAreaChartData } from './area-chart-store';
import { useEffect, useState } from 'react';
import OldDataPopupContent from './old-data-popup';
import { supabase } from './supabase';
import { deleteRowForEmail } from './db-queries';

const validateEmail = (email: string) => {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}

const AreaChartPopup = () => {
    const data = useAreaChartData(state => state.data);
    const setCustomValues = useAreaChartData(state => state.setCustomValues);
    const resetValues = useAreaChartData(state => state.resetValues);
    const storeEmail = useAreaChartData(state => state.email);
    const setStoreEmail = useAreaChartData(state => state.setEmail);
    const setOldData = useAreaChartData(state => state.setOldData);
    const oldData = useAreaChartData(state => state.oldData)
    const [message, setMessage] = useState('')

    const [open, setOpen] = useState(false);
    const [localEmail, setLocalEmail] = useState(storeEmail);
    const [error, setError] = useState(false);

    const [state, setState] = useState<{[key: string]: number}>(() => {
        let initialState: {[key: string]: number} = {};
        data.forEach(item => {
            initialState[item.name] = item.amt;
        });
        return initialState;
    });

    useEffect(() => {
        console.log("State changed: ", state);
    },[state]);

    const clearMessage = ()=> setTimeout(()=>setMessage(''), 3000)

    // temp
    // useEffect(()=>{
        // deleteRowForEmail('')
    // },[])

    const checkAlreadyAvailableData = async (email: string) => {
        const { data, error } = await supabase
        .from('emails_table')
        .select('*')
        .eq('email', email);
        
        if (error) {
            console.error(error);
            alert('Error fetching data');
            return null
        } else {
            let parsed_json = null
            console.log("existing data bro main",data)
            // setState(data);
            try{
                if (data.length){
                    const data_json = data[0].data_json
                    if(data_json)
                        parsed_json = JSON.parse(data_json).areaChart
                }
            }
            catch(err){
                alert('error occured. see logs')
                console.log(err)
            }
            return parsed_json
        }
    }

    const insert = async () => {
        const { error } = await supabase
                .from('emails_table')
                .insert([{ email: localEmail, data_json: JSON.stringify({areaChart: state}) }]);
                if (error) {
                    console.error('Error:', error);
                    setMessage('error')
                    clearMessage()
                }
                else{
                    setMessage('success')
                    clearMessage()
                }
    }

    const overwrite = async() => {
        const { error } = await supabase
                .from('emails_table')
                .update({ data_json: JSON.stringify({areaChart: state}) })
                .eq('email',localEmail)

                if (error) {
                    console.error('Error:', error);
                    setMessage('error')
                    clearMessage()
                }
                else{
                    setMessage('success')
                    clearMessage()
                    setOldData(null)
                }
    }

    const save = async () => {
        const isEmailValid = validateEmail(localEmail);
        if (!isEmailValid) {
            setError(true);
            return;
        }
        setStoreEmail(localEmail);
        const order = data.map(item=> item.name);
        const updatedData = order.map(name => ({ name, amt: state[name] || 0 }));
        setCustomValues(updatedData);
        console.log("to save data for email:", localEmail, updatedData);

        try {
            const existingData = await checkAlreadyAvailableData(localEmail) ?? []
            console.log('existing data',existingData)
            const dataExists = typeof existingData === 'object' && Object.keys(existingData).length === 5
            if(dataExists){
                setOldData(existingData as any)
                return
            }
            else
                insert()
        }
        catch (err) {
            console.error(err);
            alert('Some error occured');
        }
    }

    const getClassName = ()=>{
        if (message === 'success')
            return 'text-green-500'
        else if (message === 'error')
            return 'text-red-500'
        else
            return ''
    }

    return (
        <Popup open={open} trigger={<button className="header__cta self-end" onClick={()=> setOpen(!open)}>Edit Values</button>} modal>
            {
                oldData ? (
                    <OldDataPopupContent
                        localValues={state}
                        back={()=>setOldData(null)}
                        overwrite={overwrite}
                    />
                ) : (
                    <div className='bg-black border-2 border-solid border-white rounded-lg p-4'>
                        <h1 className="text-2xl font-bold mb-2 text-super-grey">Enter Custom Values</h1>
                        <div className='flex-col w-full'>
                            {data.map((item) =>
                                <div className='flex w-full gap-2 items-center' key={item.name}>
                                    <label htmlFor={item.name} className='basis-1/2 text-super-grey'>{item.name}: </label>
                                    <input
                                        className='basis-1/2 box-border border rounded mx-1 my-1 text-super-grey outline-none'
                                        type="number"
                                        id={item.name}
                                        name={item.name}
                                        defaultValue={item.amt}
                                        onChange={(e) => {
                                            setState(prevState => ({
                                                ...prevState,
                                                [item.name]: parseInt(e.target.value, 10)
                                            }))
                                            // const newAmt = parseInt(e.target.value, 10);
                                            // const newData = data.map(d => d.name === item.name ? { ...d, amt: newAmt } : d);
                                            // setCustomValues(newData);
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                        <div className='flex flex-col mt-4'>
                            <div className='text-super-grey'>Enter Email Address <span className='text-red-500'>*</span></div>
                            <input
                                className='box-border border rounded mx-1 px-1 my-1 text-super-grey outline-none'
                                type="email"
                                id="email"
                                name="email"
                                placeholder="email"
                                value={localEmail}
                                onChange={(e)=>{
                                    setError(false);
                                    setLocalEmail(e.target.value)
                                }}
                            />
                        {error && <p className='text-red-500'>Please check email</p>}
                        </div>
                        <button
                            className={error ? "header__cta__disabled bg-silver-300 cursor-disabled" : "header__cta self-end mb-4 mt-2"}
                            disabled={error}
                            onClick={save}>
                                Save Values
                        </button>
                        {message && <p className={getClassName()}>{message}</p>}
                    </div>
                )
            }
        </Popup>
    )
};

export default AreaChartPopup;