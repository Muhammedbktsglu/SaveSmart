# Save Smart - Personal Budget and Expense Tracking Application  

Save Smart is developed as part of the **2N Tech Case Study** to address personal budgeting and expense tracking. The application enables users to add and categorize their income and expenses, set budget limits, and analyze financial data through interactive reports.  

## Purpose  

The primary objective of this project was to implement features defined in the case study while adhering to modern front-end development practices. The focus was on creating a responsive, user-friendly, and visually appealing application for managing finances effectively.  

---

## Features Accomplished  

### Completed Features  

- **Income and Expense Management**  
  - Users can add income and expense transactions with descriptions, amounts, dates, and categories.  
  - Categorization of expenses (e.g., Salary, Investment, Rent, Utilities).  

- **Interactive Reports**  
  - Pie charts for category-based expenses.  
  - Bar charts for comparing income vs. expenses.  

- **Multi-Language Support**  
  - Support for English and Turkish languages.  

- **User Profiles**  
  - Simulated user roles: `Admin`, `Moderator`, and `User`.  
  - Profile pictures displayed in transactions and header.  

- **Responsive Design**  
  - Optimized for desktop, tablet, and mobile views.  

- **Local Data Storage**  
  - Transactions persist in `localStorage` for offline usability.  

---

## To Be Implemented (Pending Features)  

- [ ] **Budget Limits and Warnings**  
  - Allow users to set budget limits for categories.  
  - Notify users when spending reaches 80% of the set limit.  

- [ ] **Export Reports**  
  - Enable users to export financial reports as PDFs.  

- [ ] **Savings Suggestions**  
  - Provide tips or suggestions for saving based on user spending patterns.  

- [ ] **Dark Mode Support**  
  - Enhance user experience with a dark mode theme toggle.  

---

## Technologies Used  

- **Framework**: Next.js  
- **State Management**: Context API  
- **Styling**: Tailwind CSS  
- **Data Storage**: Local Storage  
- **Data Visualization**: Recharts  
- **Date Handling**: `date-fns`  

---

## Getting Started  

Follow the steps below to run the project locally:  

1. Clone the repository:  
   ```bash  
   git clone https://github.com/yourusername/save-smart.git  
   cd save-smart  
   ```  

2. Install dependencies:  
   ```bash  
   npm install  
   ```  

3. Start the development server:  
   ```bash  
   npm run dev  
   ```  

4. Open your browser and visit:  
   ```
   http://localhost:3000  
   ```  


## Conclusion  

Save Smart successfully fulfills many of the core requirements outlined in the 2N Tech Case Study. Further enhancements and pending features will ensure the application becomes even more robust and practical for everyday users.  

