-- V7b__issue_sprint.sql
ALTER TABLE issues ADD COLUMN sprint_id UUID REFERENCES sprints(id);
CREATE INDEX idx_issues_sprint ON issues(tenant_id, sprint_id);
