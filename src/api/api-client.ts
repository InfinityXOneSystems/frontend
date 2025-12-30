import axios, { AxiosInstance, AxiosResponse } from 'axios';
import {
  ApiContract,
  AuthContract,
  OrchestratorContract,
  CrawlerContract,
  AdminContract,
  AgentsContract,
  PromptsContract,
  SearchContract,
  MonitoringContract,
  GoogleCloudContract,
  HostingerContract,
  GithubContract,
  AuthResponse,
  UserProfile,
  ExecuteRequest,
  ExecuteResponse,
  Task,
  SystemStatus,
  SystemMetrics,
  CrawlerConfig,
  CrawlerResponse,
  Crawler,
  Industry,
  CrawlerResults,
  DashboardData,
  User,
  Content,
  CreateContentRequest,
  UpdateContentRequest,
  SystemSettings,
  Agent,
  AgentConfig,
  AgentExecution,
  AgentTemplate,
  Prompt,
  PromptExecution,
  PromptTemplate,
  PromptFolder,
  PromptConfig,
  SearchRequest,
  SearchResponse,
  SearchQuery,
  SearchFilters,
  ServiceMetrics,
  LogFilters,
  LogEntry,
  Alert,
  HealthStatus,
  QueryFilter,
  UploadResponse,
  FileInfo,
  Website,
  WebsiteConfig,
  Domain,
  HostingPlan,
  Webhook,
  Repository,
  RepositoryConfig,
  Issue,
  IssueFilters,
  CreateIssueRequest,
  Commit,
  Branch,
  WebhookConfig,
  SuccessResponse,
  PaginationParams,
  PaginatedResponse,
  ApiError,
  NetworkError,
  AuthenticationError,
  AuthorizationError,
  ValidationError,
  NotFoundError,
  RateLimitError,
  handleApiError,
  withRetry,
  validateContract
} from './api-contract';

// ============================================================================
// MAIN API CLIENT IMPLEMENTATION
// ============================================================================

export class InfinityXOneApiClient implements ApiContract {
  private client: AxiosInstance;
  private _token: string | null = null;

  constructor(
    public baseUrl: string = 'http://localhost:3001',
    public timeout: number = 30000,
    public retries: number = 3
  ) {
    this.client = axios.create({
      baseURL: baseUrl,
      timeout,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor for authentication
    this.client.interceptors.request.use(
      (config) => {
        if (this._token) {
          config.headers.Authorization = `Bearer ${this._token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        handleApiError(error);
      }
    );
  }

  // Authentication methods
  get auth(): AuthContract {
    return {
      login: (credentials?: { email: string; password: string }) => {
        const loginData = credentials || { email: 'admin@example.com', password: 'password' };
        return this.request('POST', '/auth/login', loginData);
      },
      logout: () => this.request('POST', '/auth/logout'),
      refresh: () => this.request('POST', '/auth/refresh'),
      verify: () => this.request('GET', '/auth/verify'),
      setToken: (token: string) => { this._token = token; },
      getToken: () => this._token,
      isAuthenticated: () => !!this._token,
    };
  }

  get orchestrator(): OrchestratorContract {
    return {
      execute: (command: ExecuteRequest) => this.request('POST', '/orchestrator/execute', command),
      getTasks: () => this.request('GET', '/orchestrator/tasks'),
      getTask: (id: string) => this.request('GET', `/orchestrator/tasks/${id}`),
      cancelTask: (id: string) => this.request('POST', `/orchestrator/tasks/${id}/cancel`),
      getStatus: () => this.request('GET', '/orchestrator/status'),
      getMetrics: () => this.request('GET', '/orchestrator/metrics'),
    };
  }

  get crawler(): CrawlerContract {
    return {
      startCrawler: (config: CrawlerConfig) => this.request('POST', '/crawler/start', config),
      stopCrawler: (id: string) => this.request('POST', `/crawler/${id}/stop`),
      getCrawlers: () => this.request('GET', '/crawler'),
      getCrawler: (id: string) => this.request('GET', `/crawler/${id}`),
      getIndustries: () => this.request('GET', '/crawler/industries'),
      getSubIndustries: (industry: string) => this.request('GET', `/crawler/industries/${industry}/subindustries`),
      getResults: (crawlerId: string) => this.request('GET', `/crawler/${crawlerId}/results`),
      exportResults: (crawlerId: string, format: string) =>
        this.request('GET', `/crawler/${crawlerId}/export?format=${format}`, undefined, { responseType: 'blob' }),
    };
  }

  get admin(): AdminContract {
    return {
      getDashboard: () => this.request('GET', '/admin/dashboard'),
      getUsers: () => this.request('GET', '/admin/users'),
      getUser: (id: string) => this.request('GET', `/admin/users/${id}`),
      updateUser: (id: string, updates: any) => this.request('PUT', `/admin/users/${id}`, updates),
      deleteUser: (id: string) => this.request('DELETE', `/admin/users/${id}`),
      getContent: () => this.request('GET', '/admin/content'),
      createContent: (content: CreateContentRequest) => this.request('POST', '/admin/content', content),
      updateContent: (id: string, content: UpdateContentRequest) => this.request('PUT', `/admin/content/${id}`, content),
      deleteContent: (id: string) => this.request('DELETE', `/admin/content/${id}`),
      getSettings: () => this.request('GET', '/admin/settings'),
      updateSettings: (settings: any) => this.request('PUT', '/admin/settings', settings),
    };
  }

  get agents(): AgentsContract {
    return {
      getAgents: () => this.request('GET', '/agents'),
      getAgent: (id: string) => this.request('GET', `/agents/${id}`),
      runAgent: (id: string, config?: AgentConfig) => this.request('POST', `/agents/${id}/run`, config),
      stopAgent: (executionId: string) => this.request('POST', `/agents/executions/${executionId}/stop`),
      getTemplates: () => this.request('GET', '/agents/templates'),
      createAgent: (templateId: string, config: AgentConfig) => this.request('POST', `/agents/templates/${templateId}/create`, config),
      getExecutions: (agentId?: string) => this.request('GET', `/agents/executions${agentId ? `?agentId=${agentId}` : ''}`),
      getExecution: (id: string) => this.request('GET', `/agents/executions/${id}`),
    };
  }

  get prompts(): PromptsContract {
    return {
      getPrompts: () => this.request('GET', '/prompts'),
      getPrompt: (id: string) => this.request('GET', `/prompts/${id}`),
      executePrompt: (id: string, variables?: any) => this.request('POST', `/prompts/${id}/execute`, { variables }),
      getTemplates: () => this.request('GET', '/prompts/templates'),
      createPrompt: (templateId: string, config: PromptConfig) => this.request('POST', `/prompts/templates/${templateId}/create`, config),
      getFolders: () => this.request('GET', '/prompts/folders'),
      createFolder: (name: string, parentId?: string) => this.request('POST', '/prompts/folders', { name, parentId }),
    };
  }

  get search(): SearchContract {
    return {
      search: (query: SearchRequest) => this.request('POST', '/search', query),
      getHistory: () => this.request('GET', '/search/history'),
      saveQuery: (query: SearchQuery) => this.request('POST', '/search/history', query),
      deleteQuery: (id: string) => this.request('DELETE', `/search/history/${id}`),
      getSuggestions: (query: string) => this.request('GET', `/search/suggestions?q=${encodeURIComponent(query)}`),
      advancedSearch: (filters: SearchFilters) => this.request('POST', '/search/advanced', filters),
    };
  }

  get monitoring(): MonitoringContract {
    return {
      getMetrics: () => this.request('GET', '/monitoring/metrics'),
      getServiceMetrics: (service: string) => this.request('GET', `/monitoring/metrics/${service}`),
      getLogs: (filters?: LogFilters) => this.request('GET', '/monitoring/logs', filters),
      getLog: (id: string) => this.request('GET', `/monitoring/logs/${id}`),
      getAlerts: () => this.request('GET', '/monitoring/alerts'),
      acknowledgeAlert: (id: string) => this.request('POST', `/monitoring/alerts/${id}/acknowledge`),
      healthCheck: () => this.request('GET', '/monitoring/health'),
      getServiceHealth: () => this.request('GET', '/monitoring/health/services'),
    };
  }

  get googleCloud(): GoogleCloudContract {
    return {
      getDocument: (collection: string, id: string) => this.request('GET', `/google-cloud/firestore/${collection}/${id}`),
      setDocument: (collection: string, id: string, data: any) => this.request('POST', `/google-cloud/firestore/${collection}/${id}`, data),
      updateDocument: (collection: string, id: string, data: any) => this.request('PUT', `/google-cloud/firestore/${collection}/${id}`, data),
      deleteDocument: (collection: string, id: string) => this.request('DELETE', `/google-cloud/firestore/${collection}/${id}`),
      queryDocuments: (collection: string, filters?: QueryFilter[]) => this.request('POST', `/google-cloud/firestore/${collection}/query`, { filters }),
      uploadFile: (bucket: string, path: string, file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        return this.request('POST', `/google-cloud/storage/${bucket}/${path}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      },
      downloadFile: (bucket: string, path: string) => this.request('GET', `/google-cloud/storage/${bucket}/${path}`, undefined, { responseType: 'blob' }),
      deleteFile: (bucket: string, path: string) => this.request('DELETE', `/google-cloud/storage/${bucket}/${path}`),
      listFiles: (bucket: string, prefix?: string) => this.request('GET', `/google-cloud/storage/${bucket}?prefix=${prefix || ''}`),
      signInWithGoogle: () => this.request('POST', '/google-cloud/auth/signin'),
      signOut: () => this.request('POST', '/google-cloud/auth/signout'),
    };
  }

  get hostinger(): HostingerContract {
    return {
      getWebsites: () => this.request('GET', '/hostinger/websites'),
      getWebsite: (id: string) => this.request('GET', `/hostinger/websites/${id}`),
      createWebsite: (config: WebsiteConfig) => this.request('POST', '/hostinger/websites', config),
      updateWebsite: (id: string, config: any) => this.request('PUT', `/hostinger/websites/${id}`, config),
      deleteWebsite: (id: string) => this.request('DELETE', `/hostinger/websites/${id}`),
      getDomains: () => this.request('GET', '/hostinger/domains'),
      addDomain: (websiteId: string, domain: string) => this.request('POST', `/hostinger/websites/${websiteId}/domains`, { domain }),
      removeDomain: (websiteId: string, domain: string) => this.request('DELETE', `/hostinger/websites/${websiteId}/domains/${domain}`),
      getHostingPlans: () => this.request('GET', '/hostinger/plans'),
      upgradePlan: (websiteId: string, planId: string) => this.request('POST', `/hostinger/websites/${websiteId}/upgrade`, { planId }),
      registerWebhook: (url: string, events: string[]) => this.request('POST', '/hostinger/webhooks', { url, events }),
      unregisterWebhook: (id: string) => this.request('DELETE', `/hostinger/webhooks/${id}`),
      getWebhooks: () => this.request('GET', '/hostinger/webhooks'),
    };
  }

  get github(): GithubContract {
    return {
      getRepositories: () => this.request('GET', '/github/repos'),
      getRepository: (owner: string, name: string) => this.request('GET', `/github/repos/${owner}/${name}`),
      createRepository: (config: RepositoryConfig) => this.request('POST', '/github/repos', config),
      updateRepository: (owner: string, name: string, config: any) => this.request('PATCH', `/github/repos/${owner}/${name}`, config),
      deleteRepository: (owner: string, name: string) => this.request('DELETE', `/github/repos/${owner}/${name}`),
      getIssues: (owner: string, repo: string, filters?: IssueFilters) => this.request('GET', `/github/repos/${owner}/${repo}/issues`, filters),
      createIssue: (owner: string, repo: string, issue: CreateIssueRequest) => this.request('POST', `/github/repos/${owner}/${repo}/issues`, issue),
      updateIssue: (owner: string, repo: string, number: number, updates: any) => this.request('PATCH', `/github/repos/${owner}/${repo}/issues/${number}`, updates),
      getCommits: (owner: string, repo: string, branch?: string) => this.request('GET', `/github/repos/${owner}/${repo}/commits${branch ? `?sha=${branch}` : ''}`),
      getBranches: (owner: string, repo: string) => this.request('GET', `/github/repos/${owner}/${repo}/branches`),
      createWebhook: (owner: string, repo: string, config: WebhookConfig) => this.request('POST', `/github/repos/${owner}/${repo}/hooks`, config),
      deleteWebhook: (owner: string, repo: string, id: number) => this.request('DELETE', `/github/repos/${owner}/${repo}/hooks/${id}`),
    };
  }

  // ============================================================================
  // PRIVATE METHODS
  // ============================================================================

  private async request<T = any>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    url: string,
    data?: any,
    config?: any
  ): Promise<T> {
    const requestConfig = {
      method,
      url,
      [method === 'GET' ? 'params' : 'data']: data,
      ...config,
    };

    return withRetry(async () => {
      const response: AxiosResponse<T> = await this.client.request(requestConfig);
      return response.data;
    }, this.retries);
  }
}

// ============================================================================
// FACTORY FUNCTION
// ============================================================================

export function createInfinityXOneApiClient(config?: {
  baseUrl?: string;
  timeout?: number;
  retries?: number;
  token?: string;
}): InfinityXOneApiClient {
  const client = new InfinityXOneApiClient(
    config?.baseUrl,
    config?.timeout,
    config?.retries
  );

  if (config?.token) {
    client.auth.setToken(config.token);
  }

  return client;
}

// ============================================================================
// REACT HOOK FOR API CLIENT
// ============================================================================

import { useState, useEffect, useCallback } from 'react';

export function useInfinityXOneApi(baseUrl?: string) {
  const [client, setClient] = useState<InfinityXOneApiClient | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiClient = createInfinityXOneApiClient({ baseUrl });

    // Check if user is already authenticated
    const token = localStorage.getItem('infinityxone_token');
    if (token) {
      apiClient.auth.setToken(token);
      setIsAuthenticated(true);
      // Verify token
      apiClient.auth.verify()
        .then(setUser)
        .catch(() => {
          localStorage.removeItem('infinityxone_token');
          setIsAuthenticated(false);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }

    setClient(apiClient);
  }, [baseUrl]);

  const login = useCallback(async (credentials: any) => {
    if (!client) return;
    try {
      const response = await client.auth.login();
      const { token, user: userProfile } = response;
      localStorage.setItem('infinityxone_token', token);
      client.auth.setToken(token);
      setUser(userProfile);
      setIsAuthenticated(true);
      return response;
    } catch (error) {
      throw error;
    }
  }, [client]);

  const logout = useCallback(async () => {
    if (!client) return;
    try {
      await client.auth.logout();
      localStorage.removeItem('infinityxone_token');
      client.auth.setToken('');
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      // Even if logout fails, clear local state
      localStorage.removeItem('infinityxone_token');
      setUser(null);
      setIsAuthenticated(false);
    }
  }, [client]);

  return {
    client,
    isAuthenticated,
    user,
    loading,
    login,
    logout,
  };
}

// ============================================================================
// EXPORT ALL TYPES AND CLASSES
// ============================================================================

export * from './api-contract';