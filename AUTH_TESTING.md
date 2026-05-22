# Auth API Testing Guide

Base URL: `http://localhost:4028`

All responses set `access_token` and `refresh_token` as **httpOnly cookies**. Use `-c cookies.txt` to save cookies and `-b cookies.txt` to send them.

---

## 1. Health Check

```bash
curl http://localhost:4028/api/health
```

Expected: `200 { success: true, database: "connected" }`

---

## 2. Register

```bash
curl -s -c cookies.txt -X POST http://localhost:4028/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Rahul Sharma",
    "email": "rahul@example.com",
    "phone": "9876543210",
    "password": "SecurePass123",
    "role": "tenant"
  }' | jq .
```

**Role must be `tenant` or `landlord`** (accepts uppercase too: `TENANT`, `LANDLORD`).

Expected: `201 { success: true, data: { user: {...} } }` + cookies set

**Duplicate email:**
```bash
curl -s -X POST http://localhost:4028/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Test","email":"rahul@example.com","password":"pass1234","role":"tenant"}' | jq .
```
Expected: `409 { success: false, message: "Email is already registered" }`

**Validation error (short password):**
```bash
curl -s -X POST http://localhost:4028/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"fullName":"T","email":"bad","password":"short","role":"admin"}' | jq .
```
Expected: `422 { success: false, errors: { fullName: "...", email: "...", ... } }`

---

## 3. Login

```bash
curl -s -c cookies.txt -X POST http://localhost:4028/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "rahul@example.com",
    "password": "SecurePass123"
  }' | jq .
```

Expected: `200 { success: true, data: { user: {...} } }` + cookies set

**Wrong password:**
```bash
curl -s -X POST http://localhost:4028/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"rahul@example.com","password":"wrongpass"}' | jq .
```
Expected: `401 { success: false, message: "Invalid email or password" }`

---

## 4. Get Current User

```bash
curl -s -b cookies.txt http://localhost:4028/api/auth/me | jq .
```

Expected: `200 { success: true, data: { user: {...}, profile: {...} } }`

**Without cookie:**
```bash
curl -s http://localhost:4028/api/auth/me | jq .
```
Expected: `401 { success: false, message: "Unauthorized" }`

---

## 5. Refresh Token

```bash
curl -s -b cookies.txt -c cookies.txt -X POST \
  http://localhost:4028/api/auth/refresh-token | jq .
```

Expected: `200 { success: true, data: { user: {...} } }` + new cookies set

---

## 6. Logout

```bash
curl -s -b cookies.txt -c cookies.txt -X POST \
  http://localhost:4028/api/auth/logout | jq .
```

Expected: `200 { success: true, message: "Logged out successfully" }` + cookies cleared

**Verify session is gone:**
```bash
curl -s -b cookies.txt http://localhost:4028/api/auth/me | jq .
```
Expected: `401`

---

## Full Flow Example

```bash
# Start fresh
rm -f cookies.txt

# 1. Register as landlord
curl -s -c cookies.txt -X POST http://localhost:4028/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Anita Singh","email":"anita@example.com","password":"LandlordPass1","role":"landlord"}' | jq .

# 2. Get profile
curl -s -b cookies.txt http://localhost:4028/api/auth/me | jq .

# 3. Refresh tokens
curl -s -b cookies.txt -c cookies.txt -X POST http://localhost:4028/api/auth/refresh-token | jq .

# 4. Logout
curl -s -b cookies.txt -c cookies.txt -X POST http://localhost:4028/api/auth/logout | jq .

# 5. Verify logged out
curl -s -b cookies.txt http://localhost:4028/api/auth/me | jq .
```

---

## Notes

- `passwordHash` and `refreshTokenHash` are **never** returned in any response
- Cookies are `httpOnly; SameSite=Lax; Secure` (Secure only in production)
- Access token expires in 15 minutes; refresh token expires in 7 days
- Single-device session: logging in from a new device invalidates the previous session
- Token reuse on refresh triggers session invalidation (security measure)
