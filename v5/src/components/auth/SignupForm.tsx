import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, ArrowRight } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { useAuth } from '../../context/AuthContext';

const SignupForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ name: '', email: '', password: '' });
  const { signup, state } = useAuth();
  const navigate = useNavigate();
  
  const validate = () => {
    const newErrors = { name: '', email: '', password: '' };
    let isValid = true;
    
    if (!name) {
      newErrors.name = 'Name is required';
      isValid = false;
    }
    
    if (!email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email format is invalid';
      isValid = false;
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      signup(name, email, password);
    }
  };
  
  const handleLoginClick = () => {
    navigate('/login');
  };
  
  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Create Account</h1>
        <p className="text-gray-500">Join us to start your health journey</p>
      </div>
      
      {state.error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-500 rounded-lg text-sm">
          {state.error}
        </div>
      )}
      
      <Input
        label="Full Name"
        type="text"
        placeholder="John Doe"
        icon={<User size={18} />}
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={errors.name}
        autoComplete="name"
      />
      
      <Input
        label="Email"
        type="email"
        placeholder="your@email.com"
        icon={<Mail size={18} />}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
        autoComplete="email"
      />
      
      <Input
        label="Password"
        type="password"
        placeholder="••••••••"
        icon={<Lock size={18} />}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password}
        autoComplete="new-password"
      />
      
      <div className="text-sm text-gray-500 mt-2">
        <p>By signing up, you agree to our <a href="#" className="text-sky-500">Terms of Service</a> and <a href="#" className="text-sky-500">Privacy Policy</a>.</p>
      </div>
      
      <Button 
        type="submit" 
        fullWidth 
        isLoading={state.isLoading}
        size="lg"
        className="mt-6"
      >
        Create Account <ArrowRight size={18} className="ml-2" />
      </Button>
      
      <div className="text-center mt-6">
        <p className="text-gray-500">
          Already have an account?{' '}
          <button
            type="button"
            onClick={handleLoginClick}
            className="text-sky-500 hover:text-sky-700 transition-colors font-medium"
          >
            Sign In
          </button>
        </p>
      </div>
    </form>
  );
};

export default SignupForm;