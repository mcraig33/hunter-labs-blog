from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from .database import Base


class Account(Base):
    __tablename__ = "accounts"

    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)

    blogs = relationship("Blog", back_populates="account")
    posts = relationship("Post", back_populates="account")


class Blog(Base):
    __tablename__ = "blogs"

    id = Column(Integer, primary_key=True)
    title = Column(String, index=True)
    content = Column(String)
    account_id = Column(Integer, ForeignKey("accounts.id"))

    account = relationship("Account", back_populates="blogs")
    posts = relationship("Post", back_populates="blog")

class Post(Base):
    __tablename__ = "posts"

    id = Column(Integer, primary_key=True)
    content = Column(String)
    account_id = Column(Integer, ForeignKey("accounts.id"))
    blog_id = Column(Integer, ForeignKey("blogs.id") )

    account = relationship("Account", back_populates="posts")
    blog = relationship("Blog", back_populates="posts")