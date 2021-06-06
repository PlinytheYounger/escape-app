import Input from '../PresoComponents/FormInputs';
import {useState} from 'react';
import {createWallet} from '../services/wallet-service.js';
import {Redirect} from 'react-router';
import Button from '@material-ui/core/Button';



export default function NewBudgetForm(props) {
    const [getFormState, setFormState] = useState({
        budgetForm: {
            budget: {
                elementType: 'input',
                elementConfig: {
                    type: 'number',
                    placeholder: 'Total Budget',
                    name: 'name'
                },
                validation: {
                    required: true,
                },
                valid: false,
                value: ''
            },
        },
        formIsValid: false
    });

    const formElementsArr = [];

    for (let key in getFormState.budgetForm) {
        formElementsArr.push({
            id: key,
            config: getFormState.budgetForm[key],
        })
    }

    const inputChangedHandler = (event, inputIdentifier) => {
        event.preventDefault();
        // clone state
        const updatedBudgetForm = {
            ...getFormState.budgetForm
        }
        // deep clone
        const updatedFormElement = {...updatedBudgetForm[inputIdentifier]}
        // set the state element value to the value of the event target value
        updatedFormElement.value = event.target.value;

        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        
        // update the specific element to the updated form element declared
        updatedBudgetForm[inputIdentifier] = updatedFormElement;
        let formIsValid = true;
        for(let key in updatedBudgetForm) {
            formIsValid = updatedBudgetForm[key].valid && formIsValid;
        }
 
       // set state to equal the updated contact form with the new values
       setFormState({
           budgetForm: updatedBudgetForm,
           formIsValid: formIsValid
       })

    }

    function checkValidity(value, rules) {
        let isValid = true;
        if(rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        return isValid;
    }

    async function handleSubmit(evt) {
        // tried to change this to something else to test and wasn't working...
        let object = {};
        let trip_id = props.trip._id;
        let user_id = props.user._id;

        for(let key in getFormState.budgetForm) {
            object[key] = getFormState.budgetForm[key].value;
        }
        try {
            evt.preventDefault();
            await createWallet(object, trip_id, user_id);
            // props.handleClose(evt);
            <Redirect push to={`/trip/${trip_id}`}/>

        } catch (error) {
            alert(error.message);
        }
    };

        return(
        <div id="create-new-expense-container" className="newExpenseForm">
        <form className="create-new-expense-form" onSubmit={handleSubmit} >
            <h2>Add Budget:</h2>
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
            
            <Button btntype="success" className="closeWallet" disabled={!getFormState.formIsValid} type="submit">Add New Budget!</Button>
        </form>
    </div>

    )
}