import bcrypt from 'bcrypt';

const saltRounds = 10; // Number of salt rounds for bcrypt

async function hashPassword(password: string): Promise<string> {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    // Handle error
    throw new Error('Password hashing failed');
  }
}

async function comparePasswords(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  try {
    const isPasswordValid = await bcrypt.compare(
      password,
      hashedPassword
    );
    return isPasswordValid;
  } catch (error) {
    // Handle error
    throw new Error('Password comparison failed');
  }
}

export { hashPassword, comparePasswords };
