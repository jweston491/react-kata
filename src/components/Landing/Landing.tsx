import { useEffect, useState } from 'react'

// Trying this game me the following error: " Parsing error: ',' expected "
// import { type Service } from 'server';

import { getServices } from 'utils/services';
import { getAppointments } from 'utils/appointments';

import { formatDateTime } from 'utils/helpers';

import { heading, intro } from "copy/landing";

import detail from 'assets/detail-icon.svg'
import oilChange from 'assets/oil-change-icon.svg'
import tires from 'assets/tires-icon.svg'

import Button from 'components/library/Button'
import Accordion from 'components/library/Accordion'


import "./Landing.css";

import logo from "assets/logo.png"

import './Landing.css'

/**
 * I did not want to repeat type definitions here, but I did not want lose a bunch of time troubleshooting TypeScript import issues.
 */
type Service = {
  id: number;
  name: string;
  duration: number;
};

type Appointment = {
  id: string;
  serviceName: string;
  serviceId: number;
  start: string;
  duration: number;
  booked: boolean;
  email?: string;
  customerName?: string;
  modelYear?: number;
  make?: string;
  model?: string;
};

const Landing = () => {

  // Since both wireframes have "/scheduler" in the URL, I'm interpreting that you want to keep both designs on the same page. In a real world scenario, I'd clarify if this is the case.
  const [hasStarted, setHasStarted] = useState<boolean>(false)

  const [serviceData, setServiceData] = useState<Service[]>([])
  const [appointmentData, setAppointmentData] = useState<Appointment[]>([])

  const getServiceIcon = ( id: number | undefined ) : string|undefined => {
    switch( id ) {
      case 1:
        return oilChange
      case 4:
        return detail
      
      // Use tires icon as generic service icon
      default: 
        return tires

    }
  }

  const handleBooking = () => console.log( 'This begins the booking process')

  useEffect( () => {

    if (!hasStarted) return;

    const handleFetchServices = async () => {
      
      let appointments: Appointment[]

      try {
        appointments = await getAppointments()

        if ( appointments && appointments.length > 0 ) {
          // todo: Filter services that are available within appointments
          setAppointmentData( appointments )
        } else {
          setAppointmentData([])
        }
      } catch( e ) {
        setAppointmentData([])
      }
      
    } 
    handleFetchServices()
  }, [hasStarted])

  const Contact = () => <p style={{ fontSize: '0.8rem'}}>Want to get in touch? Contact us at <a href="mailto:supportbutton@driveway.com">supportbutton@driveway.com</a> or 555-872-3289</p>

  return (
    <div className="splash">
      { !hasStarted && (
        <>
          <h1>{heading}</h1>
          <img src={  logo } alt="Lithia & Driveway Logo" /> 
          <p>{ intro }</p>

          <Button 
            onClick={ () => setHasStarted(true)}
            aria-label="Schedule a service" 
            className="schedule-cta"
            >Get Started</Button>
        </>
      )}

      { hasStarted && (
        <>
          <h1>Select a Service</h1>
          { appointmentData.length > 0 &&
            // Was unsure based on wireframe if Brake Inspection should be excluded. Based on my interpretation of requirements, I kept it.

            // Get unique service names
            Array.from(new Set( appointmentData.map( appointment => appointment.serviceName )))
            .map( ( service ) => {
              
              // Store serviceId as local variable
              const serviceId = appointmentData.find( appointment => appointment.serviceName === service )?.serviceId
              return(
                <Accordion
                  accordionDetails={
                    <div className='service'>
                    <div>
                      <img src={ getServiceIcon( serviceId ) } alt="" />
                    </div>
                    <div>
                      <h2 className='accordion-title'>
                        { service }
                      </h2>
                    </div>
                  </div>
                  }
                >
                  <form className="service-list">
                    { 
                      // Sort appointments by date
                      appointmentData.sort(
                        (a, b) => {
                          return new Date(a.start).getTime() - new Date(b.start).getTime()
                        }
                      )
                      // Filter available appointments by service
                      .filter( appointment => appointment.serviceId === serviceId)
                      .map( serviceAppointment => {
                        return (
                          <div style={{ textAlign: 'left'}}>
                            <input id={ serviceAppointment.id } type="radio" value={serviceAppointment.start} name={ serviceAppointment.serviceName } />
                            <label htmlFor={ serviceAppointment.id } >{ formatDateTime( serviceAppointment.start ) }</label>
                          </div>
                          
                        )
                      })
                    }
                  </form>
                  <div className="book-service">
                    {/**
                     * Because of both time considerations (thank you for seeing me on short notice!) and lack of wireframe, I wasn't sure how to approach the screen for submitting the booking form. I'm happy to discuss potential approaches during the interview. Thank you again!
                     */}
                    <Button 
                      onClick={ handleBooking }
                      >Book Now</Button>
                  </div>
                </Accordion>)
            })
          }
          { ( appointmentData.length === 0 || !appointmentData ) &&
            <>
              <p>No appointments available</p>
            </>
            
          }

        </>

      )}
      <Contact />
    </div>

  );
};

export default Landing;


/**
 * I started the project using styled-components, then began running into type errors after restarting the dev server. Rather than troubleshoot TypeScript, I decided to just go the more traditional CSS route. But I'm leaving this here to demonstrate that I know what styled components are.
 */
// const Logo = styled.img`
//   max-width: 25rem;
//   display: block;
//   width: 100%;
//   margin: auto;
// `

// const Intro = styled.h1`
//   margin: auto;
//   text-align:center;
// `
