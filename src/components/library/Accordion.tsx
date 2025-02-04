import { ReactNode, useState } from "react";

import caret from 'assets/caret-icon.svg'

import { ReactComponent as Caret } from 'assets/caret-icon.svg'

import './Accordion.css'

type AccordionProps = {
    accordionDetails: ReactNode;
    children: ReactNode;
}
const Accordion = ( { accordionDetails, children } : AccordionProps ) => {

    const [ isOpen, toggleOpen ] = useState<boolean>(false);

    const handleCaretClick = () => {
        toggleOpen( !isOpen );
    }

    
    return(
        <div className="accordion">
            <div>
                { accordionDetails }
            </div>
            <div className="accordion-caret-container">
                <a href="#." role="button" className="caret" onClick={ handleCaretClick }>
                    <Caret style={{fill: "#000"}} className={ isOpen ? 'is-open' : '' }/>
                </a>
            </div>
            { isOpen && 
                <div className="accordion-open-content">
                    { children }
                </div>
            }
        </div>
    )
}

export default Accordion