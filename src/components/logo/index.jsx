import "./styles.css";
import {ReactComponent as LogoImg} from './assets/logo.svg';

export function Logo({ className='' }) {
  return (
    <a href="/" className="logo">
      <LogoImg alt="Логотип компании" className={`logo__pic ${className}`} />
    </a>
  );
}