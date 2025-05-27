export type SimpleUser = {
  name: string | null;
  email: string | null;
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string | null;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  starred_at?: string;
  user_view_type?: string;
};

export type Label = {
  id: number;
  node_id: string;
  url: string;
  name: string;
  description: string | null;
  color: string | null;
  default: boolean;
};

export type Milestone = {
  url: string;
  html_url: string;
  labels_url: string;
  id: number;
  node_id: string;
  number: number;
  state: "open" | "closed";
  title: string;
  description: string | null;
  creator: SimpleUser | null;
  open_issues: number;
  closed_issues: number;
  created_at: string;
  updated_at: string;
  closed_at: string | null;
  due_on: string | null;
};

export type PullRequestInfo = {
  merged_at: string | null;
  diff_url: string | null;
  html_url: string | null;
  patch_url: string | null;
  url: string | null;
};

export type IssueTypeProperty = {
  id: number;
  node_id: string;
  name: string;
  description: string | null;
  color:
    | "gray"
    | "blue"
    | "green"
    | "yellow"
    | "orange"
    | "red"
    | "pink"
    | "purple"
    | null;
  created_at: string;
  updated_at: string;
  is_enabled: boolean;
};

export type AuthorAssociation =
  | "COLLABORATOR"
  | "CONTRIBUTOR"
  | "FIRST_TIMER"
  | "FIRST_TIME_CONTRIBUTOR"
  | "MANNEQUIN"
  | "MEMBER"
  | "NONE"
  | "OWNER";

export type Reactions = {
  url: string;
  total_count: number;
  "+1": number;
  "-1": number;
  laugh: number;
  confused: number;
  heart: number;
  hooray: number;
  eyes: number;
  rocket: number;
};

export type SubIssuesSummary = {
  total: number;
  completed: number;
  percent_completed: number;
};

export type Repository = {
  /** Many repository fields omitted for brevity; include as needed */
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  html_url: string;
  description: string | null;
  fork: boolean;
  url: string;
  // ... (other properties)
};

export type GitHubAppOwnerSimpleUser = SimpleUser;

export type GitHubAppOwnerEnterprise = {
  id: number;
  node_id: string;
  name: string;
  slug: string;
  html_url: string;
  website_url: string | null;
  description: string | null;
  created_at: string | null;
  updated_at: string | null;
  avatar_url: string;
};

export type GitHubApp = {
  id: number;
  slug: string;
  node_id: string;
  client_id: string;
  owner: GitHubAppOwnerSimpleUser | GitHubAppOwnerEnterprise;
  name: string;
  description: string | null;
  external_url: string;
  html_url: string;
  created_at: string;
  updated_at: string;
  permissions: Record<string, string>;
  events: string[];
  installations_count: number;
  client_secret?: string;
  webhook_secret?: string | null;
  pem?: string;
};

export type Issue = {
  id: number;
  node_id: string;
  url: string;
  repository_url: string;
  labels_url: string;
  comments_url: string;
  events_url: string;
  html_url: string;
  number: number;
  state: "open" | "closed";
  state_reason: "completed" | "reopened" | "not_planned" | null;
  title: string;
  body: string | null;
  user: SimpleUser | null;
  labels: Array<string | Label>;
  assignee: SimpleUser | null;
  assignees: SimpleUser[] | null;
  milestone: Milestone | null;
  locked: boolean;
  active_lock_reason: string | null;
  comments: number;
  pull_request: PullRequestInfo;
  closed_at: string | null;
  created_at: string;
  updated_at: string;
  draft: boolean;
  closed_by: SimpleUser | null;
  body_html: string;
  body_text: string;
  timeline_url: string;
  type: IssueTypeProperty | null;
  repository: Repository;
  performed_via_github_app: GitHubApp | null;
  author_association: AuthorAssociation;
  reactions: Reactions;
  sub_issues_summary: SubIssuesSummary;
};

export type Issues = Issue[];
