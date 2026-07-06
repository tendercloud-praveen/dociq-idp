from app.repository.login_history import (
    get_user_by_email,
    get_user_by_mobile,
    create_login_history
)

from app.models.login_history import LoginHistory


def login_user(db, username: str, password: str):

    # Check whether the user entered an email or mobile number
    if "@" in username:
        user = get_user_by_email(db, username)
        login_method = "Email"
    else:
        user = get_user_by_mobile(db, username)
        login_method = "Mobile"

    # User not found
    if user is None:
        return {
            "success": False,
            "message": "User not found"
        }

    # Password verification
    if user.password != password:
        return {
            "success": False,
            "message": "Invalid password"
        }

    # Save login history
    history = LoginHistory(
        user_id=user.id,
        login_method=login_method
    )

    create_login_history(db, history)

    # Login successful
    return {
        "success": True,
        "message": "Login Successful",
        "user": user
    }