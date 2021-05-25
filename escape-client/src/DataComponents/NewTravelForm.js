import Input from '../PresoComponents/FormInputs';
import {useState} from 'react';
import {createTravel} from '../../../services/travelService.js';
import {useHistory} from 'react-router-dom';
import '../tripPlanner.css';

export default function NewTravelForm(props) {

    const [getFormState, setFormState] = useState({
        travelForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Travel Name',
                    name: 'name'
                },
                validation: {
                    required: true,
                    minLength: 5
                },
                valid: false,
                value: ''
            },
            type: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Travel Type',
                    name: 'name'
                },
                validation: {
                    required: true,
                },
                valid: false,
                value: ''
            },
            starting_location: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Starting Location',
                    name: 'name'
                },
                validation: {
                    required: true,
                },
                valid: false,
                value: ''
            },
            ending_location: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Ending Location',
                    name: 'name'
                },
                validation: {
                    required: true,
                },
                valid: false,
                value: ''
            },
            date: {
                elementType: 'input',
                elementConfig: {
                    type: 'date',
                    placeholder: 'Date of Travel',
                    name: 'name'
                },
                validation: {
                    required: true,
                },
                valid: false,
                value: ''
            },
            reservation_number: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Reservation Number',
                    name: 'name'
                },
                validation: {
                    required: false,
                },
                valid: false,
                value: ''                
            }
        },
        formIsValid: false
    });

    const formElementsArr = [];

    for (let key in getFormState.travelForm) {
        formElementsArr.push({
            id: key,
            config: getFormState.travelForm[key],
        })
    }

    const inputChangedHandler = (event, inputIdentifier) => {
        event.preventDefault();
        // clone state
        const updatedTravelForm = {
            ...getFormState.travelForm
        }
        // deep clone
        const updatedFormElement = {...updatedTravelForm[inputIdentifier]}
        // set the state element value to the value of the event target value
        updatedFormElement.value = event.target.value;

        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        
        // update the specific element to the updated form element declared
        updatedTravelForm[inputIdentifier] = updatedFormElement;
        let formIsValid = true;
        for(let key in updatedTravelForm) {
            formIsValid = updatedTravelForm[key].valid && formIsValid;
        }
 
       // set state to equal the updated contact form with the new values
       setFormState({
           travelForm: updatedTravelForm,
           formIsValid: formIsValid
       })

    }

    function checkValidity(value, rules) {
        let isValid = true;
        if(rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        return isValid;
    }

    let history = useHistory();

    async function handleSubmit(evt) {
        // tried to change this to something else to test and wasn't working...
        let object = {};
        let trip_id = props.trip._id;
        for(let key in getFormState.travelForm) {
            object[key] = getFormState.travelForm[key].value;
        }
        try {
            evt.preventDefault();
            props.handleClose(evt);
            await createTravel(object, trip_id);
            history.push(`/trip/${trip_id}`)

        } catch (error) {
            alert(error.message);
        }
    };

        return(
        <div id="create-new-travel-container" className="newTravelForm">
        <button className="closeTravel" onClick={(event) => props.handleClose(event)}>Close</button>
        <form className="create-new-travel-form" onSubmit={handleSubmit} >
            <h2>Add Travel Information:</h2>
            {formElementsArr.map((object) => {
                return(
                    <Input 
                    elementType={object.config.elementType}
                    elementConfig={object.config.elementConfig}
                    value={object.value}
                    key={object.id}
                    invalid={getFormState.formIsValid}
                    // shouldValidate={}
                    // touched={}
                    changed={(event) => inputChangedHandler(event, object.id)}
                    />
                )
            })}
            
            <button className="activity-button"btnType="Success" disabled={!getFormState.formIsValid} type="submit">Add New Travel!</button>
        </form>
    </div>

    )
}