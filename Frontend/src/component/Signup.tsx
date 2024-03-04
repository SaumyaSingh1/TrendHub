import  { useState, FormEvent, ChangeEvent } from 'react'; // Import ChangeEvent
import { Link, useNavigate } from 'react-router-dom';
import { backendUrl } from '../utils/config';
import axios from 'axios';

const SignupForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [contact, setContact] = useState<string>('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      console.error("Passwords don't match");
      return;
    }

    const userData = {
      name,
      email,
      password,
      address,
      contact
    };

    try {
      await axios.post(`${backendUrl}/auth/signup`, userData);

      console.log('User signed up successfully');
      // Redirect or show success message
      navigate('/login');
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error signing up:', error.message);
      } else {
        console.error('Unknown error:', error);
      }
      // Show error message to the user
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => { // Define the type of the event
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'confirmPassword':
        setConfirmPassword(value);
        break;
      case 'address':
        setAddress(value);
        break;
      case 'contact':
        setContact(value);
        break;
      default:
        break;
    }
  };

  return (
    <div className="max-w-md mx-auto m-4 p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleChange} // Use handleChange for all input elements
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        {/* Other input fields */}
        <div className="mb-4 flex justify-center">
          <button type="submit" className="bg-customColor hover:bg-customColor-hover text-white font-bold py-2 px-4 rounded-full">Sign Up</button>
        </div>
      </form>
      <div className="text-center">
        <p>Already have an account? <Link to="/login" className="text-pink-900 hover:underline">Login</Link></p>
      </div>
    </div>
  );
};

export default SignupForm;
