await connectDB()
await connectCloudinary()

//Middlewares
app.use(cors())
app.use(express.json())
// Apply Clerk ONLY to user routes
app.use('/api/users', clerkMiddleware())
//app.use('/api/users', clerkMiddleware(), userRoutes)
//app.use(clerkMiddleware())
//app.use(clerkMiddleware())
//Routes
app.get('/',(req,res)=> res.send("API Working"))
app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});
app.post('/webhooks',clerkWebhooks)
app.use('/api/company',companyRoutes)
app.use('/api/jobs',jobRoutes)
app.use('/api/users', userRoutes)

//port
const PORT=process.env.PORT || 5000

Sentry.setupExpressErrorHandler(app);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
