# Web Testing Checklist

## Public Pages

- `/homepage`
- `/property-listings`
- `/property-details/:id`
- `/how-it-works`
- `/safety-and-trust`
- `/credit-score`
- `/about`
- `/support`
- `/help-center`
- `/legal/terms`
- `/legal/privacy`

## Auth

- Register tenant.
- Register landlord.
- Confirm public registration blocks `admin` and `superadmin`.
- Login tenant.
- Login landlord.
- Logout.
- Refresh token renews session through httpOnly cookie.
- `/api/auth/me` returns safe user/profile data only.

## Tenant Flow

- Tenant dashboard loads.
- Browse/find home.
- Open property detail.
- Apply for property.
- Duplicate application shows useful error.
- View `/tenant/applications`.
- View `/tenant/rental-history`.
- Review landlord.
- Request review.
- View `/tenant/reviews`.
- View and recalculate `/tenant/score`.
- Submit `/tenant/verification`.

## Landlord Flow

- Landlord dashboard loads.
- Add property.
- Edit property.
- Delete property with confirmation.
- Verify property.
- View `/landlord/tenant-requests`.
- Shortlist application.
- Approve application using `approved`.
- Reject application.
- Create rental history.
- View `/landlord/rental-history`.
- Update rental history status.
- Review tenant.
- Request review.
- View `/landlord/reviews`.
- View and recalculate `/landlord/score`.
- Submit `/landlord/verification`.

## Admin Flow

- Seed superadmin with `npm run seed:superadmin`.
- Login superadmin.
- Open `/admin/dashboard`.
- Open `/admin/verifications`.
- Approve verification.
- Reject verification with reason.
- Open `/admin/scores`.
- Recalculate selected user score.
- Confirm tenant and landlord users are blocked from `/admin/*`.

## Responsive Checks

- Public pages at mobile width.
- Tenant dashboard at mobile width.
- Landlord dashboard at mobile width.
- Forms do not overflow.
- Buttons and badges do not overlap text.

## Sensitive Data Checks

- No API payload includes `passwordHash`.
- No API payload includes `refreshTokenHash`.
- Browser storage does not contain auth tokens.
- Auth cookies are httpOnly.
