import Input from '../PresoComponents/FormInputs';
import {useState} from 'react';
import {createExpense} from '../services/wallet-service.js';
import {useHistory} from 'react-router-dom';
import Button from '@material-ui/core/Button';

// import '../tripPlanner.css';

export default function NewExpenseForm(props) {
    const [getFormState, setFormState] = useState({
        expenseForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Expense Name',
                    name: 'name'
                },
                validation: {
                    required: true,
                },
                valid: false,
                value: ''
            },
            amount: {
                elementType: 'input',
                elementConfig: {
                    type: 'number',
                    placeholder: 'Expense Amount',
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
                    placeholder: 'Date of Expense',
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

    for (let key in getFormState.expenseForm) {
        formElementsArr.push({
            id: key,
            config: getFormState.expenseForm[key],
        })
    }

    const inputChangedHandler = (event, inputIdentifier) => {
        event.preventDefault();
        // clone state
        const updatedExpenseForm = {
            ...getFormState.expenseForm
        }
        // deep clone
        const updatedFormElement = {...updatedExpenseForm[inputIdentifier]}
        // set the state element value to the value of the event target value
        updatedFormElement.value = event.target.value;

        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        
        // update the specific element to the updated form element declared
        updatedExpenseForm[inputIdentifier] = updatedFormElement;
        let formIsValid = true;
        for(let key in updatedExpenseForm) {
            formIsValid = updatedExpenseForm[key].valid && formIsValid;
        }
 
       // set state to equal the updated contact form with the new values
       setFormState({
           expenseForm: updatedExpenseForm,
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
    let history = useHistory();

    async function handleSubmit(evt) {
        let object = {};
        for(let key in getFormState.expenseForm) {
            object[key] = getFormState.expenseForm[key].value;
        }
        try {
            evt.preventDefault();
            await createExpense(object, props.wallet._id);
            history.push(`/trip/${props.trip._id}`)

        } catch (error) {
            alert(error.message);
        }
    };

        return(
        <div id="create-new-expense-container" className="newExpenseForm">
        <form className="create-new-expense-form" onSubmit={handleSubmit} >
            <h2>Add Expense Information:</h2>
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
            
            <Button btnType="Success" className="expense-button" disabled={!getFormState.formIsValid} type="submit">Add New Expense!</Button>
        </form>
    </div>

    )
}