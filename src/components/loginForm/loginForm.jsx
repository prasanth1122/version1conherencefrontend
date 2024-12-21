import PropTypes from "prop-types";

export default function LoginForm({
  email,
  setEmail,
  password,
  setPassword,
  handleSubmit,
  isLoading,
  errorMessage,
}) {
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full lg:w-1/2 flex flex-col items-center gap-6 mt-8 bg-terinary rounded-xl px-8 py-4"
    >
      <p className="text-2xl font-bold text-important_text">Login</p>

      {/* Email Input */}
      <div className="w-full flex flex-col gap-2">
        <label htmlFor="email" className="text-lg font-medium">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-primary"
          required
        />
      </div>

      {/* Password Input */}
      <div className="w-full flex flex-col gap-2">
        <label htmlFor="password" className="text-lg font-medium">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-primary"
          required
        />
      </div>

      {/* Forgot Password */}
      <div className="w-full text-right">
        <a
          href="mailto:support@example.com?subject=Forgot%20Password&body=Hi%20Support,%0A%0AI%20need%20help%20resetting%20my%20password.%20My%20email%20is%20[your-email].%0A%0AThank%20you!"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-important_text hover:underline"
        >
          Forgot Password?
        </a>
      </div>

      {/* Login Button */}
      <button
        type="submit"
        className="w-full px-4 py-2 bg-secondary text-white rounded-md shadow-gray-600"
        disabled={isLoading}
      >
        {isLoading ? "Logging In..." : "Login"}
      </button>

      {/* Sign Up Link */}
      <p className="text-sm">
        Don&apos;t have an account?{" "}
        <a
          href="/signup"
          className="text-important_text font-medium hover:underline"
        >
          Sign Up
        </a>
      </p>
    </form>
  );
}

// Add PropTypes for validation
LoginForm.propTypes = {
  email: PropTypes.string.isRequired, // Email must be a string and required
  setEmail: PropTypes.func.isRequired, // Function to update email
  password: PropTypes.string.isRequired, // Password must be a string and required
  setPassword: PropTypes.func.isRequired, // Function to update password
  handleSubmit: PropTypes.func.isRequired, // Function for form submission
  isLoading: PropTypes.bool, // Boolean for loading state
  errorMessage: PropTypes.string, // String for error message, optional
};

// Add default props for optional props
LoginForm.defaultProps = {
  isLoading: false,
  errorMessage: "",
};
