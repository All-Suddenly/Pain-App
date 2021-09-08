import { useState } from 'react';

// Call out to login
export function LandingPage() {
  const [email, setEmail] = useState('');

  return (
    <div>
      <h1>Hello LandingPage!</h1>
      <div>
        <form>
          <div>
            <label>
              Email
              <input
                autoComplete="email"
                onChange={({ target: { value } }) => {
                  setEmail(value);
                }}
                placeholder="john_doe@example.com"
                type="email"
                value={email}
              />
            </label>
          </div>
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
}
