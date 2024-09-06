# Personal Expense Tracker using MEAN Stack

## Repository Branches
1. **main**: Contains the `README.md` file only.
2. **frontend**: Contains the frontend code written using Angular, PrimeNG, and PrimeFlex.
3. **backend**: Contains the backend code written using Node.js, Express, and Mongoose.

## How to Run It

### 1. Clone the repository
```bash
git clone <repository_url>
```
### 2. Checkout the desired branch
```bash
git checkout <branch_name>
```

### 3. Use two different terminal windows.

| Step	| Terminal 1	| Terminal 2|
|-------|---------------|-----------|
|1|```git checkout frontend```|```git checkout backend```|
|2|Change the ```DB_URL``` in ```src/app/services/constant.ts```|Add the  ```.env``` file by referencing the ```.env.example``` file|
|3|```npm install && ng serve```|```npm install && npm run dev```|