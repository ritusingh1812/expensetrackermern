import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../../context/globalContext.js';

import styled from 'styled-components';

// Styled Components
const BudgetContainer = styled.div`

  background-color: #ffffff;

  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 50px auto;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 20px;
  text-align: center;
  color: #333;
`;

const BudgetItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
`;

const BudgetLabel = styled.div`
  font-size: 1rem;
  color: #555;
`;

const BudgetValue = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
  color: #333;
`;

const BudgetStatus = styled.div`
  text-align: center;
  margin-top: 20px;
`;

const Warning = styled.span`
  font-size: 1rem;
  font-weight: 600;
  color: #e74c3c;
`;

const Success = styled.span`
  font-size: 1rem;
  font-weight: 600;
  color: #2ecc71;
`;

const Budget = () => {
  // Get income and expenses from context
  const { totalIncome, totalExpenses } = useGlobalContext();

  // Budget state
  const [warning, setWarning] = useState(false);
  const [isUnderBudget, setIsUnderBudget] = useState(false);

  // When totalIncome or totalExpenses changes, check for warning condition
  useEffect(() => {
    // Calculate 70% of total income
    const expenseThreshold = totalIncome() * 0.7;
    
    // If total expenses exceed 70% of total income, show warning
    if (totalExpenses() > expenseThreshold) {
      setWarning(true);
      setIsUnderBudget(false);
    } else {
      setWarning(false);
      setIsUnderBudget(true);
    }
  }, [totalIncome, totalExpenses]); // Dependency on income and expenses

  return (
    <BudgetContainer>
      <Title>Budget Overview</Title>

      <BudgetItem>
        <BudgetLabel>Monthly Income:</BudgetLabel>
        <BudgetValue>₹{totalIncome()}</BudgetValue>
      </BudgetItem>

      <BudgetItem>
        <BudgetLabel>Monthly Expense:</BudgetLabel>
        <BudgetValue>₹{totalExpenses()}</BudgetValue>
      </BudgetItem>

      <BudgetStatus>
        {warning ? (
          <Warning>Warning: Expenses exceed 70% of Income!</Warning>
        ) : (
          <Success>You are under budget 👍</Success>
        )}
      </BudgetStatus>
    </BudgetContainer>
  );
};

export default Budget;
