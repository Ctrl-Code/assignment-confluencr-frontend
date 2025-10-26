import { useAreaChartData } from "./area-chart-store"

const OldDataPopupContent = (
    {localValues = {}, overwrite, back}:{localValues: {[key:string]: number}, overwrite: ()=>void, back: ()=>void}
) => {
    const oldData = useAreaChartData(state => state.oldData)
    if (oldData)
        return <div className='bg-black border-2 border-solid border-white rounded-lg p-4 w-full'>
                    <h1 className="text-2xl font-bold mb-2 text-super-grey">Do you want to overwrite the values?</h1>
                    <div className="flex flex-col mb-4">
                        {
                            Object.keys(oldData).map(name => <div key={name} className="flex gap-2">
                                <div className="basis-3/5">{name}</div>
                                <div className="basis-1/3">{oldData[name]}</div>
                                <div className="basis-1/3">to</div>
                                <div className="basis-1/3">{localValues[name]}</div>
                            </div>)
                        }
                    </div>
                    <div className="flex justify-end gap-2">
                    <button className="header__cta self-end mb-4 mt-2"
                            onClick={back}>
                                back
                        </button>
                    <button className="header__cta self-end mb-4 mt-2"
                            onClick={overwrite}>
                                overwrite
                        </button>
                    </div>

                    
            {/* {JSON.stringify(oldData)} */}
        </div>
    else
        <div/>
}

export default OldDataPopupContent