To test: https://documenter.getpostman.com/view/34621953/2sA3rwLYuN
1. Clone the repository:

    
    git clone https://github.com/your-username/email-scheduler.git
    cd email-scheduler
    

2. Install the dependencies:

    sh
    npm install
    

3. Set up the environment variables:

    Create a .env file in the root directory and add the following:

   //env
   PORT=4001
DATABASE_URL="mongodb+srv://jmehta1404:Juhi12@cluster0.n7nihgl.mongodb.net/EMAILSCHEDULING?retryWrites=true&w=majority&appName=Cluster0"
EMAIL_USER=jmehta1404@gmail.com
EMAIL_PASS=ekcpknqufchuommk


    

4. Generate Prisma client:

    sh
    npx prisma generate
    

5. Start the server:

    sh
    npm start
    
