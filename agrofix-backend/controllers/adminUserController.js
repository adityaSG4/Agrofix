const pool = require('../config/db');


// GET all users
// This function retrieves all users from the database and returns them in descending order by ID.
exports.getAllUsers = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users ORDER BY id DESC');
    res.json({ users: result.rows });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err });
  }
};

// GET a user by ID
// This function retrieves a single user from the database based on the provided ID.
exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ user: result.rows[0] });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user', error: err });
  }
};

// UPDATE a user role
// This function updates the role of a user in the database based on the provided ID.
exports.updateUserRole = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  try {
    const result = await pool.query(
      'UPDATE users SET role = $1 WHERE id = $2 RETURNING *',
      [role, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User role updated', user: result.rows[0] });
  } catch (err) {
    res.status(500).json({ message: 'Error updating user role', error: err });
  }
};

// DELETE a user
// This function deletes a user from the database based on the provided ID.
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted', user: result.rows[0] });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user', error: err });
  }
};
