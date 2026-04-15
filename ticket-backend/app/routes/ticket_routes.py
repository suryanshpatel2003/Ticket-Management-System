from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Optional
from app.database import SessionLocal
from app.models.ticket_model import Ticket
from app.dependencies.auth import get_current_user

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ✅ CREATE
@router.post("/")
def create_ticket(title: str, description: str, priority: str, category: str,
                  user=Depends(get_current_user), db: Session = Depends(get_db)):

    ticket = Ticket(
        title=title,
        description=description,
        priority=priority,
        category=category,
        created_by=user["id"]
    )

    db.add(ticket)
    db.commit()
    return {"msg": "Ticket created"}

# ✅ GET ALL + FILTERS
@router.get("/")
def get_tickets(
    status: Optional[str] = None,
    priority: Optional[str] = None,
    category: Optional[str] = None,
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    query = db.query(Ticket)

    if user["role"] != "admin":
        query = query.filter(Ticket.created_by == user["id"])

    if status:
        query = query.filter(Ticket.status == status)
    if priority:
        query = query.filter(Ticket.priority == priority)
    if category:
        query = query.filter(Ticket.category == category)

    return query.all()

# ✅ GET BY ID
@router.get("/{id}")
def get_ticket(id: int, user=Depends(get_current_user), db: Session = Depends(get_db)):
    ticket = db.query(Ticket).filter(Ticket.id == id).first()

    if not ticket:
        raise HTTPException(404, "Not found")

    if user["role"] != "admin" and ticket.created_by != user["id"]:
        raise HTTPException(403, "Not allowed")

    return ticket

# ✅ UPDATE TICKET
@router.put("/{id}")
def update_ticket(id: int, title: str, description: str,
                  user=Depends(get_current_user), db: Session = Depends(get_db)):

    ticket = db.query(Ticket).filter(Ticket.id == id).first()

    if not ticket:
        raise HTTPException(404, "Not found")

    if user["role"] != "admin" and ticket.created_by != user["id"]:
        raise HTTPException(403, "Not allowed")

    ticket.title = title
    ticket.description = description
    db.commit()

    return {"msg": "Updated"}

# ✅ STATUS UPDATE (ADMIN)
@router.patch("/{id}/status")
def update_status(id: int, status: str,
                  user=Depends(get_current_user), db: Session = Depends(get_db)):

    if user["role"] != "admin":
        raise HTTPException(403, "Only admin")

    ticket = db.query(Ticket).filter(Ticket.id == id).first()
    ticket.status = status
    db.commit()

    return {"msg": "Status updated"}

# ✅ DELETE
@router.delete("/{id}")
def delete_ticket(id: int, user=Depends(get_current_user), db: Session = Depends(get_db)):

    ticket = db.query(Ticket).filter(Ticket.id == id).first()

    if not ticket:
        raise HTTPException(404, "Not found")

    if user["role"] != "admin" and ticket.created_by != user["id"]:
        raise HTTPException(403, "Not allowed")

    db.delete(ticket)
    db.commit()

    return {"msg": "Deleted"}

# ✅ ADMIN STATS
@router.get("/admin/stats")
def admin_stats(user=Depends(get_current_user), db: Session = Depends(get_db)):

    if user["role"] != "admin":
        raise HTTPException(403, "Only admin")

    total = db.query(Ticket).count()
    open_tickets = db.query(Ticket).filter(Ticket.status == "open").count()
    closed = db.query(Ticket).filter(Ticket.status == "closed").count()

    return {
        "total": total,
        "open": open_tickets,
        "closed": closed
    }


@router.post("/")
def create_ticket(title: str, description: str, priority: str, category: str,
                  user=Depends(get_current_user), db: Session = Depends(get_db)):

    ticket = Ticket(
        title=title,
        description=description,
        priority=priority,
        category=category,
        created_by=user["id"]
    )

    db.add(ticket)
    db.commit()

    return {"msg": "Ticket created"}

@router.patch("/{id}/assign")
def assign_ticket(id: int, user_id: int,
                  user=Depends(get_current_user),
                  db: Session = Depends(get_db)):

    if user["role"] != "admin":
        raise HTTPException(403, "Only admin")

    ticket = db.query(Ticket).filter(Ticket.id == id).first()

    ticket.assigned_to = user_id
    db.commit()

    return {"msg": "Assigned"}