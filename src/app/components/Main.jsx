import Link from 'next/link';

const Main  = () => {
  return (
    <div className="main">
      <h1>Welcome to the Main Component</h1>
      <p>This is the main content area of the application.</p>
      <Link href="/dashboardSeller">
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Go to About Page
        </button>
      </Link>
    </div>
  );
}

export default Main;