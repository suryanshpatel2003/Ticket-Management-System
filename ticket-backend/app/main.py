from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.models import user_model, ticket_model
from app.routes import auth_routes, ticket_routes

app = FastAPI()

# ✅ CORS (VERY IMPORTANT for frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # production me specific domain dena
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Create tables
Base.metadata.create_all(bind=engine)

# ✅ Routes
app.include_router(auth_routes.router, prefix="/auth", tags=["Auth"])
app.include_router(ticket_routes.router, prefix="/tickets", tags=["Tickets"])

# ✅ Health check
@app.get("/")
def home():
    return {"message": "Backend Running 🚀"}