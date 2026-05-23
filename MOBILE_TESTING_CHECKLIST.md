# Mobile Testing Checklist

Target small Android dimensions first, then iOS simulator and physical device.

## Configuration

- Local Android emulator uses `http://10.0.2.2:4028/api`.
- iOS simulator uses `http://localhost:4028/api`.
- Physical device uses your computer LAN IP, for example `http://192.168.1.10:4028/api`.
- Production builds use the deployed backend URL.
- Confirm `nivaasCredApp/src/config/api.ts` has the correct `API_TARGET`.

## Auth

- Register tenant.
- Register landlord.
- Login as tenant.
- Login as landlord.
- Restart app and confirm session restoration.
- Confirm expired access token refreshes once.
- Logout clears the session.
- Forgot password button is disabled and marked Coming Soon.

## Tenant Flow

- Browse property list.
- Search/filter property list.
- Open property details.
- Apply with message and move-in date.
- Confirm duplicate application error is visible.
- View application status in Applications.
- View rental history after landlord creates it.
- Review landlord.
- Request review from landlord.
- View received and given reviews.
- View score and recalculate.
- Submit identity/income/bank verification with placeholder document URL.

## Landlord Flow

- View property count on home.
- Add property.
- Edit property.
- Delete property with confirmation.
- View tenant requests.
- Shortlist application.
- Approve application using `approved`.
- Reject application with confirmation.
- Create rental history from approved application.
- View landlord rental history.
- Update rental status: `active`, `completed`, `terminated`.
- Review tenant.
- Request review from tenant.
- View score and recalculate.
- Submit landlord verification.
- Request property verification.

## UX States

- Pull-to-refresh works on list pages.
- Loading states show while API requests run.
- Empty states show for empty lists.
- Error states include retry where useful.
- Submit buttons disable while requests are pending.
- Small-screen layout does not overlap or hide primary actions.

## Security Checks

- Tenant cannot open landlord tabs after login.
- Landlord cannot open tenant tabs after login.
- Mobile services do not manually store tokens.
- Refresh token is stored only through `react-native-keychain`.
