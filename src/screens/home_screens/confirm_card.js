import React from "react";


const Confirm_card=()=>{
   const chargeCard=()=> {

        RNPaystack.chargeCardWithAccessCode({
          cardNumber: '4123450131001381', 
          expiryMonth: '10', 
          expiryYear: '17', 
          cvc: '883',
          accessCode: '2p3j42th639duy4'
        })
        .then(response => {
         
        })
        .catch(error => {
         
         
         
        })
        
    }

    return(
        <Text>xzxx</Text>
    )
}

export default Confirm_card