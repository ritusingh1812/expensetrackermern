import React from "react";
import { useGlobalContext } from "../../context/globalContext";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Budget from "../budget/Budget";
import styled from "styled-components";

// Group data by category
const groupByCategory = (items) => {
  const result = {};
  items.forEach((item) => {
    if (result[item.category]) {
      result[item.category] += item.amount;
    } else {
      result[item.category] = item.amount;
    }
  });
  return Object.entries(result).map(([category, amount]) => ({
    name: category,
    value: amount,
  }));
};

// Colors for chart segments
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#a832a6", "#FF4444"];

// Styled Components
const InsightsContainer = styled.div`
  padding: 2rem;
  background-color: #f8f8f8;
  min-height: 100vh;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  color: #333;
  text-align: center;
  margin-bottom: 2rem;
`;

const ChartsWrapper = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ChartContainer = styled.div`
  flex: 1;
  min-width: 300px;
  background-color: #fff;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const ChartTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 500;
  color: #333;
  margin-bottom: 1rem;
`;

const NoDataText = styled.p`
  font-size: 1rem;
  color: #888;
`;

const Insights = () => {
  const { incomes, expenses } = useGlobalContext();

  const incomeData = groupByCategory(incomes);
  const expenseData = groupByCategory(expenses);

  return (
    <InsightsContainer>
      <Title>Insights</Title>

      <ChartsWrapper>
        {/* Income Chart */}
        <ChartContainer>
          <ChartTitle>Income by Category</ChartTitle>
          {incomeData.length === 0 ? (
            <NoDataText>No income data available.</NoDataText>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={incomeData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {incomeData.map((_, index) => (
                    <Cell key={`income-cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </ChartContainer>

        {/* Expense Chart */}
        <ChartContainer>
          <ChartTitle>Expenses by Category</ChartTitle>
          {expenseData.length === 0 ? (
            <NoDataText>No expense data available.</NoDataText>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={expenseData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#82ca9d"
                  dataKey="value"
                  label
                >
                  {expenseData.map((_, index) => (
                    <Cell key={`expense-cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </ChartContainer>
      </ChartsWrapper>

      <Budget />
    </InsightsContainer>
  );
};

export default Insights;
