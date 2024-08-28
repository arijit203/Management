const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");

const app = express();
const port = 5000;

app.use(
  cors({
    origin: "*", // Allow all origins
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json({ limit: "200mb" }));

// MySQL database connection
// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "root",
//   database: "PROJECT",
// });

const db = mysql.createConnection({
  host: "bjsyvt822g7ahozjgxqe-mysql.services.clever-cloud.com",
  user: "ur9ppd0mn44uv7oa",
  password: "Oownoy5fZBDyiZxzrhMQ",
  database: "bjsyvt822g7ahozjgxqe",
  port: 3306,
  // connectionLimit: 10,
  // connectTimeout: 600000, // 10 minutes in milliseconds
  // acquireTimeout: 600000, // 10 minutes in milliseconds
  // waitForConnections: true,
});

db.connect((err) => {
  if (err) {
    console.error("Database connection error:", err);
    throw err;
  }
  console.log("Connected to database");
});

// Create database and table (optional if already created)
app.get("/createdb", (req, res) => {
  let sql = "CREATE DATABASE IF NOT EXISTS login_db";
  db.query(sql, (err) => {
    if (err) {
      console.error("Error creating database:", err);
      throw err;
    }
    res.send("Database created");
  });
});

// Create ALL_USERS table (optional if already created)
app.get("/createtable", (req, res) => {
  let sql = `CREATE TABLE IF NOT EXISTS ALL_USERS (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    address VARCHAR(255),
    role VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    phone_no VARCHAR(255),
    deviceId VARCHAR(255) UNIQUE  
);
`;
  db.query(sql, (err) => {
    if (err) {
      console.error("Error creating table:", err);
      throw err;
    }
    res.send("ALL_USERS table created");
  });
});

app.get("/createMachineTable", (req, res) => {
  const sql = `CREATE TABLE Machine (
    id INT AUTO_INCREMENT PRIMARY KEY,
    device_id VARCHAR(255) NOT NULL,
    grain_count VARCHAR(255),
    average_length VARCHAR(255),
    average_breadth VARCHAR(255),
    average_lb_ratio VARCHAR(255),
    broken_rice VARCHAR(255),
    observation VARCHAR(255),
    filedata LONGBLOB
  );`;

  db.query(sql, (err) => {
    if (err) {
      console.error("Error creating table:", err);
      res.status(500).send("Error creating table");
      return;
    }
    res.send("Machine table created");
  });
});

app.get("/createProductTable", (req, res) => {
  // SQL query to create the Images table
  const sql = `
    CREATE TABLE IF NOT EXISTS Images (
      id INT AUTO_INCREMENT PRIMARY KEY,
      filename VARCHAR(255) NOT NULL,
      filedata LONGBLOB NOT NULL,
      deviceId VARCHAR(255) NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  // Execute the SQL query
  db.query(sql, (err) => {
    if (err) {
      console.error("Error creating table:", err);
      return res.status(500).send("Error creating table");
    }
    res.send("Table created successfully");
  });
});

app.get("/createImageTable", (req, res) => {
  let sql = `
  CREATE TABLE IF NOT EXISTS Images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    filename VARCHAR(255),
    filedata LONGTEXT,
    deviceId VARCHAR(255),
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error creating Image table:", err);
      res.status(500).send("Error creating Image table");
      return;
    }
    res.send("Image table created successfully");
  });
});

// Route to create a new Machine record
// app.post("/machine", (req, res) => {
//   console.log("Request body: ", req.body);
//   const {
//     device_id,
//     grain_count,
//     average_length,
//     average_breadth,
//     average_lb_ratio,
//     broken_rice,
//     observation,
//   } = req.body.data;

//   // Insert query
//   const query = `
//       INSERT INTO Machine (device_id, grain_count, average_length, average_breadth, average_lb_ratio, broken_rice, observation)
//       VALUES (?, ?, ?, ?, ?, ?, ?)
//   `;

//   // Execute the query
//   db.query(
//     query,
//     [
//       device_id,
//       grain_count,
//       average_length,
//       average_breadth,
//       average_lb_ratio,
//       broken_rice,
//       observation,
//     ],
//     (err, results) => {
//       if (err) {
//         console.error("Error inserting record:", err);
//         return res.status(500).json({ error: "Database error" });
//       }

//       res.status(201).json({
//         message: "Machine record created successfully",
//         id: results.insertId,
//       });
//     }
//   );
// });

// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

const upload = multer({ storage: multer.memoryStorage() });

app.post("/machine", upload.single("image"), (req, res) => {
  const {
    device_id,
    grain_count,
    average_length,
    average_breadth,
    average_lb_ratio,
    broken_rice,
    observation,
  } = req.body;
  const imageBuffer = req.file.buffer.toString("base64");

  // Print received fields
  console.log("Received data:");
  console.log(`Device ID: ${device_id}`);
  console.log(`Grain Count: ${grain_count}`);
  console.log(`Average Length: ${average_length}`);
  console.log(`Average Breadth: ${average_breadth}`);
  console.log(`Average LB Ratio: ${average_lb_ratio}`);
  console.log(`Broken Rice: ${broken_rice}`);
  console.log(`Observation: ${observation}`);
  // console.log(`Image Path: ${imageBuffer}`);

  // Insert data into MySQL database
  const query = `INSERT INTO Machine (device_id, grain_count, average_length, average_breadth, average_lb_ratio, broken_rice, observation,filedata)
                 VALUES (?, ?, ?, ?, ?, ?, ?,?)`;

  db.query(
    query,
    [
      device_id,
      grain_count,
      average_length,
      average_breadth,
      average_lb_ratio,
      broken_rice,
      observation,
      imageBuffer,
    ],
    (err, results) => {
      if (err) {
        console.error("Error inserting data into the database:");
        return res.status(500).send("Internal Server Error");
      }
      res.status(200).send("Data inserted successfully");
    }
  );
});

app.post("/upload", upload.single("image"), (req, res) => {
  const imageBuffer = req.file.buffer.toString("base64");
  const filename = req.file.originalname | null;
  const deviceId = req.body.deviceId;

  const sql =
    "INSERT INTO Images (filename, filedata, deviceId) VALUES (?, ?, ?)";
  db.query(sql, [filename, imageBuffer, deviceId], (err, result) => {
    if (err) {
      console.error("Error inserting image data into the database:", err);
      res.status(500).send("Error inserting image data into the database");
      return;
    }
    res.send("Image uploaded and saved successfully");
  });
});

// app.get("/imageByDeviceId/:deviceId", (req, res) => {
//   const deviceId = req.params.deviceId;

//   const sql = "SELECT filename, filedata FROM Images WHERE deviceId = ?";
//   db.query(sql, [deviceId], (err, result) => {
//     if (err) {
//       console.error("Error retrieving image from the database:", err);
//       res.status(500).send("Error retrieving image from the database");
//       return;
//     }

//     if (result.length === 0) {
//       res.status(404).send("Image not found for the given deviceId");
//       return;
//     }

//     const image = result[0];
//     res.setHeader("Content-Type", "image/jpeg"); // Set the correct MIME type
//     res.send(Buffer.from(image.filedata, "base64")); // Send the image data
//   });
// });

app.get("/imageByDeviceId/:deviceId", (req, res) => {
  const deviceId = req.params.deviceId;

  // Modify the SQL query to fetch the most recent image
  const sql = `
    SELECT filename, filedata 
    FROM Images 
    WHERE deviceId = ? 
    ORDER BY createdAt DESC 
    LIMIT 1
  `;

  db.query(sql, [deviceId], (err, result) => {
    if (err) {
      console.error("Error retrieving image from the database:", err);
      res.status(500).send("Error retrieving image from the database");
      return;
    }

    if (result.length === 0) {
      res.status(404).send("Image not found for the given deviceId");
      return;
    }

    const image = result[0];
    res.setHeader("Content-Type", "image/jpeg"); // Set the correct MIME type
    res.send(Buffer.from(image.filedata, "base64")); // Send the image data
  });
});

app.get("/arijit", (req, res) => {
  return res.status(200).json({ message: "Hi from Arijit" });
});
// Login endpoint
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  // Check if user exists based on email
  const checkUserQuery = "SELECT * FROM ALL_USERS WHERE email = ?";
  db.query(checkUserQuery, [email], (err, userResults) => {
    if (err) {
      console.error("Error querying user:", err);
      return res.status(500).json({ error: err.message });
    }

    if (userResults.length === 0) {
      return res.status(401).json({ error: "User not found" });
    }

    // User exists, get hashed password from database
    const user = userResults[0];
    const hashedPassword = user.password;

    // Verify the provided password with the hashed password
    bcrypt.compare(password, hashedPassword, (err, isMatch) => {
      if (err) {
        console.error("Error comparing passwords:", err);
        return res.status(500).json({ error: "Error verifying credentials" });
      }

      if (isMatch) {
        // Passwords match, generate JWT token
        const payload = { email: user.email, role: user.role };
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
          expiresIn: "1h",
        });

        console.log("Login successful");
        res
          .status(200)
          .json({ message: "Login successful", accessToken: accessToken });
      } else {
        // Passwords don't match
        res.status(401).json({ error: "Invalid email or password" });
      }
    });
  });
});

// JWT token verification middleware function
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log("TOken", token);
  if (!token) {
    return res.status(401).json({ error: "Unauthorized: Token not provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      console.error("JWT verification error:", err);
      return res.status(403).json({ error: "Unauthorized: Token invalid" });
    }
    req.user = user;
    next();
  });
}

const saltRounds = 10; // Number of salt rounds to use for hashing

app.post("/addUser", (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    address,
    role,
    phone_no,
    deviceId,
  } = req.body;

  if (!email || !password || !role) {
    return res
      .status(400)
      .json({ error: "Email, password, and role are required" });
  }

  // Check if the email already exists in the database
  const checkEmailSql = "SELECT * FROM ALL_USERS WHERE email = ?";
  db.query(checkEmailSql, [email], (err, results) => {
    if (err) {
      console.error("Error checking email:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length > 0) {
      // Email already in use
      console.log("Email already in use");
      return res.status(409).json({ error: "Email already in use" });
    }

    // Hash the password
    bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
      if (err) {
        console.error("Error hashing password:", err);
        return res.status(500).json({ error: "Password hashing error" });
      }

      // Proceed with inserting the new user
      const user = {
        firstName: firstName || null,
        lastName: lastName || null,
        email,
        password: hashedPassword, // Use hashed password
        address: address || null,
        role,
        phone_no,
        deviceId,
      };

      const insertUserSql = "INSERT INTO ALL_USERS SET ?";
      db.query(insertUserSql, user, (err, result) => {
        if (err) {
          console.error("Error adding user:", err);
          return res.status(500).json({ error: "Database error" });
        }
        res.status(201).json({
          message: "User added successfully",
          userId: result.insertId,
        });
      });
    });
  });
});

// /updateUser route
app.post("/updateUser", (req, res) => {
  const {
    id,
    firstName,
    lastName,
    email,
    address,
    phone_no,
    deviceId,
    password,
  } = req.body;

  if (!email || !id) {
    return res.status(400).json({ error: "Email and id are required" });
  }

  // Check if the id and email match a record in the database
  const checkEmailSql = "SELECT * FROM ALL_USERS WHERE id = ? AND email = ?";
  db.query(checkEmailSql, [id, email], (err, results) => {
    if (err) {
      console.error("Error checking email:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (results.length === 0) {
      return res.status(409).json({ error: "No record found to update" });
    }

    // Build the update query dynamically based on the supplied fields
    const fieldsToUpdate = [];
    const updateValues = [];

    if (firstName) {
      fieldsToUpdate.push("firstName = ?");
      updateValues.push(firstName);
    }
    if (lastName) {
      fieldsToUpdate.push("lastName = ?");
      updateValues.push(lastName);
    }
    if (address) {
      fieldsToUpdate.push("address = ?");
      updateValues.push(address);
    }
    if (phone_no) {
      fieldsToUpdate.push("phone_no = ?");
      updateValues.push(phone_no);
    }
    if (deviceId) {
      fieldsToUpdate.push("deviceId = ?");
      updateValues.push(deviceId);
    }

    if (password) {
      // Hash the new password
      bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
        if (err) {
          console.error("Error hashing password:", err);
          return res.status(500).json({ error: "Password hashing error" });
        }

        // Add password update to the fieldsToUpdate array
        fieldsToUpdate.push("password = ?");
        updateValues.push(hashedPassword);

        // Add the updated_at field update
        fieldsToUpdate.push("updated_at = CURRENT_TIMESTAMP");
        updateValues.push(id); // Add id to the end for the WHERE clause

        const updateUserSql = `
          UPDATE ALL_USERS
          SET ${fieldsToUpdate.join(", ")}
          WHERE id = ?
        `;

        db.query(updateUserSql, updateValues, (err, result) => {
          if (err) {
            console.error("Error updating user:", err);
            return res.status(500).json({ error: "Database error" });
          }
          res.status(200).json({ message: "User updated successfully" });
        });
      });
    } else {
      // If no password is provided, update without it
      if (fieldsToUpdate.length === 0) {
        return res.status(400).json({ error: "No fields to update" });
      }

      // Add the updated_at field update
      fieldsToUpdate.push("updated_at = CURRENT_TIMESTAMP");
      updateValues.push(id); // Add id to the end for the WHERE clause

      const updateUserSql = `
        UPDATE ALL_USERS
        SET ${fieldsToUpdate.join(", ")}
        WHERE id = ?
      `;

      db.query(updateUserSql, updateValues, (err, result) => {
        if (err) {
          console.error("Error updating user:", err);
          return res.status(500).json({ error: "Database error" });
        }
        res.status(200).json({ message: "User updated successfully" });
      });
    }
  });
});
app.get("/allUsers", (req, res) => {
  const sql = "SELECT * FROM ALL_USERS WHERE role != 'Admin'";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching users:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results); // Send the array of users as JSON response
  });
});

app.delete("/deleteUser/:id", (req, res) => {
  const userId = req.params.id;

  // SQL query to delete user by id
  const deleteUserSql = "DELETE FROM ALL_USERS WHERE id = ?";

  db.query(deleteUserSql, userId, (err, result) => {
    if (err) {
      console.error("Error deleting user:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  });
});

app.post("/changeUserRole/:id", (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  if (!id || !role) {
    return res.status(400).json({ error: "User ID and role are required" });
  }

  // Update user role in the database
  const updateUserRoleSql = `
    UPDATE ALL_USERS
    SET role = ?
    WHERE id = ?
  `;

  db.query(updateUserRoleSql, [role, id], (err, result) => {
    if (err) {
      console.error("Error updating user role:", err);
      return res.status(500).json({ error: "User not Found" });
    }

    res.status(200).json({ message: "User role updated successfully" });
  });
});

// -----------------------------------------------------------------------------------------------------

const verifyToken = (req, res, next) => {
  console.log("COme to verify!!");
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.sendStatus(401); // Unauthorized
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.sendStatus(403); // Forbidden
    }
    req.email = decoded.email; // Assuming userId is stored as 'sub' in JWT payload
    next();
  });
};

// Route to fetch deviceId for logged-in user
app.get("/user/deviceId", verifyToken, (req, res) => {
  const email = req.email;

  // Query to fetch deviceId based on userId
  const query = `SELECT deviceId FROM ALL_USERS WHERE email = ?`;

  db.query(query, [email], (error, results) => {
    if (error) {
      console.error("Error fetching deviceId:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "DeviceId not found for the user" });
    }

    const deviceId = results[0].deviceId;
    res.json({ deviceId });
  });
});

app.get("/user/products", verifyToken, (req, res) => {
  const email = req.email;

  // Query to fetch deviceId based on userId
  const query = `SELECT deviceId FROM ALL_USERS WHERE email = ?`;

  db.query(query, [email], (error, results) => {
    if (error) {
      console.error("Error fetching deviceId:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "DeviceId not found for the user" });
    }

    const deviceId = results[0].deviceId;
    console.log(deviceId);

    const queryProducts = "SELECT * FROM product WHERE deviceId = ?";

    db.query(queryProducts, [deviceId], (error, results) => {
      if (error) {
        console.error("Error fetching products:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.json(results);
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
