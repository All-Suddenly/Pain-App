export function App() {
  return (
    <div style={{ padding: 20 }}>
      <header>
        <h1>Start of the Pain App!</h1>
      </header>
      <main>
        <h2>Welcome to the beginning of the pain app!</h2>

        <p style={{ maxWidth: 400 }}>
          The pain app will help you track your every day pains. Create a
          tracker, and start adding your pain points today!.
        </p>
        <p>
          Only <strong>$49.99</strong>/month!
        </p>

        <div>
          <strong>
            <span style={{ fontSize: '8rem' }}>Wow!</span>
          </strong>
        </div>

        <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
          <div className="flex-shrink-0">
            <img
              className="h-12 w-12"
              src={process.env.PUBLIC_URL + '/svgs/chat_icon.svg'}
              alt="ChitChat Logo"
            />
          </div>
          <div>
            <div className="text-xl font-medium text-black">ChitChat</div>
            <p className="text-gray-500">You have a new message!</p>
          </div>
        </div>
      </main>
    </div>
  );
}
