import { useState } from "react";
import { authService, apiService } from "../services";

function Demo() {
  const [testResults, setTestResults] = useState({});
  const [loading, setLoading] = useState(false);

  const runTests = async () => {
    setLoading(true);
    const results = {};

    // Test 1: Backend Connection
    try {
      const response = await apiService.testConnection();
      results.connection = `✅ ${response.message}`;
    } catch (error) {
      results.connection = `❌ ${error.message}`;
    }

    // Test 2: Registration
    try {
      const testUser = {
        name: "Test Tourist",
        email: `test_${Date.now()}@example.com`,
        password: "password123"
      };
      const regResponse = await authService.register(testUser);
      results.registration = `✅ User registered: ${regResponse.user.name}`;
      
      // Test 3: Login with the same user
      try {
        const loginResponse = await authService.login({
          email: testUser.email,
          password: testUser.password
        });
        results.login = `✅ Login successful: ${loginResponse.user.name}`;
        results.token = `✅ Token received: ${loginResponse.token.substring(0, 20)}...`;
      } catch (loginError) {
        results.login = `❌ Login failed: ${loginError.message}`;
      }
    } catch (regError) {
      results.registration = `❌ Registration failed: ${regError.message}`;
    }

    setTestResults(results);
    setLoading(false);
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-body">
          <h3 className="card-title">🧪 Authentication Demo & Test</h3>
          <p className="card-text">Test the login and registration functionality</p>
          
          <button 
            className="btn btn-primary mb-3" 
            onClick={runTests}
            disabled={loading}
          >
            {loading ? "Running Tests..." : "Run Authentication Tests"}
          </button>
          
          {Object.keys(testResults).length > 0 && (
            <div className="mt-3">
              <h5>Test Results:</h5>
              <ul className="list-group">
                {Object.entries(testResults).map(([test, result]) => (
                  <li key={test} className="list-group-item">
                    <strong>{test}:</strong> {result}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="mt-4">
            <h5>Manual Testing Instructions:</h5>
            <ol>
              <li>Go to <a href="/onboarding">/onboarding</a> to register a new account</li>
              <li>Fill in your name, email, and password (min 6 characters)</li>
              <li>After registration, go to <a href="/login">/login</a></li>
              <li>Login with your credentials</li>
              <li>Try accessing <a href="/sos">/sos</a> (requires login)</li>
              <li>Try accessing <a href="/incidents">/incidents</a> (requires login)</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Demo;
