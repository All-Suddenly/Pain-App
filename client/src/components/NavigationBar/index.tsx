import { Fragment } from 'react';
import { Link } from 'react-router-dom';

const links = [
  { path: '/', label: 'Home' },
  { path: '/tracker/25', label: 'Tracker' },
  { path: '/dashboard', label: 'Dashboard' },
];

export function NavigationBar() {
  return (
    <div className="py-6 text-center text-white bg-black">
      <div>
        <strong>THE PAIN APP</strong>
      </div>
      <div>
        {links.map(({ label, path }, index) => {
          return (
            <Fragment key={path}>
              <Link to={path}>{label}</Link>
              {index + 1 < links.length && <span> | </span>}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
