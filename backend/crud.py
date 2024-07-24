from sqlalchemy.orm import Session

from . import models, schemas


def get_account(db: Session, account_id: int):
    return db.query(models.Account).filter(models.Account.id == account_id).first()


def get_account_by_email(db: Session, email: str):
    return db.query(models.Account).filter(models.Account.email == email).first()


def get_accounts(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Account).offset(skip).limit(limit).all()


def create_account(db: Session, account: schemas.AccountCreate):
    fake_hashed_password = user.password + "notreallyhashed"
    db_user = models.Account(email=account.email, hashed_password=fake_hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def get_blogs(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Blog).offset(skip).limit(limit).all()


def get_posts(db: Session, blog_id: int, skip: int = 0, limit: int = 100):
    return db.query(models.Blog).filter(models.Post.blog_id == blog_id).offset(skip).limit(limit).all()


def create_post(db: Session, post: schemas.Post, account_id: int, blog_id: int):
    db_post = models.Post(**item.dict(), account_id=account_id, blog_id = blog_id)
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    return db_post