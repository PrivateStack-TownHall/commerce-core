export interface AuditLog {
  id: string;

  appId: string;
  appName: string;
  appEmoji: string;

  action: string;
  target: string;

  createdAt: string;
}
