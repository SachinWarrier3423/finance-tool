export default async function Page() {
    // Use fetch to call the MongoDB test API
    const res = await fetch("http://localhost:3000/api/test-mongo");
    const data = await res.text();
  
    return (
      <div>
        <h1>MongoDB Connectivity Test</h1>
        <p>{data}</p>
      </div>
    );
  }
  