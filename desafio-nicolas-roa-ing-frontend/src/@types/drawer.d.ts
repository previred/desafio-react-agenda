/*
    Type del drawer context el cual si requerimos debe cumplir con esta estructura de props
*/

export interface DrawerContextProps {
    isOpen: boolean;
    showDrawer: () => void;
    hideDrawer: () => void;
}