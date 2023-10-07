// actions.test.ts
import * as actions from '../redux/actions';
import { deleteExpense, DELETE_EXPENSE } from '../redux/actions'; // Ajuste o caminho conforme necessário

describe('deleteExpense action', () => {
  it('should create an action to delete an expense', () => {
    const mockExpenseData = [
      { id: 1, description: 'Test 1', value: '100' },
      { id: 2, description: 'Test 2', value: '200' },
    ];

    const expectedAction = {
      type: DELETE_EXPENSE,
      payload: mockExpenseData,
    };

    expect(actions.deleteExpense(mockExpenseData)).toEqual(expectedAction);
  });
});
