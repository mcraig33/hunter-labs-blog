from pydantic import BaseModel


class ItemBase(BaseModel):
    content: str
    account_id: int

class Blog(ItemBase):
    id: int
    title: str

    class Config:
        orm_mode = True

class Post(ItemBase):
    id: int
    blog_id: int

    class Config:
        orm_mode = True

class PostCreate(ItemBase):
    blog_id: int

    class Config:
         orm_mode: True

class AccountBase(BaseModel):
    email: str


class AccountCreate(AccountBase):
    password: str


class Account(AccountBase):
    id: int
    blogs: list[Blog] = []
    posts: list[Post] = []

    class Config:
        orm_mode = True