import {useHistory} from 'react-router-dom';
import {useState, useLayoutEffect} from 'react';
import {createTrip} from '../services/trip-service.js';
import {fetchUserProfile} from '../services/user-service.js';
import Input from '../PresoComponents/FormInputs';
import Button from '@material-ui/core/Button';
import './css/tripPlanner.css';


export default function NewTripForm(props) {
    const [getFormState, setFormState] = useState({
        tripForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Trip Name',
                    name: 'name'
                },
                validation: {
                    required: true,
                    minLength: 5
                },
                valid: false,
                value: ''
            },
            starting_location: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Starting Location',
                    name: 'starting_location'
                },
                validation: {
                    required: true,
                    minLength: 5
                },
                valid: false,
                value: ''
            },
            ending_location: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Ending Location',
                    name: 'ending_location'
                },
                validation: {
                    required: true,
                    minLength: 5
                },
                valid: false,
                value: ''
            },
            start_date: {
                elementType: 'input',
                elementConfig: {
                    type: 'date',
                    placeholder: 'Start Date',
                    name: 'start_date'
                },
                validation: {
                    required: true
                },
                valid: false,
                value: ''
            },
            end_date: {
                elementType: 'input',
                elementConfig: {
                    type: 'date',
                    placeholder: 'End Date',
                    name: 'end_date'
                },
                validation: {
                    required: true
                },
                valid: false,
                value: ''
            },            
            accessibility_needs: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Accessibility Needs',
                    name: 'accessibility_needs'
                },
                validation: {
                    required: true
                },
                valid: false,
                value: false
            },
        },
        formIsValid: false
    })

    const [userState, setUserState] = useState()
    const formElementsArr = [];

    for (let key in getFormState.tripForm) {
        formElementsArr.push({
            id: key,
            config: getFormState.tripForm[key],
        })
    }

    const inputChangedHandler = (event, inputIdentifier) => {
        event.preventDefault();
        // clone state
        const updatedTripForm = {
            ...getFormState.tripForm
        }
        // deep clone
        const updatedFormElement = {...updatedTripForm[inputIdentifier]}
        // set the state element value to the value of the event target value
        updatedFormElement.value = event.target.value;

        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        
        // update the specific element to the updated form element declared
        updatedTripForm[inputIdentifier] = updatedFormElement;
        let formIsValid = true;
        for(let key in updatedTripForm) {
            formIsValid = updatedTripForm[key].valid && formIsValid;
        }
 
       // set state to equal the updated contact form with the new values
       setFormState({
           tripForm: updatedTripForm,
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
        let user_id = userState._id;
        for(let key in getFormState.tripForm) {
            object[key] = getFormState.tripForm[key].value;
        }
        try {
            evt.preventDefault();
            let data = await createTrip(object, user_id);
            history.push(`/api/trip/${data._id}`)

        } catch (error) {
            alert(error.message);
        }
    };

    async function fetchUser() {
        try {
            const data = await fetchUserProfile(props.user._id);
            setUserState(data)
        } catch (err) {
            console.log(err.message)
        }
    }


    useLayoutEffect(() => {
        fetchUser();
    }, [props.user._id])

    return(
        <div id="create-new-trip-container">
        <form className="create-new-trip-form" onSubmit={handleSubmit} >
            <h2>Create a New Trip:</h2>
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
                    changed={(event) => inputChangedHandler(event, object.id)}/>
                )
            })}
            
            <Button className="trip-form" type="Success" disabled={!getFormState.formIsValid} >Create New Trip!</Button>
        </form>
    </div>

    )
}