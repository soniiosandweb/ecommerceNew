import { useEffect, useState } from "react";
import "./Payment.css";
import GooglePayButtonComponent from "../../Components/PaymentGateways/GooglePayButtonComponent";
import RazorpayButton from "../../Components/PaymentGateways/RazorPayButton";
import PhonePayButton from "../../Components/PaymentGateways/PhonePayButton";
import { useSelector } from "react-redux";

const Payment = () => {

    const { user } = useSelector((state) => state.user);

    const [amount, setAmount] = useState(500);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    

    useEffect(() => {
        if(user) {
            setFirstName(user.name);
            setEmail(user.email);
        }
    }, [user])

        return(
            <div className="root_form">
                <div className='form_section'>
                    <div className='form_row'>
                        <div className='form_col'>
                            <label htmlFor='firstname'>First Name:</label>
                            <input type='text' className='form-control' name='firstname' id='firstname' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        </div>
                        <div className='form_col'>
                            <label htmlFor='lastname'>Last Name:</label>
                            <input type='text' className='form-control' name='lastname' id='lastname' value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        </div>
                        <div className='form_col'>
                            <label htmlFor='emailaddress'>Email:</label>
                            <input type='email' className='form-control' name='emailaddress' id='emailaddress' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className='form_col'>
                            <label htmlFor='amount'>Amount:</label>
                            <input type='number' className='form-control' name='amount' id='amount' value={amount} onChange={(e) => setAmount(e.target.value)} />
                        </div>
                        <div className='form_col payment_buttons'>
                            <p>Payment Method:</p>
                            <GooglePayButtonComponent amount={parseFloat(amount)} />
    
                            <RazorpayButton amount={parseFloat(amount)} />
    
                            <PhonePayButton amount={parseFloat(amount)} />
                        </div>
                    </div>
                </div>
            </div>    
        )
}

export default Payment