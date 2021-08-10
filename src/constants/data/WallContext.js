import React, { createContext } from 'react'

export const WallContext = createContext({
    loading: false,
    setLoading: () => { }
})

export default WallContext

export const MgsProvider = (children) => {
    return <WallContext.Provider value={children} />
}