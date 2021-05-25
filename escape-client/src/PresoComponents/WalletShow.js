import {useState, useEffect, useCallback} from 'react';
import {fetchWallet} from '../services/wallet-service.js';
import NewExpenseForm from '../DataComponents/NewExpenseForm.js';
// import '../tripPlanner.css';

export default function WalletShow(props) {
    console.log(props)
    const [walletState, setWalletState] = useState();

    const calcBudget = () => {
        let sum = parseInt(walletState.budget);

        for(let i = 0; i < walletState.expenses.length; i++) {
            let currentAmt = walletState.expenses[i].amount;
            sum -= parseInt(currentAmt);
        }
        return sum;
    }

    const getWalletProfile = useCallback(() => {
        const data = fetchWallet(props.user._id, props.trip._id);
        setWalletState(data);
    },[props.user._id, props.trip._id]);

    useEffect(() => {
        getWalletProfile();
    }, [getWalletProfile])

    return(
        <div className="budget-grid">
            <div className="expense-container">
                <h2>Total Budget: ${walletState && walletState.budget}</h2>
                <h2>Available Budget: ${walletState ? walletState && calcBudget() : walletState && walletState.budget}</h2>
                <table className="expenseTable">
                    <tr>
                        <th>Expense</th>
                        <th>Cost</th>
                    </tr>
                    {walletState && walletState.expenses.map((expense) => {
                        return (
                            <tr>
                                <td>{expense.name}</td>
                                <td>${expense.amount}</td>
                            </tr>
                        )
                    })}
                </table>
            </div>
            <div className="new-expense">{walletState && walletState.budget ? <NewExpenseForm wallet={walletState} trip={props.trip}/> : ""} </div>
        </div>
    )
}