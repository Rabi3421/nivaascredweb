/** Mirrors the `rent_payments` sub-documents (also stored as separate collection) */
export interface RentPayment {
  _id: string;
  rentalId: string; // ref → rental_histories
  amount: number;
  dueDate: string; // ISO date
  paidDate?: string; // ISO date
  lateFee?: number;
  status: "pending" | "paid" | "late" | "missed";
  method?: "upi" | "bank_transfer" | "cash" | "cheque";
  transactionId?: string;
  receiptUrl?: string; // S3 URL
  createdAt: string;
  updatedAt: string;
}

/** Mirrors the `rental_histories` collection */
export interface RentalHistoryDocument {
  _id: string;
  tenantId: string; // ref → users
  landlordId: string; // ref → users
  propertyId: string; // ref → properties
  applicationId: string; // ref → applications
  monthlyRent: number;
  maintenanceCharges?: number;
  securityDeposit: number;
  startDate: string; // ISO date
  endDate?: string; // ISO date — null if still active
  status: "active" | "completed" | "terminated";
  terminationReason?: string;
  terminatedBy?: "tenant" | "landlord";
  agreementUrl?: string; // S3 URL
  payments: RentPayment[];
  landlordReviewId?: string; // ref → reviews (landlord reviewed tenant)
  tenantReviewId?: string; // ref → reviews (tenant reviewed landlord)
  createdAt: string;
  updatedAt: string;
}

/** Summary used in dashboard widgets */
export interface RentalSummary {
  rentalId: string;
  property: {
    id: string;
    title: string;
    image: string;
    location: string;
  };
  counterpartyName: string; // landlord name (for tenant view) or tenant name (for landlord view)
  monthlyRent: number;
  startDate: string;
  endDate?: string;
  status: RentalHistoryDocument["status"];
  nextPaymentDue?: string; // ISO date
  nextPaymentAmount?: number;
}
