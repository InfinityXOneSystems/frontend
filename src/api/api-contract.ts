// Frontend-Backend API Contract for InfinityXOne System
// This contract defines all API endpoints, request/response types, and communication protocols

export interface ApiContract {
  // Base API configuration
  baseUrl: string;
  timeout: number;
  retries: number;

  // Authentication
  auth: AuthContract;

  // Core services
  orchestrator: OrchestratorContract;
  crawler: CrawlerContract;
  admin: AdminContract;
  agents: AgentsContract;
  prompts: PromptsContract;
  search: SearchContract;
  monitoring: MonitoringContract;

  // External integrations
  googleCloud: GoogleCloudContract;
  hostinger: HostingerContract;
  github: GithubContract;
}

// ============================================================================
// AUTHENTICATION CONTRACT
// ============================================================================

export interface AuthContract {
  // Google OAuth endpoints
  login(credentials?: { email: string; password: string }): Promise<AuthResponse>;
  logout(): Promise<SuccessResponse>;
  refresh(): Promise<AuthResponse>;
  verify(): Promise<UserProfile>;

  // JWT token management
  setToken(token: string): void;
  getToken(): string | null;
  isAuthenticated(): boolean;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  refreshToken: string;
  expiresIn: number;
  user: UserProfile;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
  permissions: Permission[];
  lastLogin: Date;
  createdAt: Date;
}

export type UserRole = 'admin' | 'user' | 'moderator' | 'viewer';
export type Permission = 'read' | 'write' | 'delete' | 'admin' | 'execute';

// ============================================================================
// ORCHESTRATOR CONTRACT
// ============================================================================

export interface OrchestratorContract {
  // Command execution
  execute(command: ExecuteRequest): Promise<ExecuteResponse>;

  // Task management
  getTasks(): Promise<Task[]>;
  getTask(id: string): Promise<Task>;
  cancelTask(id: string): Promise<SuccessResponse>;

  // System status
  getStatus(): Promise<SystemStatus>;
  getMetrics(): Promise<SystemMetrics>;
}

export interface ExecuteRequest {
  command: string;
  args?: string[];
  timeout?: number;
  priority?: 'low' | 'normal' | 'high' | 'critical';
}

export interface ExecuteResponse {
  success: boolean;
  taskId: string;
  output?: string;
  error?: string;
  executionTime: number;
}

export interface Task {
  id: string;
  command: string;
  status: TaskStatus;
  progress: number;
  startedAt: Date;
  completedAt?: Date;
  result?: any;
  error?: string;
}

export type TaskStatus = 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';

export interface SystemStatus {
  healthy: boolean;
  services: ServiceStatus[];
  uptime: number;
  version: string;
}

export interface ServiceStatus {
  name: string;
  status: 'online' | 'offline' | 'degraded';
  responseTime: number;
  lastCheck: Date;
}

export interface SystemMetrics {
  cpu: number;
  memory: number;
  disk: number;
  network: number;
  activeTasks: number;
  queuedTasks: number;
}

// ============================================================================
// CRAWLER CONTRACT
// ============================================================================

export interface CrawlerContract {
  // Crawler management
  startCrawler(config: CrawlerConfig): Promise<CrawlerResponse>;
  stopCrawler(id: string): Promise<SuccessResponse>;
  getCrawlers(): Promise<Crawler[]>;
  getCrawler(id: string): Promise<Crawler>;

  // Industry management
  getIndustries(): Promise<Industry[]>;
  getSubIndustries(industry: string): Promise<SubIndustry[]>;

  // Results
  getResults(crawlerId: string): Promise<CrawlerResults>;
  exportResults(crawlerId: string, format: ExportFormat): Promise<Blob>;
}

export interface CrawlerConfig {
  industry: string;
  subIndustries?: string[];
  maxPages?: number;
  maxDepth?: number;
  timeout?: number;
  userAgent?: string;
}

export interface CrawlerResponse {
  success: boolean;
  crawlerId: string;
  message: string;
}

export interface Crawler {
  id: string;
  industry: string;
  subIndustries: string[];
  status: CrawlerStatus;
  progress: number;
  pagesScraped: number;
  dataPoints: number;
  startedAt: Date;
  completedAt?: Date;
  config: CrawlerConfig;
}

export type CrawlerStatus = 'idle' | 'running' | 'paused' | 'completed' | 'failed';

export interface Industry {
  name: string;
  displayName: string;
  description: string;
  subIndustries: SubIndustry[];
}

export interface SubIndustry {
  name: string;
  displayName: string;
  description: string;
}

export interface CrawlerResults {
  totalPages: number;
  totalDataPoints: number;
  data: any[];
  metadata: {
    crawledAt: Date;
    industry: string;
    config: CrawlerConfig;
  };
}

export type ExportFormat = 'json' | 'csv' | 'xml' | 'xlsx';

// ============================================================================
// ADMIN CONTRACT
// ============================================================================

export interface AdminContract {
  // Dashboard data
  getDashboard(): Promise<DashboardData>;

  // User management
  getUsers(): Promise<User[]>;
  getUser(id: string): Promise<User>;
  updateUser(id: string, updates: Partial<User>): Promise<User>;
  deleteUser(id: string): Promise<SuccessResponse>;

  // Content management
  getContent(): Promise<Content[]>;
  createContent(content: CreateContentRequest): Promise<Content>;
  updateContent(id: string, content: UpdateContentRequest): Promise<Content>;
  deleteContent(id: string): Promise<SuccessResponse>;

  // Settings
  getSettings(): Promise<SystemSettings>;
  updateSettings(settings: Partial<SystemSettings>): Promise<SystemSettings>;
}

export interface DashboardData {
  users: {
    total: number;
    active: number;
    newToday: number;
  };
  content: {
    total: number;
    published: number;
    drafts: number;
  };
  system: {
    uptime: number;
    memory: number;
    cpu: number;
  };
  activities: Activity[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  status: 'active' | 'inactive' | 'suspended';
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Content {
  id: string;
  title: string;
  content: string;
  type: ContentType;
  status: ContentStatus;
  author: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
}

export type ContentType = 'page' | 'post' | 'article' | 'document';
export type ContentStatus = 'draft' | 'published' | 'archived';

export interface CreateContentRequest {
  title: string;
  content: string;
  type: ContentType;
  tags?: string[];
}

export interface UpdateContentRequest extends Partial<CreateContentRequest> {
  status?: ContentStatus;
}

export interface SystemSettings {
  siteName: string;
  siteDescription: string;
  maintenanceMode: boolean;
  allowRegistration: boolean;
  defaultUserRole: UserRole;
  emailSettings: EmailSettings;
  securitySettings: SecuritySettings;
}

export interface EmailSettings {
  smtpHost: string;
  smtpPort: number;
  smtpUser: string;
  smtpPassword: string;
  fromEmail: string;
  fromName: string;
}

export interface SecuritySettings {
  sessionTimeout: number;
  passwordMinLength: number;
  requireSpecialChars: boolean;
  maxLoginAttempts: number;
  lockoutDuration: number;
}

export interface Activity {
  id: string;
  type: ActivityType;
  description: string;
  user?: string;
  timestamp: Date;
  metadata?: any;
}

export type ActivityType = 'user_login' | 'user_logout' | 'content_created' | 'content_updated' | 'content_deleted' | 'settings_changed';

// ============================================================================
// AGENTS CONTRACT
// ============================================================================

export interface AgentsContract {
  // Agent management
  getAgents(): Promise<Agent[]>;
  getAgent(id: string): Promise<Agent>;
  runAgent(id: string, config?: AgentConfig): Promise<AgentExecution>;
  stopAgent(executionId: string): Promise<SuccessResponse>;

  // Agent templates
  getTemplates(): Promise<AgentTemplate[]>;
  createAgent(templateId: string, config: AgentConfig): Promise<Agent>;

  // Execution history
  getExecutions(agentId?: string): Promise<AgentExecution[]>;
  getExecution(id: string): Promise<AgentExecution>;
}

export interface Agent {
  id: string;
  name: string;
  type: AgentType;
  status: AgentStatus;
  config: AgentConfig;
  createdAt: Date;
  lastRun?: Date;
  successRate: number;
  totalRuns: number;
}

export type AgentType = 'automation' | 'analysis' | 'integration' | 'monitoring' | 'custom';

export type AgentStatus = 'idle' | 'running' | 'paused' | 'error' | 'disabled';

export interface AgentConfig {
  parameters: Record<string, any>;
  schedule?: ScheduleConfig;
  triggers?: TriggerConfig[];
  outputs?: OutputConfig[];
}

export interface ScheduleConfig {
  enabled: boolean;
  cron: string;
  timezone: string;
}

export interface TriggerConfig {
  type: 'webhook' | 'schedule' | 'event' | 'manual';
  config: Record<string, any>;
}

export interface OutputConfig {
  type: 'file' | 'database' | 'webhook' | 'email';
  destination: string;
  format: 'json' | 'csv' | 'xml';
}

export interface AgentExecution {
  id: string;
  agentId: string;
  status: ExecutionStatus;
  startedAt: Date;
  completedAt?: Date;
  result?: any;
  error?: string;
  logs: ExecutionLog[];
  metrics: ExecutionMetrics;
}

export type ExecutionStatus = 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';

export interface ExecutionLog {
  timestamp: Date;
  level: 'info' | 'warn' | 'error' | 'debug';
  message: string;
  metadata?: any;
}

export interface ExecutionMetrics {
  duration: number;
  memoryUsage: number;
  cpuUsage: number;
  apiCalls: number;
  dataProcessed: number;
}

export interface AgentTemplate {
  id: string;
  name: string;
  description: string;
  type: AgentType;
  defaultConfig: AgentConfig;
  requiredParams: string[];
  optionalParams: string[];
}

// ============================================================================
// PROMPTS CONTRACT
// ============================================================================

export interface PromptsContract {
  // Prompt management
  getPrompts(): Promise<Prompt[]>;
  getPrompt(id: string): Promise<Prompt>;
  executePrompt(id: string, variables?: Record<string, any>): Promise<PromptExecution>;

  // Prompt templates
  getTemplates(): Promise<PromptTemplate[]>;
  createPrompt(templateId: string, config: PromptConfig): Promise<Prompt>;

  // Categories and folders
  getFolders(): Promise<PromptFolder[]>;
  createFolder(name: string, parentId?: string): Promise<PromptFolder>;
}

export interface Prompt {
  id: string;
  name: string;
  description: string;
  content: string;
  folder: string;
  variables: PromptVariable[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  usageCount: number;
  successRate: number;
}

export interface PromptVariable {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'array' | 'object';
  required: boolean;
  defaultValue?: any;
  description?: string;
}

export interface PromptExecution {
  id: string;
  promptId: string;
  variables: Record<string, any>;
  result: string;
  tokensUsed: number;
  executionTime: number;
  cost: number;
  createdAt: Date;
}

export interface PromptTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  content: string;
  variables: PromptVariable[];
  exampleUsage: string;
}

export interface PromptFolder {
  id: string;
  name: string;
  parentId?: string;
  description?: string;
  promptCount: number;
  createdAt: Date;
}

export interface PromptConfig {
  name: string;
  description: string;
  content: string;
  folder: string;
  variables?: PromptVariable[];
  tags?: string[];
}

// ============================================================================
// SEARCH CONTRACT
// ============================================================================

export interface SearchContract {
  // Search execution
  search(query: SearchRequest): Promise<SearchResponse>;

  // Search history
  getHistory(): Promise<SearchQuery[]>;
  saveQuery(query: SearchQuery): Promise<SearchQuery>;
  deleteQuery(id: string): Promise<SuccessResponse>;

  // Search suggestions
  getSuggestions(query: string): Promise<string[]>;

  // Advanced search
  advancedSearch(filters: SearchFilters): Promise<SearchResponse>;
}

export interface SearchRequest {
  query: string;
  type?: SearchType;
  limit?: number;
  offset?: number;
  sortBy?: SearchSort;
  sortOrder?: 'asc' | 'desc';
}

export type SearchType = 'web' | 'local' | 'database' | 'files' | 'all';
export type SearchSort = 'relevance' | 'date' | 'title' | 'source';

export interface SearchResponse {
  query: string;
  totalResults: number;
  results: SearchResult[];
  executionTime: number;
  suggestions?: string[];
}

export interface SearchResult {
  id: string;
  title: string;
  url: string;
  snippet: string;
  source: string;
  type: SearchType;
  relevance: number;
  publishedAt?: Date;
  crawledAt?: Date;
  metadata?: Record<string, any>;
}

export interface SearchQuery {
  id: string;
  query: string;
  type: SearchType;
  results: number;
  executedAt: Date;
  userId?: string;
}

export interface SearchFilters {
  query: string;
  dateRange?: {
    from: Date;
    to: Date;
  };
  sources?: string[];
  types?: SearchType[];
  domains?: string[];
  tags?: string[];
  language?: string;
}

// ============================================================================
// MONITORING CONTRACT
// ============================================================================

export interface MonitoringContract {
  // Real-time metrics
  getMetrics(): Promise<SystemMetrics>;
  getServiceMetrics(service: string): Promise<ServiceMetrics>;

  // Logs
  getLogs(filters?: LogFilters): Promise<LogEntry[]>;
  getLog(id: string): Promise<LogEntry>;

  // Alerts
  getAlerts(): Promise<Alert[]>;
  acknowledgeAlert(id: string): Promise<SuccessResponse>;

  // Health checks
  healthCheck(): Promise<HealthStatus>;
  getServiceHealth(): Promise<ServiceHealth[]>;
}

export interface ServiceMetrics {
  service: string;
  responseTime: number;
  uptime: number;
  errorRate: number;
  throughput: number;
  activeConnections: number;
}

export interface LogFilters {
  level?: LogLevel;
  service?: string;
  startDate?: Date;
  endDate?: Date;
  search?: string;
  limit?: number;
}

export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'fatal';

export interface LogEntry {
  id: string;
  timestamp: Date;
  level: LogLevel;
  service: string;
  message: string;
  metadata?: Record<string, any>;
  stackTrace?: string;
}

export interface Alert {
  id: string;
  type: AlertType;
  severity: AlertSeverity;
  title: string;
  description: string;
  service: string;
  acknowledged: boolean;
  acknowledgedBy?: string;
  acknowledgedAt?: Date;
  createdAt: Date;
  resolvedAt?: Date;
}

export type AlertType = 'error' | 'warning' | 'info' | 'performance' | 'security';
export type AlertSeverity = 'low' | 'medium' | 'high' | 'critical';

export interface HealthStatus {
  overall: 'healthy' | 'degraded' | 'unhealthy';
  services: ServiceHealth[];
  lastCheck: Date;
}

export interface ServiceHealth {
  name: string;
  status: 'healthy' | 'degraded' | 'unhealthy';
  responseTime: number;
  lastCheck: Date;
  message?: string;
}

// ============================================================================
// GOOGLE CLOUD CONTRACT
// ============================================================================

export interface GoogleCloudContract {
  // Firestore operations
  getDocument(collection: string, id: string): Promise<any>;
  setDocument(collection: string, id: string, data: any): Promise<SuccessResponse>;
  updateDocument(collection: string, id: string, data: any): Promise<SuccessResponse>;
  deleteDocument(collection: string, id: string): Promise<SuccessResponse>;
  queryDocuments(collection: string, filters?: QueryFilter[]): Promise<any[]>;

  // Cloud Storage operations
  uploadFile(bucket: string, path: string, file: File): Promise<UploadResponse>;
  downloadFile(bucket: string, path: string): Promise<Blob>;
  deleteFile(bucket: string, path: string): Promise<SuccessResponse>;
  listFiles(bucket: string, prefix?: string): Promise<FileInfo[]>;

  // Authentication
  signInWithGoogle(): Promise<AuthResponse>;
  signOut(): Promise<SuccessResponse>;
}

export interface QueryFilter {
  field: string;
  operator: '==' | '!=' | '<' | '<=' | '>' | '>=' | 'in' | 'array-contains';
  value: any;
}

export interface UploadResponse {
  success: boolean;
  url: string;
  path: string;
  size: number;
  contentType: string;
}

export interface FileInfo {
  name: string;
  size: number;
  createdAt: Date;
  updatedAt: Date;
  contentType: string;
}

// ============================================================================
// HOSTINGER CONTRACT
// ============================================================================

export interface HostingerContract {
  // Website management
  getWebsites(): Promise<Website[]>;
  getWebsite(id: string): Promise<Website>;
  createWebsite(config: WebsiteConfig): Promise<Website>;
  updateWebsite(id: string, config: Partial<WebsiteConfig>): Promise<Website>;
  deleteWebsite(id: string): Promise<SuccessResponse>;

  // Domain management
  getDomains(): Promise<Domain[]>;
  addDomain(websiteId: string, domain: string): Promise<SuccessResponse>;
  removeDomain(websiteId: string, domain: string): Promise<SuccessResponse>;

  // Hosting management
  getHostingPlans(): Promise<HostingPlan[]>;
  upgradePlan(websiteId: string, planId: string): Promise<SuccessResponse>;

  // Webhooks
  registerWebhook(url: string, events: WebhookEvent[]): Promise<Webhook>;
  unregisterWebhook(id: string): Promise<SuccessResponse>;
  getWebhooks(): Promise<Webhook[]>;
}

export interface Website {
  id: string;
  name: string;
  domain: string;
  status: WebsiteStatus;
  plan: HostingPlan;
  createdAt: Date;
  updatedAt: Date;
  sslEnabled: boolean;
  backupEnabled: boolean;
}

export type WebsiteStatus = 'active' | 'suspended' | 'pending' | 'building';

export interface WebsiteConfig {
  name: string;
  domain: string;
  template?: string;
  planId: string;
  ssl?: boolean;
  backup?: boolean;
}

export interface Domain {
  name: string;
  status: DomainStatus;
  expiresAt?: Date;
  autoRenew: boolean;
}

export type DomainStatus = 'active' | 'expired' | 'pending' | 'transferred';

export interface HostingPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  features: {
    storage: string;
    bandwidth: string;
    domains: number;
    databases: number;
    emails: number;
  };
}

export interface Webhook {
  id: string;
  url: string;
  events: WebhookEvent[];
  secret: string;
  active: boolean;
  createdAt: Date;
}

export type WebhookEvent = 'website.created' | 'website.updated' | 'website.deleted' | 'domain.added' | 'domain.removed' | 'ssl.issued' | 'ssl.expired';

// ============================================================================
// GITHUB CONTRACT
// ============================================================================

export interface GithubContract {
  // Repository management
  getRepositories(): Promise<Repository[]>;
  getRepository(owner: string, name: string): Promise<Repository>;
  createRepository(config: RepositoryConfig): Promise<Repository>;
  updateRepository(owner: string, name: string, config: Partial<RepositoryConfig>): Promise<Repository>;
  deleteRepository(owner: string, name: string): Promise<SuccessResponse>;

  // Issues and PRs
  getIssues(owner: string, repo: string, filters?: IssueFilters): Promise<Issue[]>;
  createIssue(owner: string, repo: string, issue: CreateIssueRequest): Promise<Issue>;
  updateIssue(owner: string, repo: string, number: number, updates: Partial<Issue>): Promise<Issue>;

  // Commits and branches
  getCommits(owner: string, repo: string, branch?: string): Promise<Commit[]>;
  getBranches(owner: string, repo: string): Promise<Branch[]>;

  // Webhooks
  createWebhook(owner: string, repo: string, config: WebhookConfig): Promise<Webhook>;
  deleteWebhook(owner: string, repo: string, id: number): Promise<SuccessResponse>;
}

export interface Repository {
  id: number;
  name: string;
  fullName: string;
  description?: string;
  private: boolean;
  owner: User;
  htmlUrl: string;
  cloneUrl: string;
  createdAt: Date;
  updatedAt: Date;
  pushedAt?: Date;
  language?: string;
  topics: string[];
}

export interface RepositoryConfig {
  name: string;
  description?: string;
  private?: boolean;
  autoInit?: boolean;
  gitignoreTemplate?: string;
  licenseTemplate?: string;
}

export interface Issue {
  id: number;
  number: number;
  title: string;
  body?: string;
  state: 'open' | 'closed';
  user: User;
  assignees: User[];
  labels: Label[];
  createdAt: Date;
  updatedAt: Date;
  closedAt?: Date;
}

export interface IssueFilters {
  state?: 'open' | 'closed' | 'all';
  labels?: string[];
  assignee?: string;
  creator?: string;
  mentioned?: string;
  sort?: 'created' | 'updated' | 'comments';
  direction?: 'asc' | 'desc';
}

export interface CreateIssueRequest {
  title: string;
  body?: string;
  assignees?: string[];
  labels?: string[];
}

export interface Label {
  id: number;
  name: string;
  color: string;
  description?: string;
}

export interface Commit {
  sha: string;
  message: string;
  author: {
    name: string;
    email: string;
    date: Date;
  };
  committer: {
    name: string;
    email: string;
    date: Date;
  };
  url: string;
}

export interface Branch {
  name: string;
  commit: {
    sha: string;
    url: string;
  };
  protected: boolean;
}

export interface WebhookConfig {
  url: string;
  contentType: 'json' | 'form';
  secret: string;
  events: string[];
  active: boolean;
}

// ============================================================================
// COMMON TYPES
// ============================================================================

export interface SuccessResponse {
  success: boolean;
  message?: string;
}

export interface ErrorResponse {
  success: false;
  error: string;
  code?: string;
  details?: any;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  offset?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// ============================================================================
// ERROR HANDLING
// ============================================================================

export class ApiError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number,
    public details?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export class NetworkError extends Error {
  constructor(message: string, public originalError?: Error) {
    super(message);
    this.name = 'NetworkError';
  }
}

export class AuthenticationError extends ApiError {
  constructor(message: string = 'Authentication required') {
    super(message, 'AUTH_REQUIRED', 401);
    this.name = 'AuthenticationError';
  }
}

export class AuthorizationError extends ApiError {
  constructor(message: string = 'Insufficient permissions') {
    super(message, 'INSUFFICIENT_PERMISSIONS', 403);
    this.name = 'AuthorizationError';
  }
}

export class ValidationError extends ApiError {
  constructor(message: string, details?: any) {
    super(message, 'VALIDATION_ERROR', 400, details);
    this.name = 'ValidationError';
  }
}

export class NotFoundError extends ApiError {
  constructor(resource: string) {
    super(`${resource} not found`, 'NOT_FOUND', 404);
    this.name = 'NotFoundError';
  }
}

export class RateLimitError extends ApiError {
  constructor(message: string, public retryAfter?: number) {
    super(message, 'RATE_LIMIT_EXCEEDED', 429);
    this.name = 'RateLimitError';
  }
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

export function createApiClient(config: Partial<ApiContract>): ApiContract {
  // Implementation would create the actual API client
  // This is a factory function that returns the configured client
  return {} as ApiContract;
}

export function handleApiError(error: any): never {
  if (error.response) {
    const { status, data } = error.response;
    switch (status) {
      case 401:
        throw new AuthenticationError(data?.message);
      case 403:
        throw new AuthorizationError(data?.message);
      case 404:
        throw new NotFoundError(data?.resource || 'Resource');
      case 429:
        throw new RateLimitError(data?.message, data?.retryAfter);
      case 400:
        throw new ValidationError(data?.message, data?.details);
      default:
        throw new ApiError(data?.message || 'API Error', data?.code || 'UNKNOWN', status, data);
    }
  } else if (error.request) {
    throw new NetworkError('Network request failed', error);
  } else {
    throw new ApiError(error.message || 'Unknown error', 'UNKNOWN', 500);
  }
}

export function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  return fn().catch(error => {
    if (maxRetries > 0 && (error instanceof NetworkError || error.statusCode >= 500)) {
      return new Promise(resolve => setTimeout(resolve, delay))
        .then(() => withRetry(fn, maxRetries - 1, delay * 2));
    }
    throw error;
  });
}

export function validateContract<T>(data: any, schema: any): T {
  // Implementation would validate data against schema
  // Could use libraries like Zod, Joi, or Yup
  return data as T;
}