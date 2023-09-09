import { createContext, useState } from "react";

const BibleContext = createContext();

const BibleProvider = ({children}) => {
    const [bible,setBible] = useState({book: 'Johana', chapter: 3, verse: 16 });
    //const [bible,setBible] = useState('Johana');
    return (
        <BibleContext.Provider value={{...bible,setBible}}>
            {children}
        </BibleContext.Provider>
    );
}
export {BibleProvider, BibleContext};