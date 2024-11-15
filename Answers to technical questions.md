# Answers to Technical Questions

## 1. How long did you spend on the coding test?

I spent 6 hours working on the task manager application. Initially, I focused on planning the features, then moved to setting up the UI and implementing the core functionality. The task manager involved handling features like task creation, task editing, deletion, and categorization based on priority and status. Throughout the process, I also ensured a seamless user experience, and I spent time refining the design and functionality, particularly working on validations and user input handling.

## 2. What was the most useful feature that was added to the latest version of your chosen language? Please include a snippet of code that shows how you've used it.

In the latest versions of JavaScript (ES6+), one useful feature is the ability to use middleware functions to enhance database operations. In MongoDB, using Mongoose, middleware allows us to run operations before or after actions like saving, updating, or removing documents. Specifically, pre-save middleware helps automate tasks like password hashing before storing sensitive data.

In my project, I implemented pre-save middleware to automatically hash a user's password before saving it to the database. This ensures that passwords are stored securely without needing manual intervention each time a user is created or updated.

### Example Code:


```javascript
import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    fullName: { type: String, required: true, trim: true, index: true },
    avatar: { type: String, required: true },
    password: { type: String, required: [true, 'Password is required'] },
    refreshToken: { type: String }
  },
  { timestamps: true }
);

// Pre-save middleware to hash password
userSchema.pre("save", async function(next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Method to compare password
userSchema.methods.isPasswordCorrect = async function() {
  return await bcrypt.compare(this.password, this.password);
};

// Method to generate access token
userSchema.methods.generateAccessToken = function() {
  return jwt.sign({
    _id: this.id,
    email: this.email,
    username: this.username,
    fullName: this.fullName,
  }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXP });
};

// Method to generate refresh token
userSchema.methods.generateRefreshToken = function() {
  return jwt.sign({ _id: this.id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXP });
};

export const User = mongoose.model("User", userSchema);





```

## 3.How would you track down a performance issue in production? Have you ever had to do this?
I haven’t directly worked on production issues, but I would approach it by first identifying the problem through logs or monitoring tools, checking for common bottlenecks like slow queries or high resource usage, and reviewing recent code changes. I’d use profiling tools to locate the bottleneck, then optimize and test the solution. Finally, I’d document the process to learn from the experience. Though my experience is in a development environment, I’m confident in my troubleshooting skills and eager to apply them in real-world scenarios.

## 4.If you had more time, what additional features or improvements would you consider adding to the task management application?
  I have implemented all the key features that were requested for the task management application, including task creation, editing, deletion, priority setting, and task completion toggling. Additionally, I’ve worked on providing a user-friendly UI, with clear visual cues for task status, and incorporated features like date pickers and priority selection for each task.

However, if I had more time or the freedom to enhance the application further, I would consider adding the following features:

User Authentication and Authorization: Allow users to create accounts, log in, and have their tasks saved across devices. This would enable different users to manage their tasks independently.

Task Reminders/Notifications: Implement push notifications or email reminders for upcoming tasks or deadlines to help users stay on top of their to-do lists.

Drag-and-Drop Task Sorting: Implement drag-and-drop functionality to reorder tasks within categories like 'Pending', 'In Progress', and 'Completed'.

Dark Mode: Add a dark mode toggle to improve the user experience, especially for users who prefer to work in low-light environments.

Task Subtasks and Dependencies: Allow users to break down tasks into smaller subtasks and manage dependencies between tasks.

Data Visualization: Provide charts or graphs to help users visualize their task progress, such as completion rates or upcoming deadlines.

Integration with Calendar: Integrate the application with a calendar (such as Google Calendar) to help users manage their tasks alongside their appointments.

Collaboration and Sharing: Enable users to collaborate on tasks by sharing tasks with team members or assigning tasks to different users within the app.