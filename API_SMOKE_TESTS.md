# API Smoke Tests

Use this order for a clean local or staging smoke test. Preserve cookies between authenticated requests.

## 1. Health

```bash
curl http://localhost:4028/api/health
```

## 2. Register Landlord

```bash
curl -i -X POST http://localhost:4028/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName":"Smoke Landlord",
    "email":"smoke.landlord@example.com",
    "phone":"9876500001",
    "password":"StrongPass123!",
    "role":"landlord"
  }'
```

## 3. Register Tenant

```bash
curl -i -X POST http://localhost:4028/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName":"Smoke Tenant",
    "email":"smoke.tenant@example.com",
    "phone":"9876500002",
    "password":"StrongPass123!",
    "role":"tenant"
  }'
```

## 4. Login

```bash
curl -i -c cookies.txt -X POST http://localhost:4028/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"smoke.landlord@example.com","password":"StrongPass123!"}'
```

## 5. Add Property

```bash
curl -b cookies.txt -X POST http://localhost:4028/api/landlord/properties \
  -H "Content-Type: application/json" \
  -d '{
    "title":"Smoke Test 2BHK Apartment",
    "description":"A smoke test property with enough description text to satisfy validation rules.",
    "address":{"line1":"123 Test Street","locality":"Indiranagar","city":"Bangalore","state":"Karnataka","pincode":"560001"},
    "rentAmount":25000,
    "depositAmount":50000,
    "propertyType":"2BHK",
    "furnishingStatus":"semi_furnished",
    "bedrooms":2,
    "bathrooms":2,
    "images":[],
    "amenities":["Lift","Security"],
    "preferredTenants":["family"],
    "petsAllowed":false,
    "availabilityStatus":"available"
  }'
```

Save the returned property `_id`.

## 6. Tenant Login And Apply

```bash
curl -i -c tenant-cookies.txt -X POST http://localhost:4028/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"smoke.tenant@example.com","password":"StrongPass123!"}'
```

```bash
curl -b tenant-cookies.txt -X POST http://localhost:4028/api/applications \
  -H "Content-Type: application/json" \
  -d '{
    "propertyId":"PROPERTY_ID",
    "message":"I am interested in this property and can move in after verification.",
    "moveInDate":"2026-07-01"
  }'
```

Save the returned application `_id`.

## 7. Approve Application

```bash
curl -b cookies.txt -X PATCH http://localhost:4028/api/landlord/applications/APPLICATION_ID \
  -H "Content-Type: application/json" \
  -d '{"status":"approved","landlordNote":"Approved by smoke test"}'
```

## 8. Create Rental History

```bash
curl -b cookies.txt -X POST http://localhost:4028/api/landlord/rental-histories \
  -H "Content-Type: application/json" \
  -d '{
    "applicationId":"APPLICATION_ID",
    "startDate":"2026-07-01",
    "endDate":"2027-06-30",
    "monthlyRent":25000,
    "depositAmount":50000,
    "status":"active"
  }'
```

Save the returned rental history `_id`.

## 9. Create Review

```bash
curl -b cookies.txt -X POST http://localhost:4028/api/reviews \
  -H "Content-Type: application/json" \
  -d '{
    "rentalHistoryId":"RENTAL_HISTORY_ID",
    "rating":5,
    "title":"Reliable tenant",
    "comment":"The tenant was responsive and completed all onboarding steps on time.",
    "tags":["Responsive","Verified"]
  }'
```

## 10. Score Check

```bash
curl -b cookies.txt http://localhost:4028/api/score/me
```

```bash
curl -b tenant-cookies.txt http://localhost:4028/api/score/me
```

## 11. Verification Submit

```bash
curl -b tenant-cookies.txt -X POST http://localhost:4028/api/verifications \
  -H "Content-Type: application/json" \
  -d '{
    "type":"identity",
    "documentUrl":"https://example.com/aadhaar.pdf",
    "notes":"Smoke test identity document"
  }'
```

Save the returned verification `_id`.

## 12. Admin Approval

Log in as superadmin:

```bash
curl -i -c admin-cookies.txt -X POST http://localhost:4028/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"SUPERADMIN_EMAIL","password":"SUPERADMIN_PASSWORD"}'
```

Approve verification:

```bash
curl -b admin-cookies.txt -X PATCH http://localhost:4028/api/admin/verifications/VERIFICATION_ID \
  -H "Content-Type: application/json" \
  -d '{"status":"approved"}'
```

Confirm score still responds:

```bash
curl -b tenant-cookies.txt http://localhost:4028/api/score/me
```
