const getAppointments = async () : Promise<any> => {

    try {
  
      const response = await fetch(`${window.location.protocol}//${window.location.hostname}:${process.env.REACT_APP_SERVERPORT}/appointments`);
  
      const data = await response.json();
      
      return data
      
    } catch ( e ) {
      throw new Error( 'Error fetching appointments')
    }
  
  };
  
  export { getAppointments };
  