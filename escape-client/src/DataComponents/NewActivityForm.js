import Input from '../PresoComponents/FormInputs';
import {useState} from 'react';
import {createActivity} from '../services/activity-service.js';
import {useHistory} from 'react-router-dom';
// import './activity.css';

export default function NewActivityForm(props) {

    const [getFormState, setFormState] = useState({
        activityForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Activity',
                    name: 'name'
                },
                validation: {
                    required: true,
                    minLength: 5
                },
                valid: false,
                value: ''
            },
            link: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Link to Activity',
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
                    placeholder: 'Type of Activity',
                    name: 'name'
                },
                validation: {
                    required: true,
                    minLength: 5
                },
                valid: false,
                value: ''
            },
            location: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Location',
                    name: 'name'
                },
                validation: {
                    required: true,
                    minLength: 5
                },
                valid: false,
                value: ''
            },
            date: {
                elementType: 'input',
                elementConfig: {
                    type: 'date',
                    placeholder: 'Date of Visit',
                    name: 'name'
                },
                validation: {
                    required: true,
                    minLength: 5
                },
                valid: false,
                value: ''
            }
        },
        formIsValid: false
    });

    const formElementsArr = [];

    for (let key in getFormState.activityForm) {
        formElementsArr.push({
            id: key,
            config: getFormState.activityForm[key],
        })
    }

    const inputChangedHandler = (event, inputIdentifier) => {
    event.preventDefault();
    // clone state
    const updatedActivityForm = {
        ...getFormState.activityForm
    }
    // deep clone
    const updatedFormElement = {...updatedActivityForm[inputIdentifier]}
    // set the state element value to the value of the event target value
    updatedFormElement.value = event.target.value;

    updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
    
    // update the specific element to the updated form element declared
    updatedActivityForm[inputIdentifier] = updatedFormElement;
    let formIsValid = true;
    for(let key in updatedActivityForm) {
        formIsValid = updatedActivityForm[key].valid && formIsValid;
    }
 
       // set state to equal the updated contact form with the new values
       setFormState({
           activityForm: updatedActivityForm,
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
        evt.preventDefault();
        let object = {};
        let trip_id = props.trip._id;
        for(let key in getFormState.activityForm) {
            object[key] = getFormState.activityForm[key].value;
        }
        try {
            evt.preventDefault();
            await createActivity(object, trip_id);
            props.handleClose(evt);
            history.push(`/trip/${trip_id}`)
        } catch (error) {
            alert(error.message);
        }
    };

    return(
        <div id="create-new-activity-container" className="newActivityForm">
            <button className="closeActivity" onClick={(event) => props.handleClose(event)}>Close</button>
            <form className="create-new-activity-form" onSubmit={handleSubmit} >
                <h2>Create a New Activity:</h2>
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
                        onClose={props.handleClose}
                        />
                    )
                })}
                
                <button className="activity-button" btnType="Success" disabled={!getFormState.formIsValid} type="submit" >Create New Activity!</button>
            </form>
        </div>
    )
}