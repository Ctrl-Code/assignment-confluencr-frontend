import { create } from 'zustand'

const defaultValues = [
        {
            name: 'Content',
            amt: 70,
        },
        {
            name: 'Emotional',
            amt: 50,
        },
        {
            name: 'Performance',
            amt: 80,
        },
        {
            name: 'Predictive',
            amt: 30,
        },
        {
            name: 'Cross-channel',
            amt: 90,
        },
    ];

type OldDataType = {[key: string]: number} | null

type AreaChartDataType = {
    email: string;
    data: typeof defaultValues;
    oldData: OldDataType;
    setOldData: (oldData: OldDataType ) => void;
    setEmail: (newEmail: string) => void;
    setCustomValues: (newData: typeof defaultValues) => void;
    resetValues: () => void;
}

export const useAreaChartData = create<AreaChartDataType>((set) => ({
    email: '',
    data: defaultValues,
    oldData: null,
    setOldData: (oldData: OldDataType) => set(()=>({oldData})),
    setEmail: (newEmail: string) => set(() => ({ email: newEmail })),
    setCustomValues: (newData: typeof defaultValues) => set(() => ({ data: newData })),
    resetValues: () => set(() => ({ data: defaultValues })),
}))