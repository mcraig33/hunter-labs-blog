from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from . import crud, models, schemas
from .database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/accounts/", response_model=schemas.Account)
def create_user(account: schemas.AccountCreate, db: Session = Depends(get_db)):
    db_account = crud.get_account_by_email(db, email=user.account)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_account(db=db, account=account)


@app.get("/accounts/", response_model=list[schemas.Account])
def read_accounts(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    accounts = crud.get_accounts(db, skip=skip, limit=limit)
    return accounts


@app.get("/accounts/{account_id}", response_model=schemas.Account)
def read_account(account_id: int, db: Session = Depends(get_db)):
    db_account = crud.get_account(db, account_id=account_id)
    if db_account is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_account


@app.post("/accounts/{account_id}/posts/", response_model=schemas.Post)
def create_post_for_account(
    account_id: int, post: schemas.Post, db: Session = Depends(get_db)
):
    return crud.create_post(db=db, post=post, account_id=account_id)


@app.get("/blogs/", response_model=list[schemas.Blog])
def read_blogs(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    blogs = crud.get_blogs(db, skip=skip, limit=limit)
    return blogs

@app.get("/blogs/{blog_id}", response_model=schemas.Blog)
def read_blog(blog_id = int, db: Session = Depends(get_db)):
    blog = crud.get_blog(db, blog_id = blog_id)
    return blog

@app.get("posts/{blog_id}", response_model=list[schemas.Post])
def read_posts(blog_id: int, skip: int=0, limit: int=100, db: Session = Depends(get_db)):
    posts = crud.get_posts(db, blog_id==blog_id, skip = skip, limit=limit)
    return posts