from pydantic import BaseModel, EmailStr, Field


class UserRegister(BaseModel):
    full_name: str = Field(..., min_length=3, max_length=100)
    company_name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    mobile_number: str = Field(..., min_length=10, max_length=15)
    role: str
    password: str = Field(..., min_length=8)
    confirm_password: str


class UserResponse(BaseModel):
    id: int
    full_name: str
    company_name: str
    email: EmailStr
    mobile_number: str
    role: str

    class Config:
        from_attributes = True




class ForgotPasswordRequest(BaseModel):
    email: EmailStr


class ResetPasswordRequest(BaseModel):
    token: str
    new_password: str = Field(..., min_length=8)
    confirm_password: str = Field(..., min_length=8)


class SendOTPRequest(BaseModel):
    email: EmailStr

class VerifyOTPRequest(BaseModel):
    email: EmailStr
    otp: str


class ResetPasswordOTPRequest(BaseModel):
    email: EmailStr
    otp: str
    new_password: str = Field(..., min_length=8)
    confirm_password: str = Field(..., min_length=8)