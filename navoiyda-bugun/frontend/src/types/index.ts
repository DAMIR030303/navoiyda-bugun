// User types
export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  role: UserRole;
  department?: string;
  position?: string;
  employeeId?: string;
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

export enum UserRole {
  FOUNDER = "founder",
  CEO = "ceo",
  HR_MANAGER = "hr_manager",
  PROJECT_MANAGER = "project_manager",
  MARKETING_MANAGER = "marketing_manager",
  SALES_MANAGER = "sales_manager",
  MOBILOGRAPHER = "mobilographer",
  BRAND_FACE = "brand_face",
  SCREENWRITER = "screenwriter",
  EMPLOYEE = "employee",
  ADMIN = "admin",
}

// Auth types
export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Attendance types
export interface Attendance {
  id: string;
  userId: string;
  date: string;
  checkIn?: string;
  checkOut?: string;
  status: AttendanceStatus;
  notes?: string;
  location?: string;
  createdAt: string;
  updatedAt: string;
}

export enum AttendanceStatus {
  PRESENT = "present",
  ABSENT = "absent",
  LATE = "late",
  HALF_DAY = "half_day",
  LEAVE = "leave",
}

// Task types
export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignedTo: string[];
  assignedBy: string;
  dueDate?: string;
  completedAt?: string;
  tags?: string[];
  attachments?: string[];
  createdAt: string;
  updatedAt: string;
}

export enum TaskStatus {
  TODO = "todo",
  IN_PROGRESS = "in_progress",
  REVIEW = "review",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

export enum TaskPriority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  URGENT = "urgent",
}

// KPI types
export interface KPI {
  id: string;
  userId: string;
  period: string; // monthly, quarterly, yearly
  metrics: KPIMetrics;
  score: number;
  target: number;
  achieved: number;
  createdAt: string;
  updatedAt: string;
}

export interface KPIMetrics {
  attendance: number;
  taskCompletion: number;
  productivity: number;
  quality: number;
  teamwork: number;
  innovation: number;
}

// Project types
export interface Project {
  id: string;
  name: string;
  description?: string;
  status: ProjectStatus;
  priority: ProjectPriority;
  startDate: string;
  endDate?: string;
  assignedTo: string[];
  manager: string;
  budget?: number;
  progress: number;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

export enum ProjectStatus {
  PLANNING = "planning",
  ACTIVE = "active",
  ON_HOLD = "on_hold",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

export enum ProjectPriority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  CRITICAL = "critical",
}

// Marketing types
export interface MarketingCampaign {
  id: string;
  name: string;
  description?: string;
  type: CampaignType;
  status: CampaignStatus;
  startDate: string;
  endDate?: string;
  budget: number;
  spent: number;
  targetAudience?: string;
  channels: string[];
  metrics: CampaignMetrics;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export enum CampaignType {
  SOCIAL_MEDIA = "social_media",
  EMAIL = "email",
  SEO = "seo",
  PPC = "ppc",
  CONTENT = "content",
  EVENT = "event",
}

export enum CampaignStatus {
  DRAFT = "draft",
  ACTIVE = "active",
  PAUSED = "paused",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

export interface CampaignMetrics {
  impressions: number;
  clicks: number;
  conversions: number;
  ctr: number;
  cpc: number;
  roi: number;
}

// Sales types
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  status: CustomerStatus;
  source: string;
  assignedTo: string;
  tags?: string[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export enum CustomerStatus {
  LEAD = "lead",
  PROSPECT = "prospect",
  CUSTOMER = "customer",
  INACTIVE = "inactive",
}

export interface Sale {
  id: string;
  customerId: string;
  amount: number;
  status: SaleStatus;
  stage: SaleStage;
  assignedTo: string;
  expectedCloseDate?: string;
  closedDate?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export enum SaleStatus {
  OPEN = "open",
  WON = "won",
  LOST = "lost",
  CANCELLED = "cancelled",
}

export enum SaleStage {
  LEAD = "lead",
  CONTACT = "contact",
  PROPOSAL = "proposal",
  NEGOTIATION = "negotiation",
  CLOSED = "closed",
}

// Content types
export interface Content {
  id: string;
  title: string;
  description?: string;
  type: ContentType;
  status: ContentStatus;
  platform: string[];
  scheduledDate?: string;
  publishedDate?: string;
  createdBy: string;
  assignedTo?: string[];
  tags?: string[];
  attachments?: string[];
  metrics?: ContentMetrics;
  createdAt: string;
  updatedAt: string;
}

export enum ContentType {
  POST = "post",
  VIDEO = "video",
  IMAGE = "image",
  ARTICLE = "article",
  STORY = "story",
  REEL = "reel",
}

export enum ContentStatus {
  DRAFT = "draft",
  REVIEW = "review",
  APPROVED = "approved",
  SCHEDULED = "scheduled",
  PUBLISHED = "published",
  ARCHIVED = "archived",
}

export interface ContentMetrics {
  views: number;
  likes: number;
  shares: number;
  comments: number;
  engagement: number;
}

// Notification types
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  data?: Record<string, any>;
  createdAt: string;
}

export enum NotificationType {
  INFO = "info",
  SUCCESS = "success",
  WARNING = "warning",
  ERROR = "error",
  TASK = "task",
  ATTENDANCE = "attendance",
  KPI = "kpi",
  PROJECT = "project",
  MARKETING = "marketing",
  SALES = "sales",
}

// Report types
export interface Report {
  id: string;
  name: string;
  type: ReportType;
  description?: string;
  createdBy: string;
  filters: ReportFilters;
  schedule?: ReportSchedule;
  recipients: string[];
  lastGenerated?: string;
  createdAt: string;
  updatedAt: string;
}

export enum ReportType {
  ATTENDANCE = "attendance",
  KPI = "kpi",
  PROJECT = "project",
  MARKETING = "marketing",
  SALES = "sales",
  FINANCIAL = "financial",
  CUSTOMER = "customer",
  SYSTEM = "system",
}

export interface ReportFilters {
  dateRange?: {
    start: string;
    end: string;
  };
  departments?: string[];
  users?: string[];
  status?: string[];
  [key: string]: any;
}

export interface ReportSchedule {
  frequency: "daily" | "weekly" | "monthly" | "quarterly" | "yearly";
  dayOfWeek?: number; // 0-6 for weekly
  dayOfMonth?: number; // 1-31 for monthly
  time: string; // HH:mm format
  timezone: string;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  pagination?: Pagination;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// Form types
export interface FormField {
  name: string;
  label: string;
  type:
    | "text"
    | "email"
    | "password"
    | "number"
    | "textarea"
    | "select"
    | "checkbox"
    | "radio"
    | "date"
    | "file";
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  validation?: any;
}

// Chart types
export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
  }[];
}

// Dashboard types
export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalProjects: number;
  activeProjects: number;
  totalTasks: number;
  completedTasks: number;
  totalSales: number;
  monthlySales: number;
  totalCustomers: number;
  newCustomers: number;
}

// Settings types
export interface UserSettings {
  theme: "light" | "dark" | "auto";
  language: "uz" | "ru" | "en";
  notifications: {
    email: boolean;
    push: boolean;
    telegram: boolean;
  };
  timezone: string;
  dateFormat: string;
  timeFormat: "12h" | "24h";
}

// Error types
export interface ApiError {
  message: string;
  code?: string;
  details?: Record<string, any>;
}

// File types
export interface FileUpload {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  uploadedBy: string;
  uploadedAt: string;
}

// Search types
export interface SearchFilters {
  query?: string;
  type?: string;
  status?: string;
  dateRange?: {
    start: string;
    end: string;
  };
  assignedTo?: string;
  tags?: string[];
}

// Export types
export interface ExportOptions {
  format: "pdf" | "excel" | "csv";
  includeCharts?: boolean;
  includeData?: boolean;
  dateRange?: {
    start: string;
    end: string;
  };
}
