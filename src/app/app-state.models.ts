import { DashboardState } from "./pages/dashboard/stores/dashboard.state";
import { NotificationState } from "./pages/notification/store/notification.state";
import { AuthState } from "./pages/auth/store/auth.state";

export const appState = [AuthState, NotificationState, DashboardState];
export const appStoredState = [AuthState];
