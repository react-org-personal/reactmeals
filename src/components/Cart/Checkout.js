import { useRef, useState } from "react";

import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
    const [fromValidity, setFormValidity] = useState( {
        name: true,
        street: true,
        city: true,
        postal: true
    })

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const nameIsValid = !isEmpty(enteredName);
    const streetIsValid = !isEmpty(enteredStreet);
    const cityIsValid = !isEmpty(enteredCity);
    const postalIsValid = isFiveChars(enteredPostal);

    setFormValidity({
        name: nameIsValid,
        street: streetIsValid,
        city: cityIsValid,
        postal: postalIsValid
    });

    const formIsValid =
      nameIsValid && streetIsValid && cityIsValid && postalIsValid;

    if(!formIsValid) { return; }

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      postal: enteredPostal,
      city: enteredCity
    })
  };
  const nameClasses = `${classes.control} ${!fromValidity.name && classes.invalid}`;
  const streetClasses = `${classes.control} ${!fromValidity.street && classes.invalid}`;
  const postalClasses = `${classes.control} ${!fromValidity.postal && classes.invalid}`;
  const cityClasses = `${classes.control} ${!fromValidity.city && classes.invalid}`
  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!fromValidity.name && <p>Name field must not be empty!</p>}
      </div>
      <div className={streetClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!fromValidity.street && <p>Street field must not be empty!</p>}
      </div>
      <div className={postalClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalInputRef} />
        {!fromValidity.postal && <p>Name field must be  5 digits long!</p>}
      </div>
      <div className={cityClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!fromValidity.city && <p>City field must not be empty!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
