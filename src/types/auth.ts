export type UserRole = 'user' | 'officer' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  district?: string;
  state?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
}

export interface FRAClaim {
  id: string;
  claimNumber: string;
  beneficiaryName: string;
  district: string;
  village: string;
  state: string;
  status: 'approved' | 'pending' | 'rejected';
  landArea: number;
  landType: 'agricultural' | 'forest' | 'water';
  coordinates: [number, number][];
  submittedDate: string;
  approvedDate?: string;
}