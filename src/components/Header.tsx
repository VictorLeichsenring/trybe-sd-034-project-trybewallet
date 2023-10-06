import { useSelector } from 'react-redux';
import { RootState } from '../types';

function Header() {
  const email = useSelector((state:RootState) => state.user.email);
  return (
    <header>
      <span data-testid="email-field">{email}</span>
      <span data-testid="total-field">0</span>
      <span data-testid="header-currency-field">BRL</span>
    </header>
  );
}

export default Header;
