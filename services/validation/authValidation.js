const validationRules = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-Z\s'-]+$/,
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  username: {
    required: true,
    minLength: 3,
    maxLength: 20,
    pattern: /^[a-zA-Z0-9_]+$/,
  },
  password: {
    required: true,
    minLength: 8,
  },
};

export function validateSignUp(form) {
  const errors = {};
  // Name
  if (!form.name || form.name.length < validationRules.name.minLength) {
    errors.name = 'Name is required (2+ letters)';
  } else if (form.name.length > validationRules.name.maxLength) {
    errors.name = 'Name too long';
  } else if (!validationRules.name.pattern.test(form.name)) {
    errors.name = 'Name contains invalid characters';
  }
  // Email
  if (!form.email) {
    errors.email = 'Email is required';
  } else if (!validationRules.email.pattern.test(form.email)) {
    errors.email = 'Invalid email address';
  }
  // Username
  if (!form.username || form.username.length < validationRules.username.minLength) {
    errors.username = 'Username is required (3+ chars)';
  } else if (form.username.length > validationRules.username.maxLength) {
    errors.username = 'Username too long';
  } else if (!validationRules.username.pattern.test(form.username)) {
    errors.username = 'Username can only contain letters, numbers, and underscores';
  }
  // Password
  if (!form.password || form.password.length < validationRules.password.minLength) {
    errors.password = 'Password must be at least 8 characters';
  }
  return { valid: Object.keys(errors).length === 0, errors };
} 