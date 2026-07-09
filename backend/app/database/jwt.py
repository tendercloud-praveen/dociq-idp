from datetime import datetime, timedelta

from jose import jwt, JWTError

from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials


SECRET_KEY = "your_secret_key_here_change_this_to_a_long_random_string"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

security = HTTPBearer()


# ===========================
# Create JWT Token
# ===========================
def create_access_token(data: dict):

    to_encode = data.copy()

    expire = datetime.utcnow() + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    to_encode.update({"exp": expire})

    token = jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return token


# ===========================
# Get Logged-in User
# ===========================
def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):

    try:

        token = credentials.credentials

        # print("\n========== JWT DEBUG ==========")
        # print("Received Token:")
        # print(token)

        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        # print("\nDecoded Payload:")
        # print(payload)
        # print("===============================\n")

        return {
            "id": payload.get("sub"),
            "email": payload.get("email"),
            "role": payload.get("role")
        }

    except JWTError as e:

        # print("\n========== JWT ERROR ==========")
        # print(e)
        # print("===============================\n")

        raise HTTPException(
            status_code=401,
            detail="Invalid or Expired Token"
        )