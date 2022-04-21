import { createContext, useState } from 'react'

export const PlayerContext = createContext()

export const PlayerProvider = ({ children }) => {
    const [isActive, setIsActive] = useState(true)

    return (
        <PlayerContext.Provider
            value={{
                isActive
            }}
            children={children}
        />
    )
}