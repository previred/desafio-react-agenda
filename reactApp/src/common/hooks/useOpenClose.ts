import { useState } from "react"

//Creamos hook reutilizable para no repetir los handleOpen, handleClose y nos puede servir para Drawer, Modals, etc.
export const useOpenClose = (initialState: boolean) => {
    const [opened, setOpened] = useState<boolean>(initialState)

    const handleClose = () => {
        setOpened(false)
    }

    const handleOpen = () => {
        setOpened(true)
    }

    return {
        opened,
        handleOpen,
        handleClose
    }
}