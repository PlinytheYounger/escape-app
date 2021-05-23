
export default function Input(props) {
   let inputElement = null;
   const inputClasses = ['inputElement'];

   if(props.invalid && props.shouldValidate && props.touched) {
       inputClasses.push("Invalid");
   }
 
   switch ( props.elementType ) {
       case ('input'):
           inputElement = <input {...props.elementConfig} value={props.value} onChange={props.changed} className={inputClasses.join(', ')}/>;
           break;
       case ('textarea'):
           inputElement = <input {...props.elementConfig} value={props.value} onChange={props.changed} className={inputClasses.join(', ')}/>;
           break;
       default:
           inputElement = <input {...props.elementConfig} value={props.value} onChange={props.changed} className={inputClasses.join(', ')}/>;
   }

   // TODO: add class for error message
   let validationError = null;
   if(props.invalid && props.touched) {
       validationError = <p>Please enter a valid {props.elementConfig.name}</p>
   }

    return(
        <div className="contact-form-elements">
           {inputElement}
           {validationError}
       </div>
    )
}