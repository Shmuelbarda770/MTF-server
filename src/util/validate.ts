
export function validateId(id:number) {
    return Number.isInteger(id) && id > 0;
  }
  

  export function validateName(name:string) {
    const nameRegex = /^[A-Za-zא-ת]+$/; 
    return nameRegex.test(name) && name.length >= 2 && name.length <= 50;
  }
  
  export function validateGmail(gmail:string) {
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return gmailRegex.test(gmail);
  }
  
 
  export function validateRole(role:string, validRoles:string) {
    return validRoles.includes(role);
  }
  
  
  export function validatePhoneNumber(phoneNumber:string) {
    const phoneRegex = /^\d{10}$/; 
    return phoneRegex.test(phoneNumber);
  }
  